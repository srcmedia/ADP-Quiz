import { isDebug, nonSingleSelect, shouldHaveOneAnswer } from "./utils";

class Tracking {
	constructor() {
		this._completed = false;
		this._progress = [];
		this._currentAnswers = [];
	}

	init() {
		this.addEventListners();
	}

	addEventListners() {
		window.tp = window.tp || [];

		window.tp.push([
			"addHandler",
			"checkoutCustomEvent",
			function (event) {
				const formSubmitEvent = new CustomEvent("piano-form-submit", {
					detail: event.params,
				});
				switch (event.eventName) {
					case "piano-quiz-form":
						document.dispatchEvent(formSubmitEvent);
						break;
					case "quiz-submit":
						document.dispatchEvent(formSubmitEvent);
						break;
					default:
						return;
				}
			},
		]);

		window.tp.push([
			"init",
			function () {
				window.tp.experience.init();
			},
		]);
	}

	add(question) {
		const index = this.find(this._progress, "id", question.id);
		if (index >= 0) {
			this._progress[index] = question;
		} else {
			this._progress.push(question);
		}

		this.flushCurrentAnswers();
		this.track(QUIZ_EVENTS.SURVEY, question);
	}

	find(arr, key, value) {
		return arr.findIndex((element) => element[key] === value);
	}

	set isComplete(status) {
		this._completed = status;
		this.track(QUIZ_EVENTS.COMPLETE, this.progress);
	}

	get isComplete() {
		return this._completed;
	}
	get progress() {
		return this._progress;
	}

	get currentAnswers() {
		return this._currentAnswers;
	}

	set currentAnswers(answer) {
		if (answer.type === "radio") {
			this.flushCurrentAnswers();
			this._currentAnswers.push(answer);
			return;
		}
		if (answer.selected === false) {
			const unselected = this.find(this._currentAnswers, "id", answer.id);
			if (unselected >= 0) {
				this._currentAnswers.splice(unselected, 1);
			}
			return;
		}
		if (shouldHaveOneAnswer(answer)) {
			this.flushCurrentAnswers();
			this._currentAnswers.push(answer);
			return;
		}
		const withoutSingleSelect = this._currentAnswers.filter(({ option }) =>
			nonSingleSelect(option)
		);
		this._currentAnswers = withoutSingleSelect;
		this._currentAnswers.push(answer);
	}

	restorePreviousAnswers(answers) {
		this._currentAnswers = answers;
	}

	flushCurrentAnswers() {
		this._currentAnswers = [];
	}

	track(event, data) {
		if (event === QUIZ_EVENTS.START) {
			const data = this.getEventData(QUIZ_EVENTS.START);
			this.dataLayerPush(QUIZ_EVENTS.START, data);
			return;
		}
		const trackingData = data || this.progress;
		this.dataLayerPush(event, trackingData);
		this.zetaPush(event, trackingData);
	}

	zetaPush(event, data) {
		const quizId = 1;
		const quizName = "OneSpan_DigitalAgreementReadiness";
		const quizUrl = `${window.location.hostname}/quiz/digital-agreement-readiness`;
		const quizSource = "manual";
		const submissionTime = new Date().toISOString();

		switch (event) {
			case QUIZ_EVENTS.SURVEY: {
				const quizSurveyData = {
					quizId,
					quizName,
					quizUrl,
					quizSource,
					submissionTime,
					responses: this.progress,
					quizCompleted: false,
				};
				this.bt("track", QUIZ_EVENTS.SURVEY, quizSurveyData);
				break;
			}
			case QUIZ_EVENTS.COMPLETE: {
				const quizCompleteData = {
					quizId,
					quizName,
					quizUrl,
					quizSource,
					group: this.getGroup(),
					submissionTime,
					quizCompleted: true,
				};
				this.bt("track", QUIZ_EVENTS.COMPLETE, quizCompleteData);
				break;
			}
			case QUIZ_EVENTS.FORM_SUBMIT: {
				const { email, fname, lname } = data;
				const user = {
					email,
					first_name: fname,
					last_name: lname,
				};
				const trackingData = {
					...data,
					submission_date: submissionTime,
					quizName,
					group: this.getGroup(),
					responses: this.progress,
				};
				this.bt("updateUser", user);
				this.bt("track", QUIZ_EVENTS.FORM_SUBMIT, trackingData);
				break;
			}
			default:
				return;
		}
	}

	getTotalScore() {
		const total = this.progress
			.map(this.getAnswers)
			.map(this.getValues)
			.reduce(this.getScore);
		isDebug && console.log("total: ", total);
		return total;
	}

	getAnswers(question) {
		const answers = question.answer;
		return answers;
	}

	getValues(answers) {
		const values = answers.map((answer) => answer.value);
		const total = values.reduce((prev, curr) => prev + curr);
		isDebug && console.log("answers: ", answers);
		return total;
	}

	getScore(prev, curr) {
		return prev + curr;
	}

	getGroup() {
		const score = this.getTotalScore();
		if (score <= 1400) return "ONE";
		if (score <= 1864) return "TWO";
		if (score <= 2520) return "THREE";
		if (score >= 2521) return "FOUR";
		return "UNKOWN";
	}

	dataLayerPush(event, data) {
		const pushData = this.getPushabledata(event, data);
		this.dataLayer.push(pushData);
	}

	get dataLayer() {
		window.dataLayer = window.dataLayer || [];
		return window.dataLayer;
	}

	get bt() {
		window.bt =
			window.bt ||
			function () {
				(window["_bt"] = window["_bt"] || []).push(arguments);
			};
		return window.bt;
	}

	getPushabledata(event, data) {
		return {
			event: event,
			[`${event}Data`]: data,
		};
	}

	getEventData(label) {
		return {
			category: "Sponsored Quiz",
			action: "OneSpan_DigitalAgreementReadiness",
			label,
		};
	}
}

export const QUIZ_EVENTS = {
	COMPLETE: "quiz_complete",
	SURVEY: "quiz_survey",
	FORM_SUBMIT: "quiz_complete_form",
	START: "start",
};

export default Tracking;
