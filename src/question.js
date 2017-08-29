import React, { Component } from 'react';

class Question extends Component{
    constructor(props){
        super(props);
        this.state = {
            slideClass: "card",
            answered: 0
        }
    }
    componentDidMount(){
        this.setState({
            slideClass: this.props.currentSlide-1 === this.props.index ? 'card current' : 'card'
        });
    }

    checkStatus(inClass){
        let response = this.state.slideClass;
        if(this.props.currentSlide-1===this.props.index && inClass === undefined){
            response = response+" current";
        }
        if(inClass !==undefined){
            response = response+" answered";
        }
        if(this.props.currentSlide-1!==this.props.index){
            response="card";
        }
        return response;
    }
    radioClick(value){
        this.props.updateStatus(this.props.index, value);
    }
    render(){ 
        return(
            <div className={"card cf" + (this.props.currentSlide-1 === this.props.index ? ' current' : '') + (this.props.answered === 1 ? ' answered' : '' )}>
                <h2>{this.props.text}</h2>
                <div className="inputselect">
                    <ul>
                        <li>
                            <div className={this.props.yes===1 ? 'fakeRadio--active' : 'fakeRadio'} 
                                onClick={this.radioClick.bind(this, 1)}
                               
                                ></div> 
                                <label>Yes</label> 
                            </li>
                        <li>
                            <div className={this.props.no===1 ? 'fakeRadio--active' : 'fakeRadio'} 

                                onClick={this.radioClick.bind(this, 2)}              ></div> <label>No</label> 
                            </li>
                    </ul>   
                    <div className="takeaway">
                        <h4>Takeaway:</h4>
                        <p>{this.props.takeaway}</p>
                    </div>  
                </div>
                
            </div>
        );
    }
}

export default Question;