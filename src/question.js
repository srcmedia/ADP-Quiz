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
            // slideClass:
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
        //Add class
        // this.setState({slideClass: this.checkStatus("answered")});
        this.setState((prevState)=>{return{answered: 1}});
        //Add Tally 
        // this.props.tallyUp(value);
    }

    render(){ 
        // let className = this.props.currentSlide-1 === this.props.index ? 'card current' : 'card';
   
        return(

            <div className={"card cf" + (this.props.currentSlide-1 === this.props.index ? ' current' : '') + (this.state.answered === 1 ? ' answered' : '' )}>
                <h2>{this.props.text}</h2>
                <div className="inputselect">
                    <ul>
                        <li>
                            <input type="radio" 
                                name={this.props.index} 
                                value="1" 
                                onClick={this.radioClick.bind(this, 1)}
                                checked={this.props.checkedYes}
                                ></input> 
                                <label>Yes</label>
                            </li>
                        <li>
                            <input type="radio" 
                                name={this.props.index}
                                value="0" 
                                onClick={this.radioClick.bind(this, 0)}              checked={this.props.checkedNo}></input> <label>No</label>
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