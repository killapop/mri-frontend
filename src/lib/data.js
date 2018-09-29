import _ from 'lodash';
const testData = require('../data/testData.js');

const apiPath = 'somepath';

const allData = {};

export const fetchData = () => {
	fetch(apiPath)
		.then(response => {
			if (!response.ok) {
				console.log(response.statusText);
			}
			return testData;
		})
		.then(data => {
			_.merge(allData, data);
		})
		.catch(error => console.log(error));
};
