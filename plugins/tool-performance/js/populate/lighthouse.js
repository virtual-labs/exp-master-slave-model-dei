import {commonData} from '../commonData.js';
import * as util from '../util.js';

function genLink(elem, link)
{
	const a = document.createElement('a');
	a.textContent = 'Detailed Report';
	a.href = link;
	a.target = "_blank";
	a.classList.add('is-size-4', 'link');
	elem.appendChild(a);
};

function drawCircle(ctx, radius, color, percent) {
	percent = Math.min(Math.max(0, percent || 1), 1);
	ctx.beginPath();
	ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
	ctx.strokeStyle = color;
	ctx.stroke();
};

function scoreDial(segment, score)
{
	const canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
	const options = {
		size: 100,
		lineWidth: 5,
		rotate: 0
	};

	canvas.width = canvas.height = options.size;
	ctx.translate(options.size / 2, options.size / 2); // change center
	ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg

	const radius = (options.size - options.lineWidth) / 2;
	ctx.lineCap = 'round';
	ctx.lineWidth = options.lineWidth;
	const colors = ['red', 'orange', 'green'];
	const color = colors[util.colorScheme(score)];

	drawCircle(ctx, radius, '#efefef', 100 / 100);
	drawCircle(ctx, radius, color, score / 100);

	ctx.rotate((1 / 2 + options.rotate / 180) * Math.PI); // rotate 90 deg to original config
	ctx.font = "30px Arial";
	ctx.fillStyle = color;
	ctx.fillText(score, -15, 10);

	segment.appendChild(canvas);
};

function genTitle(elem, title) {
	const titleDiv = document.createElement("div");
	titleDiv.classList.add('subtitle', 'is-2');
	const text = document.createTextNode(title);
	titleDiv.appendChild(text);
	elem.appendChild(titleDiv);
};

export function lighthousePopulate(link, data)
{
	Object.keys(data).forEach((device, idx) => {
		const segment = document.getElementById(device);
		segment.innerHTML = '';

		const titleCols = util.genColumnsContainer(segment), linkCols = util.genColumnsContainer(segment), dialsCols = util.genColumnsContainer(segment), metricCols = util.genColumnsContainer(segment);
		const titleColumn = util.genColumn(titleCols), metricColumn = util.genColumn(metricCols), half = Math.floor((Object.keys(data[device]).length - 2) / 2), table = document.createElement('table');
		table.classList.add('table', 'is-bordered');
		metricColumn.appendChild(table);

		let ctr = 0, row = table.insertRow();
		genTitle(titleColumn, device[0].toUpperCase() + device.slice(1));

		Object.keys(data[device]).reverse().forEach(function(metric, ind) {
			if(metric === 'Scores')
			{
				Object.keys(data[device]['Scores']).forEach((key, ix) => {
					const column = util.genColumn(dialsCols);
					scoreDial(column, data[device]['Scores'][key]);
					util.genText(column, key, commonData.scoreMap[key], true);
				});
			}

			else if(metric === 'Detailed Report')
			{
				const column = util.genColumn(linkCols);
				column.innerHTML = "<sup><b>*</b></sup>";
				genLink(column, data[device]['Detailed Report']);
			}

			else
			{
				if(Object.keys(row.children).length === 4)
				{
					row = table.insertRow();
				}

				let cell = row.insertCell();
				util.genText(cell, metric, metric, true);
				cell = row.insertCell();
				util.genText(cell, data[device][metric], data[device][metric]);
				ctr += 1;
			}
		});
	});
};
