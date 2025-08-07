import * as util from '../util.js';

export async function gscApi(link, api) {
	const parameters = { key: api.key }, url = util.setUpQuery(link, api.url, parameters), result = {};

	const response = await axios.post(url, {
		"url": link,
		"requestScreenshot": false
	});

	const json = response.data;
	result['Status'] = json['mobileFriendliness'];
	result['Issues'] = [];

	if (json.mobileFriendlyIssues) {
		result['Issues'] = json['mobileFriendlyIssues'];
	}

	return {...result};
};
