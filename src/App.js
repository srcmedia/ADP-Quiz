import React, { Component } from "react";
import Question from "./question.js";
import Results from "./results.js";
import questiondata from "./questions.json";
import Tracker, { QUIZ_EVENTS } from "./tracking";
import { shouldHaveOneAnswer, uncheckboxes } from "./utils.js";
import "./App.css";
import Confirmation from "./confirmation.jsx";

const quizTracker = new Tracker();
quizTracker.init();

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			splashDisplay: true,
			title: null,
			currentquestion: 1,
			maxQuestions: 0,
			firmSize: 0,
			total: 0,
			questions: this.buildQuestions(questiondata.questions),
			quizComplete: false,
			answerSelected: false,
			takeawayViewed: false,
			confirmation: false,
			group: "UNKNOWN",
			user: "",
		};
	}

	componentDidMount() {
		this.setState({
			title: questiondata.title,
			maxQuestions: questiondata.questions.length,
		});

		document.addEventListener("piano-form-submit", (e) => {
			const user = e.detail.email;
			this.setState({
				confirmation: true,
				quizComplete: true,
				user: user,
			});
			//Track quiz_complete_form
			quizTracker.track(QUIZ_EVENTS.FORM_SUBMIT, e.detail);
		});
	}

	StartQuiz() {
		if (window.innerWidth < 768) {
			window.scroll({ top: 0, left: 0, behavior: "smooth" });
		}
		quizTracker.track(QUIZ_EVENTS.START);
		this.setState((prevState) => {
			return {
				splashDisplay: false,
			};
		});
	}

	prevClick() {
		if (this.state.answerSelected && this.state.takeawayViewed) return;
		if (this.state.currentquestion >= 1) {
			let newArray = this.state.questions;
			newArray[0][this.state.currentquestion - 2][0] = 0;
			newArray[0][this.state.currentquestion - 2][1] = 0;
			newArray[0][this.state.currentquestion - 2][2] = 0;

			const previouslyAnswered = quizTracker.find(
				quizTracker.progress,
				"id",
				this.state.currentquestion - 1
			);

			let isQuestionAnswered = false;

			if (previouslyAnswered >= 0) {
				const previouslyAnsweredQuestion =
					quizTracker.progress[previouslyAnswered];
				let previousAnswers = previouslyAnsweredQuestion.answer;
				quizTracker.restorePreviousAnswers(previousAnswers);
				isQuestionAnswered = Boolean(previouslyAnsweredQuestion.answer.length);
			}

			this.setState((prevState) => {
				return {
					currentquestion: prevState.currentquestion - 1,
					questions: newArray,
					answerSelected: isQuestionAnswered,
					takeawayViewed: false,
				};
			});
		}
	}

	nextClick() {
		if (!this.state.answerSelected) return;
		if (!this.state.takeawayViewed) {
			const current = document.querySelector(".questions.current");
			if (current) {
				current.classList.add("answered");
			}

			this.setState({ takeawayViewed: true });
			return;
		}
		//Mobile check if we should scroll to the top.
		if (window.innerWidth < 768) {
			window.scroll({ top: 0, left: 0, behavior: "smooth" });
		}

		const nextQuestion = this.state.currentquestion + 1;

		const previouslyAnswered = quizTracker.find(
			quizTracker.progress,
			"id",
			nextQuestion
		);

		let isQuestionAnswered = false;
		if (previouslyAnswered >= 0) {
			const previouslyAnsweredQuestion =
				quizTracker.progress[previouslyAnswered];
			isQuestionAnswered = Boolean(previouslyAnsweredQuestion.answer.length);
		}

		if (
			this.state.currentquestion < this.state.maxQuestions ||
			isQuestionAnswered
		) {
			let newArray = this.state.questions;
			newArray[0][this.state.currentquestion][0] = 0;
			newArray[0][this.state.currentquestion][1] = 0;
			newArray[0][this.state.currentquestion][2] = 0;

			const currentQuestion =
				questiondata.questions[this.state.currentquestion - 1];
			const { number, question } = currentQuestion;
			const answers = quizTracker.currentAnswers;
			if (answers.length) {
				quizTracker.add({ id: number, question, answer: answers });
			}

			this.setState((prevState) => {
				return {
					currentquestion: prevState.currentquestion + 1,
					questions: newArray,
					answerSelected: isQuestionAnswered,
					takeawayViewed: false,
				};
			});
		} else if (
			this.state.currentquestion === this.state.maxQuestions &&
			this.state.questions[0][this.state.currentquestion - 1][0] === 1
		) {
			const currentQuestion =
				questiondata.questions[this.state.currentquestion - 1];
			const { number, question } = currentQuestion;
			const answers = quizTracker.currentAnswers;
			quizTracker.add({ id: number, question, answer: answers });
			//Track quiz completion
			quizTracker.isComplete = true;
			const group = quizTracker.getGroup();
			//Update view
			this.setState((prevState) => {
				return { quizComplete: true, group: group };
			});
		}
	}

	checkSelection() {
		let selection = document.querySelectorAll(".current input:checked");
		if (!selection.length) {
			this.setState({
				answerSelected: false,
			});
			return false;
		}
		return true;
	}

	updateStatus(key, choice) {
		const isCheckOneBox = shouldHaveOneAnswer(choice);
		let exception = null;
		if (isCheckOneBox) {
			exception = choice.option;
		}
		uncheckboxes(exception);

		quizTracker.currentAnswers = choice;
		const isQuestionAnswered = Boolean(quizTracker.currentAnswers.length);
		let newArray = this.state.questions;
		let newTotal = this.getTotal();

		let trackedKey = key + 1;
		newArray[0][key][0] = 1; //Answered
		newArray[0][key][choice] = 1;

		this.setState({
			questions: newArray,
			total: newTotal,
			answerSelected: isQuestionAnswered,
		});
	}

	goToEnd() {
		this.setState({
			quizComplete: true,
		});
	}

	buildQuestions(questionsObject) {
		//FORMAT!!  Answered Yes No
		let questions = [];
		questions.push(questionsObject.map((object, key) => [0, 0, 0]));
		return questions;
	}

	getTotal() {
		let addedUp = document.querySelectorAll(".true:checked").length;
		let singleAnswers = document.querySelectorAll(
			"input[type='radio']:checked"
		);
		let multipleAnswers = document.querySelectorAll(
			"input[type='checkbox']:checked"
		);
		return addedUp;
	}

	render() {
		return (
			<div className="wrapper">
				<header>
					<a href="/">
						<img
							// src={
							// 	"https://source-media-brightspot-lower.s3.amazonaws.com/06/a7/682048314485a3317b80e1f69b9c/atlogo.png"
							// }
							src="https://arizent.brightspotcdn.com/16/d8/797fc38443bb83caf649880b26cd/brand-american-banker-black.svg"
							width={350}
							height={40}
							className="site-logo"
							alt="American Banker"
						/>
					</a>
					<span className="mobile--only sponsored-by">Sponsored By</span>

					<img
						src="https://arizent.brightspotcdn.com/82/7d/5a3d43e9439a8c1fb6eaccf3d067/onespan-logo.svg"
						className="sponsor-logo"
						alt="One Span"
					/>
					<span className="desktop--only sponsored-by">Sponsored By</span>
				</header>
				<section className="bluebar">
					{/* <a onClick={this.goToEnd.bind(this)}>Jump to the results</a> */}
					<h3 className="quiztitle">
						<span>Quiz:</span> {this.state.title}
					</h3>
				</section>
				<section>
					<p
						className={
							this.state.splashDisplay === true ||
							this.state.quizComplete === true ||
							this.state.currentquestion === "0"
								? "results hidden"
								: "counter"
						}
					>
						Question: <strong>{this.state.currentquestion}</strong> of{" "}
						<strong>{this.state.maxQuestions}</strong>
					</p>
				</section>
				<section
					className={
						this.state.splashDisplay === true
							? "intro displayed"
							: "intro hidden"
					}
				>
					<p className={"discription"}>
						Industries across the globe have shifted their technology
						investments toward cloud offerings and digital experiences. However,
						selecting the optimal blend of forms and eSignature providers to
						digitize agreement processes can be challenging. Left unoptimized,
						siloed systems put businesses at risk, while having the right
						approach delivers operational efficiencies, lowers costs, and a
						better customer experience. Take our short quiz to find out how your
						organization’s progress on its digital agreement readiness journey
						compares to your peers.
					</p>
					<button className={"start"} onClick={this.StartQuiz.bind(this)}>
						Start the quiz
					</button>
					{/* <SocialShare reactClickEvent={this.reactClickEvent} /> */}
				</section>
				<section
					className={
						this.state.splashDisplay === true ||
						this.state.quizComplete === true
							? "questions hidden"
							: "questions displayed"
					}
					style={{
						display: this.state.quizComplete === false ? "block" : "none",
					}}
				>
					{questiondata.questions.map((question, key) => (
						<Question
							text={question.question}
							type={question.type}
							key={key}
							index={key}
							takeaway={question.takeaway}
							answers={question.answers}
							currentSlide={this.state.currentquestion}
							answered={this.state.questions[0][key][0]}
							response={this.state.questions[0][key][1]}
							updateStatus={this.updateStatus.bind(this)}
						></Question>
					))}
				</section>
				<section
					className={
						this.state.quizComplete === false || this.state.confirmation
							? "results hidden"
							: "results shown"
					}
				>
					<div className="results--text">
						<Results />
					</div>
					<div className="resultsform">
						<h5>Register to view results and get the report</h5>
						<div className="piano-quiz-form"></div>
					</div>
				</section>
				<section
					className={
						this.state.confirmation
							? "confirmation shown"
							: "confirmation hidden"
					}
				>
					<Confirmation user={this.state.user} score={this.state.group} />
				</section>
				<div className="navigation">
					<div
						className={
							this.state.splashDisplay === true ||
							this.state.quizComplete === true
								? "controllers--hidden"
								: "controllers--displayed"
						}
					>
						{this.state.currentquestion > 1 && (
							<div>
								<a
									className={`previous ${
										this.state.answerSelected && this.state.takeawayViewed
											? "disabled"
											: ""
									}`}
									onClick={this.prevClick.bind(this)}
								>
									&#8592;&nbsp;previous
								</a>
							</div>
						)}{" "}
						<div>
							<button
								className={`next ${
									this.state.answerSelected ? "" : "disabled"
								}`}
								onClick={this.nextClick.bind(this)}
							>
								Next&nbsp;&#8594;
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
