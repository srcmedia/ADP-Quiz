import React, { Component } from 'react';

class Results extends Component{
    render(){
        return(
            <div className="card">
            <h2>{this.props.title}</h2>
            <p>{this.props.moreinfo}</p>
            </div>
        );
    }
}

export default Results;