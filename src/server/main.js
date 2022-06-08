#!/usr/bin/env node

import dotenv from "dotenv";
dotenv.config();
import express from "express";
import axios from "axios";

// Token info found on cloud instance
const baseURL = process.env.INFLUX_URL; 
const influxToken = process.env.INFLUX_TOKEN; 
const orgID = process.env.ORG_ID; 


// Create axios instance
const influxProxy = axios.create({
    baseURL,
    headers: {
        Authorization: `Token ${influxToken}`,
        "Content-Type": "application/json",
    },
});

// Configure
const app = express();
const port = 8617;



app.get("/", (req, res) => {
    res.sendFile("index.html", { root: "./" });
});

app.get("/dist/bundle.js", (req, res) => {
    res.sendFile("bundle.js", { root: "./dist" });
});


// Request to get data from influxdb
app.get("/birddata", (req, res) => {
    const bucket = "birds";

    const query = `
    from(bucket: "birds")
	    |> range(start: -30d)
        |> filter(fn: (r) => r["_measurement"] == "birds")
        |> filter(fn: (r) => r["_field"] == "sighted")
        |> filter(fn: (r) => r["loc"] == "Boise" or r["loc"] == "Detroit" or r["loc"] == "Seattle")
    `.trim();

    influxProxy
        .request({
            method: "post",
            url: "api/v2/query",
            params: {
                orgID,
            },
            data: {
                query,
                extern: {
                    type: "File",
                    package: null,
                    imports: null,
                    body: [
                        {
                            type: "OptionStatement",
                            assignment: {
                                type: "VariableAssignment",
                                id: { type: "Identifier", name: "v" },
                                init: {
                                    type: "ObjectExpression",
                                    properties: [
                                        {
                                            type: "Property",
                                            key: { type: "Identifier", name: "bucket" },
                                            value: { type: "StringLiteral", value: "birds" },
                                        },
                                        {       
                                            type: "Property",
                                            key: { type: "Identifier", name: "timeRangeStart" },
                                            value: {
                                                type: "UnaryExpression",
                                                operator: "-",
                                                argument: {
                                                    type: "DurationLiteral",
                                                    values: [{ magnitude: 1, unit: "h" }],
                                                },
                                            },
                                        },
                                        {
                                            type: "Property",
                                            key: { type: "Identifier", name: "timeRangeStop" },
                                            value: {
                                                type: "CallExpression",
                                                callee: { type: "Identifier", name: "now" },
                                            },
                                        },
                                        {
                                            type: "Property",
                                            key: { type: "Identifier", name: "windowPeriod" },
                                            value: {
                                                type: "DurationLiteral",
                                                values: [{ magnitude: 10000, unit: "ms" }],
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                    ],
                },
                dialect: { annotations: ["group", "datatype", "default"] },
            },
        })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error.message);
    });
});

// Listening on Port XXXX
app.listen(port, () => {
  console.log(`Listening on Port :${port}`);
});