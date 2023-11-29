import * as util from '../util.js';

function detailedLink(url, strategy) {
	return 'https://googlechrome.github.io/lighthouse/viewer/?psiurl=' + url + '&strategy=' + strategy;
}

export async function lighthouseApi(link, api) {
	const strategy = ['mobile', 'desktop'], pageData = {};

	const proms = strategy.map(async (val, ind) => {
		const parameters = {
			url: encodeURIComponent(link),
			key: api.key,
			category: ['performance', 'accessibility', 'best-practices', 'seo'/*, 'pwa'*/],
			strategy: val 
		}, url = util.setUpQuery(link, api.url, parameters);


		const response = await axios.get(url);
		const json = response.data;

		//const cruxMetrics = {
		//"First Contentful Paint": json.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.category,
		//"First Input Delay": json.loadingExperience.metrics.FIRST_INPUT_DELAY_MS.category
		//};

		const lighthouse = json.lighthouseResult;
		const metrics = {
			'Time To Interactive': lighthouse.audits['interactive'].displayValue,
			'Speed Index': lighthouse.audits['speed-index'].displayValue,
			'First Contentful Paint': lighthouse.audits['first-contentful-paint'].displayValue,
			'Total Blocking Time': lighthouse.audits['total-blocking-time'].displayValue,
			'Largest Contentful Paint': lighthouse.audits['largest-contentful-paint'].displayValue,
			'Cumulative Layout Shift': lighthouse.audits['cumulative-layout-shift'].displayValue,
		};

		metrics['Scores'] = {};
		Object.keys(lighthouse.categories).forEach(function(category, index) {
			metrics['Scores'][category] = lighthouse.categories[category].score * 100;
		});

		metrics['Detailed Report'] = detailedLink(link, val);
		pageData[val] = metrics;
	});

	await Promise.all(proms);
	return {...pageData};
};
