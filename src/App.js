import React, { Component } from 'react';
import Question from './question.js';
import Results from './results.js';
import questiondata from './questions.json';
import './App.css';

// function generateAnswers(fillState){
//     let responseArray = [];
//     for(let i=0;i<questiondata.questions.length;i++){
//       responseArray.push(fillState);
//     }
//     console.log(responseArray);
//     return responseArray;
//   }


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      splashDisplay: false,
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
      maxQuestions: questiondata.questions.length,

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
      this.setState((prevState)=>{
        return {quizComplete: true}
      }
    )
    }
  }

  updateStatus(key, choice){ 
    let newArray = this.state.questions;
    // (newArray[0][key][choice]===0 && newArray[0][key][choice+1]===0) ? newArray[0][key][choice] = 1 :  

    console.log(newArray[0][key][choice]);
    newArray[0][key][0]=1;
    newArray[0][key][choice] = 1;
    this.setState({
      questions: newArray
    });
    // console.log(key, choice);
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

  render(){
    return (
      <div className="wrapper">
      <header><img 
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
           <h4>Debug Window</h4> 
           <p>Tally: {this.getTotal()}</p>
        </div>
      </section>
      <section>
        <h3 className="quiztitle"><span>Quiz:</span> {this.state.title}</h3>
        <p className={this.state.quizComplete === true ? 'results--hidden' : 'counter'}>Question: <strong>{this.state.currentquestion}</strong> of <strong>{this.state.maxQuestions}</strong></p>
      </section>
      <section className={this.state.quizComplete === false ? 'questions--displayed' : 'questions--hidden'}>
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
        <h2>You scored {this.getTotal()} of {this.state.maxQuestions}</h2>
        {this.getTotal() < 4 &&
          <h4>Yikes! Unless you’re actively trying to drive away staff, you might want to put some effort into your firm. ADP has tons of awesome resources to help make you an Employer of Choice! Here are a number of places to start! Visit us at <a href="#">adp.com/accountant</a>
          </h4>
        }
         {this.getTotal() < 7 && this.getTotal() > 3 &&
          <h4>You're not actively trying to drive staff away, but there's definitely room for improvement. ADP has tons of awesome resources to help make you an Employer of Choice! Here are a number of places to start! Visit us at <a href="#">adp.com/accountant</a>
          </h4>
        }
        {this.getTotal() < 10 && this.getTotal() > 6 &&
          <h4>You're on the edge of greatness! Something to think about as you strive for perfection. ADP has tons of awesome resources to help make you an Employer of Choice! Here are a number of places to start! Visit us at <a href="#">adp.com/accountant</a>
          </h4>
        }
        {this.getTotal() === 10 &&
          <h4>Congratulations &mdash; you're right up there with the best! Of course, even the best firm has room for improvement. ADP has tons of awesome resources to help make you an Employer of Choice! Here are a number of places to start! Visit us at  <a href="#">adp.com/accountant</a>
          </h4>
        }
        </div>

        <div className="resultsform">
          <h5>Fill out the form below and get tips<br/>to help you become a top firm.</h5>
          <label>First Name</label>
          <input type="text"></input>
          <label>Last Name</label>
          <input type="text"></input>
          <label>Email</label>
          <input type="email"></input>
          <label>Company</label>
          <input type="text"></input>
          <label>Phone Number</label>
          <input type="tel"></input>
          <button>SUBMIT</button>
        </div>
      </section>

      <div className={this.state.quizComplete === false ? 'controllers--displayed' : 'controllers--hidden'}>
        {this.state.currentquestion>1 && <a className="previous" onClick={this.prevClick.bind(this)}>Back&nbsp;to&nbsp;previous&nbsp;question</a>} <a className="next" onClick={this.nextClick.bind(this)}>Next</a>
      </div>

      </div>
    );
  }
}

export default App;
