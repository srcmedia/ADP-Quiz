export const isDebug = window.location.search.includes("debug_quiz");
export const ANSWER_TYPES = {
	RADIO: "radio",
	CHECKBOX: "checkbox",
};

const ONE_ANSWER_LIST = [
	"Don’t know",
	"None of these",
	"Not applicable, not using eSignatures",
];
const checkboxQuery = '.current .inputselect input[type="checkbox"]';

export const shouldHaveOneAnswer = (answer) => {
	const { type } = answer;
	if (type === ANSWER_TYPES.CHECKBOX) {
		const { option } = answer;
		return ONE_ANSWER_LIST.includes(option);
	}
	return false;
};

export const uncheckboxes = (exception) => {
	let checkboxes = document.querySelectorAll(checkboxQuery);
	checkboxes = Array.from(checkboxes);
	if (exception) {
		checkboxes
			.filter(({ name }) => reject(name, exception))
			.forEach(uncheckbox);
		return;
	}
	checkboxes.filter(({ name }) => singleSelect(name)).forEach(uncheckbox);
};

const uncheckbox = (checkbox) => {
	checkbox.checked = false;
};

export const nonSingleSelect = (value) => {
	return !ONE_ANSWER_LIST.includes(value);
};

export const singleSelect = (value) => {
	return ONE_ANSWER_LIST.includes(value);
};

const reject = (value, matcher) => {
	return value !== matcher;
};
