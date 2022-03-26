import React, { Component } from "react";

class Results extends Component {
	render() {
		let Result = null;

		Result = (
			<div>
				<div className="results-message">
					<p>
						Thank you for taking the Digital Agreement Readiness Assessment from
						American Banker and OneSpan.
					</p>
					<p>
						Register here to see how your organization’s progress on your
						digital agreement journey compares to your peers and to download
						this FREE report:
					</p>
				</div>

				<div className="asset-description">
					<p className="bold">AGREEMENT AUTOMATION BEST PRACTICES</p>
					<p className="bold">
						A Guide for Financial Institutions Purchasing Technology to Automate
						Account Opening, Digital Lending, Leasing, and other Financial
						Agreements
					</p>
					<p>
						Trillions of dollars in financial transactions are processed each
						year. Despite the rise of digital adoption within consumer
						industries, the majority of these financial agreements still rely on
						manual paper processes. Agreement automation enables financial
						institutions to digitize these transactions to improve the user
						experience and reduce risk.
					</p>
					<p>
						In this white paper, we recommend key areas to evaluate as you
						analyze how to remove friction and improve compliance in your
						digital agreements. You will learn:
					</p>

					<ul>
						<li>9 evaluation categories for digitizing agreement processes;</li>
						<li>
							How technology can help address issues like customer abandonment,
							long sales cycles, and poor customer experience;
						</li>
						<li>
							Best practices for transforming identity verification and document
							signing processes to improve compliance, eliminate human error,
							and reduce the risk of fraud.
						</li>
					</ul>
				</div>
			</div>
		);

		return <div>{Result}</div>;
	}
}

export default Results;
