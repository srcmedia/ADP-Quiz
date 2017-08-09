import React, { Component } from 'react';
import Question from './question.js';
import Results from './results.js';
import questiondata from './questions.json';
import './App.css';

function generateAnswers(fillState){
    let responseArray = [];
    for(let i=0;i<questiondata.questions.length;i++){
      responseArray.push(fillState);
    }
    console.log(responseArray);
    return responseArray;
  }


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: null,
      currentquestion: 1,
      maxQuestions: 0,
      questions: null,
      tallyYes: [],
      tallyNo: []
    };

  }
  
  componentDidMount(){
    this.setState({
      title: questiondata.title,
      maxQuestions: questiondata.questions.length,
      tallyYes: generateAnswers("false"),
      tallyNo: generateAnswers("false")
    });  
  }

  
  prevClick(){
    if(this.state.currentquestion > 1){
      this.setState((prevState)=>{
        return {currentquestion: prevState.currentquestion-1};
      });
      
    }
  }

  nextClick(){
    console.log(this.state.tallyNo);
    if(this.state.currentquestion < this.state.maxQuestions){
      this.setState((prevState)=>{
        return {currentquestion: prevState.currentquestion+1};
      });
    }
  }

  tallyUp(tallyNum){
    // this.setState((prevState)=>{
    //   return {tally: }
      // this.setState((prevState)=>{
      //   return{tally:[...prevState.tally, tallyNum]};
      // });
      console.log(tallyNum);
  }

  render(){
    return (
      <div className="wrapper">
      <header><imwg 
        src={"/images/atlogo.png"}
        className="site-logo"
        alt="Accounting Today"
        />
      
       <img
        src={"/images/Automatic_Data_Processing.png"}
        className="sponsor-logo"
        alt="ADP"
          />
        <span>Sponsored By</span>
       
      </header>
      <section className="bluebar">
        <div className="debugger">
          {/* <h4>Debug Window</h4> */}
          {/* <p>Tally: {this.state.tally.length}</p> */}
        </div>
      </section>
      <section>
        <h3 className="quiztitle"><span>Quiz:</span> {this.state.title}</h3>
        <p className="counter">Question: <strong>{this.state.currentquestion}</strong> of <strong>{this.state.maxQuestions}</strong></p>
      </section>
      <section className="questions">
        {questiondata.questions.map((obj, key)=>
          <Question 
              text={obj.question} 
              key={key} 
              index={key} 
              takeaway={obj.takeaway} 
              currentSlide={this.state.currentquestion}
              tallyUp={this.tallyUp}>
            </Question>)
        }

        {questiondata.results.map((obj, key)=><Results title={obj.title} moreinfo={obj.moreinfo} key={key}></Results>)}
      </section>
      <div className="controllers">
        {this.state.currentquestion>1 && <a className="previous" onClick={this.prevClick.bind(this)}>Back to previous question</a>} <a className="next" onClick={this.nextClick.bind(this)}>Next</a>
      </div>

      </div>
    );
  }
}

export default App;
