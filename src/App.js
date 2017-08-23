import React, { Component } from 'react';
import Question from './question.js';
import Results from './results.js';
import questiondata from './questions.json';
// import MktoForms2 from '//app-sj03.marketo.com/js/forms2/js/forms2.min.js';
import ReactGA from 'react-ga';

import './App.css';

ReactGA.initialize('UA-219761-62');

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      splashDisplay: true,
      title: null,
      currentquestion: 1,
      maxQuestions: 0,
      questions: this.buildQuestions(questiondata.questions),
      quizComplete: false 
    };
  }
  
  componentDidMount(){
    this.setState({
      title: questiondata.title,
      maxQuestions: questiondata.questions.length
    });  
  }

  StartQuiz(){
    this.reactClickEvent('Start');
    this.setState((prevState)=>{
      return {splashDisplay: false}
    });
  }

  prevClick(){
    if(this.state.currentquestion >= 1){
      let newArray = this.state.questions;
      newArray[0][this.state.currentquestion-2][0]=0;
      newArray[0][this.state.currentquestion-2][1]=0;
      newArray[0][this.state.currentquestion-2][2]=0;
      this.setState((prevState)=>{
        return {currentquestion: prevState.currentquestion-1,
                questions: newArray
        };
      });
    }
  }

  nextClick(){
    if(this.state.currentquestion < this.state.maxQuestions){
      let newArray = this.state.questions;
      newArray[0][this.state.currentquestion][0]=0;
      newArray[0][this.state.currentquestion][1]=0;
      newArray[0][this.state.currentquestion][2]=0;
      this.setState((prevState)=>{
        return {currentquestion: prevState.currentquestion+1,
                questions: newArray
          };
      });
    }
    else{
      this.reactClickEvent('Complete');
      this.setState((prevState)=>{
        return {quizComplete: true}
      });
      if(this.getTotal()<4)this.reactClickEvent('End Page Result 1');
      if(this.getTotal()>3 && this.getTotal()<7)this.reactClickEvent('End Page Result 2');
      if(this.getTotal()>6 && this.getTotal() < 10)this.reactClickEvent('End Page Result 3');
      if(this.getTotal()===10)this.reactClickEvent('End Page Result 4');
    }
  }

  updateStatus(key, choice){ 
    let newArray = this.state.questions;
    newArray[0][key][0]=1;
    newArray[0][key][choice] = 1;
    this.setState({
      questions: newArray
    });
    this.reactClickEvent('question: ' + key + ' choice: ' +choice);
  }
  

  buildQuestions(questionsObject){
    //FORMAT!!  Answered Yes No 
    let questions = [];
    questions.push(questionsObject.map((object, key)=>[0, 0, 0]));
    return questions;
  }
  
  // resetQuestions

  getTotal(){
    let addedUp=0;
    for(let i=0;i<this.state.questions[0].length;i++){
      addedUp = addedUp + this.state.questions[0][i][1];
    }
    return addedUp;
  }

  reactClickEvent(eventLabel){
    ReactGA.event({
      category:'Sponsored Quiz',
      action: 'Best Accounting Firms – ADP',
      label: eventLabel
    }); 
    console.log(eventLabel);
  }

  render(){
    return (
      <div className="wrapper">
      <header><img 
        src={"https://source-media-brightspot-lower.s3.amazonaws.com/06/a7/682048314485a3317b80e1f69b9c/atlogo.png"}
        className="site-logo"
        alt="Accounting Today"
        />
      
       <img
        src={"https://source-media-brightspot-lower.s3.amazonaws.com/39/b0/3f81867647589b47ae996bbc88d0/automatic-data-processing.png"}
        className="sponsor-logo"
        alt="ADP"
          />
        <span>Sponsored By</span>
       
      </header>
      <section className="bluebar">
      </section>
      <section>
        <h3 className="quiztitle"><span>Quiz:</span> {this.state.title}</h3>
        <p className={(this.state.splashDisplay === true || this.state.quizComplete === true) ? 'results--hidden' : 'counter'}>Question: <strong>{this.state.currentquestion}</strong> of <strong>{this.state.maxQuestions}</strong></p>
      </section>
      <section className={this.state.splashDisplay === true ? 'intro--displayed' : 'intro--hidden'}>
        <h3>See how your firm stacks up against the cream of the crop – this quick, 10-question quiz, based on a decades' worth of data from Accounting Today's Best Firms to Work For, will tell you how much of a workplace of choice you really have.</h3>
        <button onClick={this.StartQuiz.bind(this)}>Start the quiz now!</button>
      </section>
      <section className={(this.state.splashDisplay === true || this.state.quizComplete === true) ? 'questions--hidden' : 'questions--displayed'}>
        {questiondata.questions.map((obj, key)=>
          <Question 
              text={obj.question} 
              key={key} 
              index={key} 
              takeaway={obj.takeaway} 
              currentSlide={this.state.currentquestion}
              answered={this.state.questions[0][key][0]}
              yes={this.state.questions[0][key][1]}
              no={this.state.questions[0][key][2]}
              updateStatus={this.updateStatus.bind(this)}
              >
            </Question>)
        }

        {questiondata.results.map((obj, key)=><Results title={obj.title} moreinfo={obj.moreinfo} key={key}></Results>)}
      </section>
      <section className={this.state.quizComplete === false ? 'results--hidden' : 'results--shown'}>
        <div className="results--text">
        <h3>You answered Yes to {this.getTotal()} of {this.state.maxQuestions}</h3>
        {this.getTotal() < 4 &&
          <p>Yikes! Unless you’re actively trying to drive away staff, you might want to put some effort into your firm. ADP has tons of awesome resources to help make you an Employer of Choice! Fill out the registration form and download these practical resources to get you on the road to success:
          </p>
          
        }
         {this.getTotal() < 7 && this.getTotal() > 3 &&
          <p>You're not actively trying to drive staff away, but there's definitely room for improvement. ADP has tons of awesome resources to help make you an Employer of Choice! Here is a good place to start! Fill out the registration form and download these practical resources to get you on the road to success:</p> 
        }
        {this.getTotal() < 10 && this.getTotal() > 6 &&
          <p>You're on the edge of greatness! Something to think about as you strive for perfection. ADP has tons of awesome resources to help make you an Employer of Choice! Here is a good place to start! Fill out the registration form and download these practical resources to get you on the road to success:</p>
        }
        {this.getTotal() === 10 &&
          <p>Congratulations &mdash; you're right up there with the best! Of course, even the best firm has room for improvement. ADP has tons of awesome resources to help make you an Employer of Choice! Here is a good place to start! Fill out the registration form and download these practical resources to get you on the road to success:</p>
        }
        <ul>
            <li>Becoming an Employer of Choice (guide)</li>
            <li>How Human Capital Management Impacts P&amp;L and Margins (eBook)</li>
            <li>Hidden Talent: Finding Solutions to Today’s CPA Talent Shortage (white paper)</li>
            <li>Fixing the Talent Management Disconnect (white paper)</li>
            <li>Evolution of Work 2.0: The Me vs. We Mindset (eBook)</li>
          </ul>
            <p>For more information on how ADP can help, visit us at <a href="http://adp.com/accountant/" target="_blank" rel="noopener noreferrer">adp.com/accountant</a>
          </p>

        </div>

        <div className="resultsform">
           <h5>Fill out the form below and get tips to help you become a top firm.</h5>
          {/*<label>First Name</label>
          <input type="text"></input>
          <label>Last Name</label>
          <input type="text"></input>
          <label>Email</label>
          <input type="email"></input>
          <label>Company</label>
          <input type="text"></input>
          <label>Phone Number</label>
          <input type="tel"></input>
          <button>Submit</button>
        </div> */}
        <form id="mktoForm_20631"></form>
        </div>
      </section>

      <div className={(this.state.splashDisplay === true || this.state.quizComplete === true) ? 'controllers--hidden' : 'controllers--displayed'}>
        {this.state.currentquestion>1 && <a className="previous" onClick={this.prevClick.bind(this)}>Back&nbsp;to&nbsp;previous&nbsp;question</a>} <a className="next" onClick={this.nextClick.bind(this)}>Next</a>
      </div>

      </div>
    );
  }
}

export default App;
