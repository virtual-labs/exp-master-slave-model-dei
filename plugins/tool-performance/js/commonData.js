export const commonData = {
	"api": {
		"lighthouse": {
			"url": "https://www.googleapis.com/pagespeedonline/v5/runPagespeed",
			"key": "AIzaSyAVkdhwABn964MsgQmYvLF7MQsASFNSEQ8",
		},
		"gsc": {
			"url": "https://searchconsole.googleapis.com/v1/urlTestingTools/mobileFriendlyTest:run",
			"key": "AIzaSyBJ5sSM3HpctL3mQyxibLr6ceYQHlPL7oc",
		},
	},
	"scoreMap": {
		"performance": "Performance",
		"accessibility": "Accessibility",
		"best-practices": "Best Practices",
		"seo": "SEO",
	},
	"descriptions": {
		"performance": "Performance is the speed at which a website loads. <a href='https://web.dev/performance-scoring/?utm_source=lighthouse&utm_medium=lr' target='_blank'>Learn more</a>.",
		"accessibility": "These checks highlight opportunities to <a href='https://developers.google.com/web/fundamentals/accessibility?utm_source=lighthouse&utm_medium=lr' target='_blank'>improve the accessibility of your web app</a>. A site is said to be accessible if the site's content is available and its functionality can be operated by literally anyone.",
		"best-practices": "Best Practices is a list of audits that check common mistakes in web development. <a href='https://web.dev/lighthouse-best-practices/' target='_blank'>Learn more</a>.",
		"seo": "It stands for Search Engine Optimization. These checks ensure that your page is optimized for search engine results ranking. <a href='https://support.google.com/webmasters/answer/35769' target='_blank'>Learn more</a>.",
		"First Contentful Paint": "First Contentful Paint marks the time at which the first text or image is painted. <a href='https://web.dev/first-contentful-paint/?utm_source=lighthouse&utm_medium=lr' target='_blank'>Learn more</a>.",
		"Speed Index": "Speed Index shows how quickly the contents of a page are visibly populated. <a href='https://web.dev/speed-index/?utm_source=lighthouse&utm_medium=lr' target='_blank'>Learn more</a>.",
		"Largest Contentful Paint": "Largest Contentful Paint marks the time at which the largest text or image is painted. <a href='https://web.dev/lighthouse-largest-contentful-paint/?utm_source=lighthouse&utm_medium=lr' target='_blank'>Learn more</a>",
		"Time To Interactive": "Time to interactive is the amount of time it takes for the page to become fully interactive. <a href='https://web.dev/interactive/?utm_source=lighthouse&utm_medium=lr' target='_blank'>Learn more</a>.",
		"Total Blocking Time": "Sum of all time periods between FCP and Time to Interactive, when task length exceeds 50ms, expressed in milliseconds. <a href='https://web.dev/lighthouse-total-blocking-time/?utm_source=lighthouse&utm_medium=lr' target='_blank'>Learn more</a>.",
		"Cumulative Layout Shift": "Cumulative Layout Shift measures the movement of visible elements within the viewport. <a href='https://web.dev/cls/?utm_source=lighthouse&utm_medium=lr' target='_blank'>Learn more</a>.",
	},
};
