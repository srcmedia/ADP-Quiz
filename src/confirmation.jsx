import React from "react";
import messageData from "./messageData";

const getMessageDescription = (score) => {
	const message = messageData[score];
	return message;
};
const Confirmation = ({ user, score }) => {
	const description = getMessageDescription(score);
	return (
		<div className="confirmation">
			<div className="message">
				<div className="message-title">
					Thank you for taking the Digital Agreement Readiness Assessment from
					American Banker and OneSpan. Your results below provide insight into
					how your organization’s efforts to digitize agreement processes
					compare to your peers.
				</div>
				<div className="message-description">{description}</div>
			</div>
			<hr />
			<div className="resource">
				<div className="resource-title">
					Download this report to see how your organization can build on its
					efforts and advance its digital agreement readiness.
				</div>
				<div className="resource-download">
					<a
						href="https://arizent.brightspotcdn.com/c0/51/fc37d50344b091fe8b59c95dfaad/onespan-whitepaper-lt-rfp-guide-for-assessment-quiz.pdf"
						target="_blank"
						type="application/pdf"
					>
						<button>DOWNLOAD NOW</button>
					</a>
				</div>
				<p>We've emailed a copy to {user}.</p>
				<hr />
				<div className="resource-description">
					FINANCIAL AGREEMENT AUTOMATION RFP GUIDEA Guide for Financial
					Institutions Purchasing Technology to Automate Account Opening,
					Digital Lending, Leasing, and other Financial Agreements.
				</div>
			</div>
		</div>
	);
};

export default Confirmation;
