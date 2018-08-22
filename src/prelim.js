import React, { Component } from 'react';

class Prelim extends Component{
    constructor(props){
        super(props);
        this.state = {
            slideClass: "card",
            answered: 0
        }
    }
    checkStatus(inClass){
        let response = this.state.slideClass;
        if(this.props.currentSlide-1===this.props.index && inClass === undefined){
            response = response+" current";
        }
        if(inClass !==undefined && this.props.currentSlide !==0 ){
            response = response + " answered meow";
        }
        if(this.props.currentSlide-1!==this.props.index){
            response="card";
        }
        return response;
    }
    radioClick(value){
        this.props.updateFirmSize(this.props.index, value);
        let firmChoice = null;
        switch(value){
            case 0:
                firmChoice="Small";
                break;
            case 1:
                firmChoice="Mid";
                break;
            case 2:
                firmChoice="Large";
                break;
            default:
                break;
        }
        this.props.gaTrack(firmChoice);
    }
    render(){
        const answers = this.props.answers;

        return(
                <div className={"card cf" + (this.props.prelimdisplay === true ? ' current' : '')} key={this.props.key}>
                    <h2>{this.props.text}</h2>
                    <div className="inputselect">
                    {answers !== undefined && 
                        (
                            <ul>
                                {answers.map((obj, key)=>
                                    <li>
                                        <input type="radio" name={this.props.index} className=""
                                         onClick={this.radioClick.bind(this, key)}
                                            value={key} name="prelim"></input> 
                                            <label>{obj.option}</label> 
                                    </li>
                                )} 
                            </ul>
                        )
                        }
                    </div>
                </div>
        );
    }
}

export default Prelim;