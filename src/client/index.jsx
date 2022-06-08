import React from "react";
import { useState } from "react";
import ReactDOM from "react-dom";

import { LineComponent } from "./LineComponent";
import { AltBucketData } from "./AltBucketData";
import { Navbar } from "./Navbar";

const headingStyle = {
    display: "flex", 
    justifyContent: "center", 
    fontFamily: "sans-serif" 
};

ReactDOM.render(
    <div>
        <h1 style={headingStyle}>Simple heatmap showing bird location data</h1>
        <Navbar></Navbar>
    </div>,
  document.getElementById("root")
);
