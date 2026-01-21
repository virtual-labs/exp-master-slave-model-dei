export function parse(tabs) {
	let pages = [], LUs = [];
	const origin = window.location.origin, pathArray = window.location.pathname.split('/');
	let base_url = origin;
	pathArray.forEach((part, ix) => {
		if(ix !== pathArray.length - 1)
		{
			base_url += "/" + part;
		}
	});

	//base_url = "https://virtual-labs.github.io/temp-exp-bubble-sort-iiith";
	Object.keys(tabs).forEach((listIdx, ix) => {
		const tabList = tabs[listIdx].children[0].children;
		Object.keys(tabList).forEach((tab, ix) => {
			const subtabs = document.getElementById(tabList[tab].getAttribute('data-url') + 'SubTabs');
			if(subtabs === null)
			{
				tabList[tab].setAttribute('data-url', base_url + '/' + tabList[tab].getAttribute('data-url'));
				pages.push(tabList[tab].getAttribute('data-url'));
			}

			else
			{
				subtabs.style.display = 'none';
				LUs.push(tabList[tab].getAttribute('data-url'));
			}
		});
	});

	return [pages, LUs];
};
