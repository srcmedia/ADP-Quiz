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
        if(inClass !==undefined && this.props.currentSlide !==0 ){
            response = response + " answered";
        }
        if(this.props.currentSlide-1!==this.props.index){
            response="card";
        }
        return response;
    }
    radioClick(value){
        this.props.updateStatus(this.props.index, value);
        // this.props.gaTrack(value === 0 ? "Yes":"No");
    }
    render(){ 
        const answers = this.props.answers;

        return(
            <div className={"questions card cf" + (this.props.currentSlide-1 === this.props.index && this.props.prelimdisplay === false ? ' current' : '') + ((this.props.answered === 1 && this.props.currentSlide !== 0) ? ' answered' : '' )}>
                <h2>{this.props.text}</h2>
                <div className="inputselect">
                    {answers !== undefined && 
                        (
                            <ul>
                                {answers.map((obj, key)=>
                                    <li>
                                        <input type="radio" name={this.props.index} className={key===0 ? 'true' : 'false'} 
                                         onClick={this.radioClick.bind(this, key)}
                                            value={key}></input> 
                                            <label>{obj.option}</label> 
                                    </li>
                                )} 
                            </ul>
                        )
                    }
                    
                    {this.props.takeaway !== "" &&
                        <div className="takeaway">
                            <h4>Takeaway:</h4>
                            <p>{this.props.takeaway}</p>
                        </div>  
                    }
                </div>
                
            </div>
        );
    }
}

export default Question;