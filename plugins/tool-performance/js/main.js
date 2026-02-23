'use strict';

import * as util from './util.js';
import {commonData} from './commonData.js';
import {parse} from './parse.js';
import {lighthouseApi} from './api/lighthouse.js';
//import {gscApi} from './api/gsc.js';
import {lighthousePopulate} from './populate/lighthouse.js';
//import {gscPopulate} from './populate/gsc.js';

document.addEventListener('DOMContentLoaded', async function() {

	function clear() {
		document.getElementById('mobile').innerHTML = '';
		document.getElementById('desktop').innerHTML = '';
		//document.getElementById('gscStatus').innerHTML = '';
		//document.getElementById('gscIssues').innerHTML = '';
	};

	function colorClear(elemIds) {
		elemIds.forEach((elemId) => {
			const element = document.querySelector(`[data-url='${elemId}']`);
			element.children[0].children[0].classList.remove(...colors);
		});
	};

	function newReport() {
		clear();
		reports = {};
		luColors = {};
		colorClear(pages);
		colorClear(LUs);
		storage.clear();
		document.getElementById('loader').style.display = 'block';
		reportGen();
	};

	function getDate(ts)
	{
		const date = new Date(ts), days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
		const dateStrg = `${days[date.getDay()]}, ${date.getDate()}/${('0' + String(date.getMonth())).slice(-2)}/${date.getFullYear()} ${('0' + String(date.getHours())).slice(-2)}:${('0' + String(date.getMinutes())).slice(-2)}:${('0' + String(date.getSeconds())).slice(-2)}`;
		return dateStrg;
	};

	function expiryCheck(storage) {
		let timeStamp = JSON.parse(storage.getItem('timeStamp')), duration = JSON.parse(storage.getItem('duration'));
		if (timeStamp === null) {     
			timeStamp = Date.now();
			duration = 2 * 60 * 60 * 1000;
			storage.setItem('timeStamp', JSON.stringify(timeStamp));
			storage.setItem('duration', JSON.stringify(duration));
		}

		else if (Date.now() > timeStamp + duration) {
			newReport();
			return true;
		}

		document.getElementById("timeStamp").innerHTML = getDate(timeStamp);
		return false;
	};

	function isElement(element) {
		return element instanceof Element || element instanceof HTMLDocument;
	};

	async function changeActive(elem) {
		const siblingTabs = elem.parentNode.children, subtabs = document.getElementById(elem.getAttribute('data-url') + 'SubTabs');
		Object.keys(siblingTabs).forEach((key, i) => {
			siblingTabs[key].classList.remove('is-active');
		});

		elem.classList.add('is-active');
		if(isElement(active) && !active.contains(elem))
		{
			active.classList.add('no-show');
			active.style.display = 'none';
			active = {};
		}

		if(subtabs === null)
		{
			if(!(elem.getAttribute('data-url') in reports))
			{
				document.getElementById('loader').style.display = 'block';
				clear();
			}

			else
			{
				document.getElementById('loader').style.display = 'none';
				populate(elem.getAttribute('data-url'), reports[elem.getAttribute('data-url')]);
			}
		}

		else
		{
			subtabs.classList.remove('no-show');
			subtabs.style.display = 'block';
			active = subtabs;

			const currTabs = document.getElementsByClassName('is-active');
			Object.keys(currTabs).forEach((key, ind) => {
				if(subtabs.contains(currTabs[key]))
				{
					changeActive(currTabs[key]);
				}
			});
		}
	};

	function populate(link, report) {
		lighthousePopulate(link, report['lighthouse']);
		//gscPopulate(link, report['gsc']);
	};

	const storage = window.localStorage, tabs = document.getElementsByClassName('v-tabs'), colors = ['red', 'orange', 'green'];
	let active = {}, luColors = {};
	const [pages, LUs] = parse(tabs);

	const subArrs = util.splitToChunks([...pages], 5);
	let reports = {};

	function reportGen() {
		const promises = subArrs.map(async (pages, i) => {
			for(let i = 0; i < pages.length; i += 1)
			{
				const report = JSON.parse(storage.getItem(pages[i]));

				if(expiryCheck(storage))
				{
					break;
				}

				if(report !== null && /*Object.keys(report.gsc).length &&*/ Object.keys(report.lighthouse).length)
				{
					reports[pages[i]] = {...report};
				}

				else
				{
					const lighthouseRes = await lighthouseApi(pages[i], commonData.api['lighthouse']);
						//gscRes = await gscApi(pages[i], commonData.api['gsc']);
					reports[pages[i]] = {
						lighthouse: {...lighthouseRes},
						//gsc: {...gscRes}
					};

					storage.setItem(pages[i], JSON.stringify(reports[pages[i]]));
				}

				const mobPerfScore = reports[pages[i]]['lighthouse']['mobile']['Scores']['performance'], tab = document.querySelector(`[data-url='${pages[i]}']`), currColor = util.colorScheme(mobPerfScore);
				let parentLU = null;

				LUs.forEach((lu, ix) => {
					const luElem = document.getElementById(lu + 'SubTabs');
					if(luElem.contains(tab))
					{
						parentLU = document.querySelector(`[data-url='${lu}']`);
						const parentTabText = parentLU.children[0].children[0];
						if(!(lu in luColors))
						{
							luColors[lu] = currColor;
							parentTabText.classList.add(colors[currColor]);
						}

						else if(luColors[lu] > currColor)
						{
							parentTabText.classList.remove(colors[luColors[lu]]);
							luColors[lu] = currColor;
							parentTabText.classList.add(colors[currColor]);
						}
					}
				});

				tab.children[0].children[0].classList.add(colors[currColor]);

				if(tab.classList.contains('is-active'))
				{
					if(parentLU === null || parentLU.classList.contains('is-active'))
					{
						document.getElementById('loader').style.display = 'none';
						populate(pages[i], reports[pages[i]]);
					}
				}
			}
		});

		Promise.all(promises);
	};

	reportGen();
	Object.keys(tabs).forEach((listIdx, ix) => {
		const tabList = tabs[listIdx].children[0].children;
		Object.keys(tabList).forEach((tab, ix) => {
			tabList[tab].addEventListener("click", (event) => changeActive(event.currentTarget));
		});
	});

	document.getElementById('newReport').addEventListener("click", (event) => newReport());
});
