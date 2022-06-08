import React from "react";
import ReactDOM from "react-dom";

import { Plot, fromFlux } from "@influxdata/giraffe";

const style = {
  width: "70vw",
  height: "70vh",
  margin: "40px",
};

const REASONABLE_API_REFRESH_RATE = 30000;

export class AltBucketData extends React.Component {
    constructor(props) {
        super(props);

        this.animationFrameId;

        this.state = {
            layer: {
                type: "line",
                x: "_time",
                y: "_value",
            },
        table: {},
        timestamps: [],
        values: [],
        };
        this.createRealDataTable = this.createRealDataTable.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    async componentDidMount() {
        this.createRealDataTable();
    }

    render() {
        const config = {
            table: this.state.table,
            layers: [this.state.layer],
        };

        if (!Object.keys(config.table).length) {
        return null;
        }

        return (
        <div style={style}>
            <Plot config={config} />
        </div>
        );
    }

    fetchData() {
        return fetch("http://localhost:8617/birddata", {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        });
    }

    async createRealDataTable() {
        const resp = await this.fetchData();
        const resultsCSV = await resp.text();
        let results = fromFlux(resultsCSV);
        this.setState({
            table: results.table,
        });
    }
}
