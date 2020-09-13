import React from "react";
import './LoadingRing.css';

class LoadingRing extends React.Component {
    render() {
        return (
            <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        )
    }
}

export default LoadingRing;
