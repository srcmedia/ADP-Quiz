import React, { Component } from 'react';
import Prelim from './prelim';
import Question from './question.js';
import Results from './results.js';
import SocialShare from './socialshare.js';
import questiondata from './questions.json';
import prelimdata from './prelim.json';
import bestof from './ACTBestFirms.png';


// import MktoForms2 from '//app-sj03.marketo.com/js/forms2/js/forms2.min.js';
import ReactGA from 'react-ga';

import './App.css';

ReactGA.initialize('UA-219761-62');
ReactGA.set({page: window.location.pathname, title: document.title, location: window.location})
ReactGA.pageview('/best-accounting-firms-quiz');

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      splashDisplay: true,
      prelimDisplay: false,
      title: null,
      currentquestion: 1,
      maxQuestions: 0,
      firmSize: 0,
      total: 0,
      questions: this.buildQuestions(questiondata.questions),
      quizComplete: false,
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
      return { 
        splashDisplay: false,
        prelimDisplay: true  
      }
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
    if(this.state.prelimDisplay===true){
      this.setState((prevState)=>{
        return {
            prelimDisplay: false,
        }
      }
    )
    console.log(this.state.total);
    }
    if(this.state.currentquestion < this.state.maxQuestions 
        && this.state.questions[0][this.state.currentquestion-1][0]===1 
        && this.state.prelimDisplay===false){
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
    else if(this.state.currentquestion === this.state.maxQuestions 
            && this.state.questions[0][this.state.currentquestion-1][0]===1){
      this.reactClickEvent('Complete');
      this.setState((prevState)=>{
        return {quizComplete: true},
        }
      });
      if(this.getTotal()<4){
        this.reactClickEvent('End Page Result 1');
        if( typeof MktoForms2 !== "undefined" ) {
          window.MktoForms2.whenReady( function (form) { 
              form.vals({"actadpquizgroup":"1"});
          });
        }
      }
      if(this.getTotal()>3 && this.getTotal()<7){
          this.reactClickEvent('End Page Result 2');
          if( typeof MktoForms2 !== "undefined" ) {
            window.MktoForms2.whenReady( function (form) { 
                form.vals({"actadpquizgroup":"2"});
              });
          }
        }
      
      if(this.getTotal()>6 && this.getTotal() < 10){
        this.reactClickEvent('End Page Result 3');
        if( typeof MktoForms2 !== "undefined" ) {
          window.MktoForms2.whenReady( function (form) { 
              form.vals({"actadpquizgroup":"3"});
          });
        }
      }
    
      if(this.getTotal()===10){
        this.reactClickEvent('End Page Result 4');
        if( typeof MktoForms2 !== "undefined" ) {
          window.MktoForms2.whenReady( function (form) { 
              form.vals({"actadpquizgroup":"4"});
          });
        }
      }
    }
  }
  updateFirmSize(key, choice){
    this.setState((orevstate)=>{
      return{firmSize: choice}
    });
    console.log("pew pew");
  }
  updateStatus(key, choice){ 
    let newArray = this.state.questions;
    let trackedKey = key + 1;
    let currentMarketoTrack = questiondata.questions[key].marketoTrack;
    let injectedObj = new Object();
    let newTotal = this.getTotal();
    console.log(newTotal);
    if(key!==0){injectedObj[currentMarketoTrack] = choice === 1 ? "yes" : "no";}
    else{injectedObj[currentMarketoTrack] = choice;}
    newArray[0][key][0]=1;  //Answered
    newArray[0][key][choice] = 1;
    this.setState({
      questions: newArray,
      total: newTotal
    });
    this.reactClickEvent('question: ' + trackedKey + ' choice: ' +choice);
    if( typeof MktoForms2 !== "undefined" ) {
      window.MktoForms2.whenReady( function (form) { 
          // form.vals({currentMarketoTrack:"snoop doggy dog"});
          // let injectedArray = {currentMarketoTrack : "snoop doggy dog"};
          form.vals(injectedObj);
        });
    }
  }


  buildQuestions(questionsObject){
    //FORMAT!!  Answered Yes No 
    let questions = [];
    questions.push(questionsObject.map((object, key)=>[0, 0, 0]));
    return questions;
  }

  getTotal(){
    let addedUp=document.querySelectorAll(".true:checked").length;
    return addedUp;
  }
  reactClickEvent(eventLabel){
    ReactGA.event({
      category:'Sponsored Quiz',
      action: 'Best Accounting Firms – ADP',
      label: eventLabel
    }); 
    // console.log(eventLabel);
  }
  
  render(){
    return (
      <div className="wrapper">
      <header>
        <p>{this.state.total}</p>
        <a href="/">
          <img 
          src={"https://source-media-brightspot-lower.s3.amazonaws.com/06/a7/682048314485a3317b80e1f69b9c/atlogo.png"}
          className="site-logo"
          alt="Accounting Today"
          />
        </a>
        <span className="mobile--only">Sponsored By</span>

       <img
        src={"https://source-media-brightspot-lower.s3.amazonaws.com/39/b0/3f81867647589b47ae996bbc88d0/automatic-data-processing.png"}
        className="sponsor-logo"
        alt="ADP"
          />
        <span className="desktop--only">Sponsored By</span>
       
      </header>
      <section className="bluebar">
      </section>
      <section>
        <h3 className="quiztitle"><span>Quiz:</span> {this.state.title}</h3>
        <p className={(this.state.splashDisplay === true || this.state.quizComplete === true || this.state.currentquestion == '0' || this.state.prelimDisplay === true) ? 'results hidden' : 'counter'}>Question: <strong>{this.state.currentquestion}</strong> of <strong>{this.state.maxQuestions}</strong></p>
      </section>
      <section className={this.state.splashDisplay === true ? 'intro displayed' : 'intro hidden'}>
      <p>Each year, Accounting Today conducts its “Best Accounting Firms to Work For” survey and recognition program to find and recognize the best employers within the accounting industry. Based on the factors that differentiate the top 100 winners of the Best Firms to Work For award from other firms, we developed, in partnership with ADP, this fun and easy quiz to help you see how your firm stacks up. Take a few moments to answer 10 quick questions to see if your firm is one of the best places to work in accounting and how it compares with similar-sized firms in the industry. Then download resources and information that can help you on your way to being the&nbsp;best.</p>
        <button onClick={this.StartQuiz.bind(this)}>Start the quiz now!</button>
        <SocialShare reactClickEvent={this.reactClickEvent}/>
        <img src={bestof} className="bestfirms cf" alt="ACT Best Firms 2018"/>
      </section>
      <section className={(this.state.splashDisplay === true || this.state.quizComplete === true) ? 'questions hidden' : 'questions displayed'}
      style={{display: this.state.quizComplete === false ? 'block' : 'none'}}
      >
        {prelimdata.questions.map((obj,key)=>
          <Prelim 
          text={obj.question} 
          key={key} 
          index={key} 
          takeaway={obj.takeaway}
          marketoTrack={obj.marketoTrack}
          answers={obj.answers}
          prelimdisplay={this.state.prelimDisplay}
          currentSlide={this.state.currentquestion}
          answered={this.state.questions[0][key][0]}
          response={this.state.questions[0][key][1]}
          updateFirmSize={this.updateFirmSize.bind(this)}
          gaTrack={this.reactClickEvent}
          >
        </Prelim>)
        }
        {questiondata.questions.map((obj, key)=>
          <Question 
              text={obj.question} 
              key={key} 
              index={key} 
              takeaway={obj.takeaway[this.state.firmSize].text}
              marketoTrack={obj.marketoTrack}
              answers={obj.answers}
              prelimdisplay={this.state.prelimDisplay}
              currentSlide={this.state.currentquestion}
              answered={this.state.questions[0][key][0]}
              response={this.state.questions[0][key][1]}
              updateStatus={this.updateStatus.bind(this)}
              gaTrack={this.reactClickEvent}
              >
            </Question>)
        }
      </section>
      <section className={this.state.quizComplete === false ? 'results hidden' : 'results shown'} style={{display: this.state.quizComplete === false ? 'none' : 'flex'}}>
        <div className="results--text">
        <Results Total={this.state.total} maxQuestions={this.state.maxQuestions} firmSize={this.state.firmSize} />

        
        {/* {this.getTotal() === 10 &&
          <p>Congratulations &mdash; you're right up there with the best! Of course, even the best firm has room for improvement. ADP&reg; has tons of awesome resources to help make you an Employer of Choice! Here is a good place to start! Fill out the registration form and download practical resources to get you on the road to success:</p>
        } */}
        
            {/* <p>For more information on how ADP can help, visit us at <a href="http://adp.com/accountant/" target="_blank" rel="noopener noreferrer">adp.com/accountant</a></p> */}
          
          <p className="copyright">The ADP logo and ADP are registered trademarks and ADP A more human resource. is a service mark of ADP, LLC. All other marks belong to their owner. Copyright &reg; 2017 All rights reserved.</p>
          <SocialShare reactClickEvent={this.reactClickEvent}/>
          </div>

        <div className="resultsform">
           <h5>Fill out the form below and get tips to help you become a top firm.</h5>
        <form id="mktoForm_20631"></form>
        <p>For more information on how ADP can help, visit us at <a href="http://adp.com/accountant/" target="_blank" rel="noopener noreferrer">adp.com/accountant</a></p>
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
