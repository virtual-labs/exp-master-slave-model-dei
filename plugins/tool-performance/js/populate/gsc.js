import * as util from '../util.js';

export function gscPopulate(link, data)
{
	const statusElem = document.getElementById('gscStatus');
	statusElem.innerHTML = '';
	util.genText(statusElem, "Mobile Friendliness Status: " + data['Status'], "Mobile Friendliness Status: " + data['Status'].replace(/_/g, " "));

	const issuesElem = document.getElementById('gscIssues');
	issuesElem.innerHTML = '';
	if(data['Issues'].length)
	{
		document.getElementById('gscIcon').style.display = 'inline-block';
		document.getElementById('card-toggle').style.color = 'red';
		data['Issues'].forEach((issue, idx) => {
			const issueDiv = document.createElement("div");
			util.genText(issueDiv, issue, issue);
			issueDiv.classList.add('issue');
			issuesElem.appendChild(issueDiv);
		});
	}

	else
	{
		document.getElementById('gscIcon').style.display = 'none';
		document.getElementById('card-toggle').style.color = 'green';
	}

	const cardToggles = document.getElementsByClassName('card-toggle');
	Object.keys(cardToggles).forEach((key, ind) => {
		cardToggles[ind].addEventListener('click', e => {
			e.currentTarget.parentNode.children[1].classList.toggle('is-hidden');
		});
	});
};
