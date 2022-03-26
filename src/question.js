import React, { Component } from "react";
class Question extends Component {
	constructor(props) {
		super(props);
		this.state = {
			slideClass: "card",
			answered: false,
		};
		this.answerOnClick = this.answerOnClick.bind(this);
	}
	componentDidMount() {
		this.setState({
			slideClass:
				this.props.currentSlide - 1 === this.props.index
					? "card current"
					: "card",
		});
	}

	checkStatus(inClass) {
		let response = this.state.slideClass;
		if (
			this.props.currentSlide - 1 === this.props.index &&
			inClass === undefined
		) {
			response = response + " current";
		}
		if (inClass !== undefined && this.props.currentSlide !== 0) {
			response = response + " answered";
		}
		if (this.props.currentSlide - 1 !== this.props.index) {
			response = "card";
		}
		return response;
	}
	answerOnClick(event, value) {
		const isAnswered = event.target.checked;
		const typeValue = Object.assign(value, {
			type: this.props.type,
			selected: isAnswered,
		});
		this.props.updateStatus(this.props.index, typeValue);
	}

	render() {
		const answers = this.props.answers;
		return (
			<div
				className={
					"questions card cf" +
					(this.props.currentSlide - 1 === this.props.index
						? " current"
						: " hidden")
				}
			>
				<h2>{this.props.text}</h2>
				<div className="inputselect">
					{answers && (
						<ul>
							{answers.map((answer, index) =>
								this.props.type === "radio" ? (
									<li key={index}>
										<input
											type={this.props.type}
											name={this.props.index}
											className={index === 0 ? "true" : "false"}
											onClick={(e) =>
												this.answerOnClick(e, { ...answer, id: index })
											}
											value={answer.value}
										></input>
										<label>{answer.option}</label>
									</li>
								) : (
									<li key={index}>
										<label className="container">
											{answer.option}
											<input
												type="checkbox"
												name={answer.option}
												className={index === 0 ? "true" : "false"}
												onClick={(e) =>
													this.answerOnClick(e, { ...answer, id: index })
												}
												value={answer.value}
											/>
											<span className="checkmark"></span>
										</label>
									</li>
								)
							)}
						</ul>
					)}

					{this.props.takeaway && (
						<div className="takeaway">
							<h4>Takeaway:</h4>
							{this.props.takeaway.map(
								({ text, bulletPoints, boldText, numbered }, key) => (
									<div key={key}>
										<p>{text}</p>
										{bulletPoints && (
											<ol className={`${numbered ? "numbered" : ""}`}>
												{bulletPoints.map((bulletPoint, key) => (
													<li key={key}>{bulletPoint}</li>
												))}
											</ol>
										)}
										{boldText && <b>{boldText}</b>}
									</div>
								)
							)}
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default Question;
