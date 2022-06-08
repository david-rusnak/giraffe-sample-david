import React from "react";
import { LineComponent } from "./LineComponent";
import { AltBucketData } from "./AltBucketData";


const buttonStyle = {
    fontFamily: "sans-serif",
    margin: '25px',
    border: 'none',
    color: 'white',
    backgroundColor: '#6F81AD',
    padding: '5px',
    borderRadius: '10px'
};

const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

export class Navbar extends React.Component {
    state = { whichData: true };

    updateState = () => {
        this.setState({whichData: !this.state.whichData});
    };
    render() {
        if (this.state.whichData == true) {
            return (
                <div>
                    <div style={divStyle}>
                        <button style={buttonStyle} onClick={this.updateState}>Toggle View</button>
                    </div>
                    <div style={divStyle}>
                        <LineComponent></LineComponent>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div style={divStyle}>
                        <button style={buttonStyle} onClick={this.updateState}>Toggle View</button>
                    </div>
                    <div style={divStyle}>
                        <AltBucketData></AltBucketData>
                    </div>
                </div>
            );
        }
        
    };
}