"use strict";

function display(text) {
  let logs = text.split("\n");
  let output = "";
  logs.forEach((log) => {
    output += `<p>${log}\n</p>`;
  });
  document.getElementById("output").innerHTML = output;
}

async function getLog(file, type) {
  let x = await fetch(file);
  let y = await x.text();
  let output = "";
  if (type === "eslint") {
    output = generateTabs(handleDataEslint(y), type);
    document.getElementById("output-eslint").innerHTML = output;
  } else if (type === "https") {
    output = generateTabs(handleDataHttps(y), type);
    document.getElementById("output-https").innerHTML = output;
  } else if (type === "descriptor") {
    output = generateTabs(handleDataDescriptor(y), type);
    document.getElementById("output-descriptor").innerHTML = output;
  } else if (type === "assesment") {
    output = generateTabs(handleAssesment(y), type);
    document.getElementById("output-assesment").innerHTML = output;
  }
}

function handleAssesment(data){
  let logs = data.split("\n");
  let formatted_data = {};
  let currentKey = "";
  let totalFiles = 0;
  let count = 0;
  for (let i=0;i<logs.length;i++){
    if(logs[i].startsWith("=")){
      totalFiles++;
      // key is everything after =
      const key = getFilenameFromPath(logs[i].split("=")[1]);
      if(key in formatted_data){
        continue;
      }
      else{
        formatted_data[key] = [];
      }
      currentKey = key;
      // skip next 10 lines
      i+=13;
    }
    else if(logs[i] === "Validated true"){
      // remove key from formatted_data
      delete formatted_data[currentKey];
      continue;
      // formatted_data[currentKey].push("Validated true"); 
    }
    // else if logs[i] is not empty
    else if(logs[i].length > 0){
      count++;
      formatted_data[currentKey].push(logs[i]);
    }
  }
  let stats = `Total Files: ${totalFiles} <br>
  ✖ ${count} problems (0 errors, ${count} warnings)`;
  formatted_data["FINAL_STATS"] = stats;
  return formatted_data;
}

function getFilenameFromPath(path) {
  // get filename from path by splitting path by last occurence of / or \
  const filename = path.split(/[\\/]/).pop();
  return filename;
}


function handleDataEslint(data) {
  let logs = data.split("\n");
  let formatted_data = {};
  let stats = "";
  let flag = false;
  let last_key = "";
  for (let i = 0; i < logs.length; i++) {
    if (flag == true) {
      if (logs[i].startsWith(" ")) {
        formatted_data[last_key].push(logs[i]);
      } else {
        flag = false;
      }
    } else {
      if (logs[i].length > 0) {
        if (logs[i].startsWith("✖")) {
          stats = logs[i];
          continue;
        }
        const filename = getFilenameFromPath(logs[i]);
        formatted_data[filename] = [];
        last_key = filename;
        flag = true;
      }
    }
  }
  formatted_data["FINAL_STATS"] = stats;
  return formatted_data;
}

function handleDataHttps(data) {
  let logs = data.split("\n");
  let formatted_data = {};
  let count = 0;
  for (let i = 0; i < logs.length; i++) {
    if (logs[i].length == 0) continue;
    let log = logs[i].split("     ");
    const key = log[0];
    const value = log[1] || "";
    if (value !== "") {
      count++;
    } else {
      continue;
    }
    if (key in formatted_data) {
      formatted_data[key].push(value);
    } else {
      formatted_data[key] = [value];
    }
  }
  let stats = `Total Links: ${count} <br>
                ✖ ${count} problems (0 errors, ${count} warnings)`;

  formatted_data["FINAL_STATS"] = stats;
  //   console.log(formatted_data);
  return formatted_data;
}

function handleDataDescriptor(data) {
  let logs = data.split("\n");
  // remove first 6 lines and last 2 lines
  logs = logs.slice(6, logs.length - 2);
  let formatted_data = {};
  let count = 0;
  for (let i = 0; i < logs.length; i++) {
    // check if line starts with /
    if (logs[i].startsWith("/")) {
      count++;
      // get filename
      const head = logs[i].split(":")[0];
      let text = logs[i].split(":")[1];
      text = text.trim();
      const filename = head[i].split("/")[1];

      // get index
      let index = "";
      let path = head.split("/");
      for (let i = 0; i < path.length; i++) {
        // if path[i] is a string of numbers
        if (!isNaN(path[i])) {
          if (index === "") {
            index = path[i];
          } else {
            index += `.${path[i]}`;
          }
        }
      }
      // add index to text
      text = `${index}: ${text}`;
      if (filename in formatted_data) {
        formatted_data[filename].push(text);
      } else {
        formatted_data[filename] = [text];
      }
    } else if (logs[i].startsWith("Json Error:")) {
      if("base" in formatted_data) {
        formatted_data["base"].push(`0: ${logs[i].split(":")[1].trim()}`);
      } else {
        formatted_data["base"] = [`0: ${logs[i].split(":")[1].trim()}`];
      }
      count++;
    }
  }
  let stats = `✖ ${count} problems (0 errors, ${count} warnings)`;

  formatted_data["FINAL_STATS"] = stats;
  //   console.log(formatted_data);
  return formatted_data;
}

function generateTab(filename, data, index, type) {
  const tabulated_data = generateTable(data, type);
  const tab = `
    <div class="tab">
        <input class="cb" type="checkbox" id="chck${index}">
        <label class="tab-label" for="chck${index}">${filename}</label>
        <div class="tab-content" align="left">
            ${tabulated_data}
        </div>
    </div>`;
  return tab;
}

// data is a dictionary with key as filename and value as array of data strings
function generateTabs(data, type) {
  let stats = "";
  stats = data["FINAL_STATS"];
  delete data["FINAL_STATS"];
  let tabs = "";
  let index = 0;
  for (let filename in data) {
    index++;
    tabs += generateTab(filename, data[filename], `-${type}${index}`, type);
  }
  return `
    <div class="tabs is-flex is-flex-direction-column">
        ${tabs}
    </div>
    <div class="is-flex is-flex-direction-column">
        <p>${stats}</p>
    </div>`;
}

function generateTable(data, type) {
  let table = "";
  for (let i = 0; i < data.length; i++) {
    table += generateRow(data[i], type);
  }
  const headers = generateHeaders(type);
  return `
    <table class="data-table">
        ${headers}
        <tbody>
            ${table}
        </tbody>
    </table>`;
}

function generateHeaders(type) {
  let headers = "";
  if (type === "eslint") {
    headers = `
        <th style="width: 10%;">Position</th>
        <th style="width: 10%;">Severity</th>
        <th style="width: 60%; margin-right: 5%;">Message</th>
        <th style="width: 15%;">Rule</th>`;
  } else if (type === "https" || type === "assesment") {
    headers = `<th style="width: 15%;">Severity</th>
                <th>Link</th>`;
  }
  else if (type === "descriptor") {
    headers = `<th style="width: 10%;">Index</th>
                <th style="width: 15%;">Severity</th>
                <th>Message</th>`;
  }
  let head = `<thead><tr>${headers}</tr></thead>`;
  return head;
}

function generateRow(data, type) {
  let row = "";
  // split with tab
  let split_data = data.split("  ");
  // remove all empty strings
  split_data = split_data.filter(function (el) {
    return el != "";
  });

  let severity = "";

  if (type === "eslint") {
    // check severity
    // clear all whitespaces
    split_data[1] = split_data[1].replace(/\s/g, "");
    severity = split_data[1];
    if (split_data[1] == "error") {
      split_data[1] = `<div class="status-chip background-error">${split_data[1]}</div>`;
    } else if (split_data[1] == "warning") {
      split_data[1] = `<div class="status-chip background-warning">${split_data[1]}</div>`;
    }

    // message
    split_data[2] = `<div class="eslint-message">${split_data[2]}</div>`;
  } else if (type === "https" || type === "assesment") {
    split_data.unshift(
      `<div class="status-chip background-warning">warning</div>`
    );
    severity = "warning";
    // link
    split_data[1] = `<div class="https-link">${split_data[1]}</div>`;
  }
  else if (type === "descriptor") {
    split_data = []
    split_data.push(data.split(":")[0]);
    split_data.push(`<div class="status-chip background-warning">warning</div>`);
    split_data.push(data.split(":")[1]);
  }

  for (let i = 0; i < split_data.length; i++) {
    row += `<td class="table-cell">${split_data[i]}</td>`;
  }
  return `<tr class="table-row is-${severity}">${row}</tr>`;
}

window.toggleEslint = () => {
  const eslint = document.getElementById("eslint");
  const checkbox = document.getElementById("checkbox-eslint");
  if (checkbox.checked) {
    eslint.style.display = "inline-block";
  } else {
    eslint.style.display = "none";
  }
};

window.toggleHttps = () => {
  const https = document.getElementById("https");
  const checkbox = document.getElementById("checkbox-https");
  if (checkbox.checked) {
    https.style.display = "inline-block";
  } else {
    https.style.display = "none";
  }
};

window.toggleDescriptor = () => {
  const descriptor = document.getElementById("descriptor");
  const checkbox = document.getElementById("checkbox-descriptor");
  if (checkbox.checked) {
    descriptor.style.display = "inline-block";
  } else {
    descriptor.style.display = "none";
  }
};

window.toggleAssesment = () => {
  const assesment = document.getElementById("assesment");
  const checkbox = document.getElementById("checkbox-assesment");
  if (checkbox.checked) {
    assesment.style.display = "inline-block";
  } else {
    assesment.style.display = "none";
  }
};

function collapseEslint() {
  const eslint = document.getElementById("eslint");
  const checkboxes = eslint.querySelectorAll(".cb");
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false;
  }
}

function collapseHttps() {
  const https = document.getElementById("https");
  const checkboxes = https.querySelectorAll(".cb");
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false;
  }
}

function collapseDescriptor() {
  const descriptor = document.getElementById("descriptor");
  const checkboxes = descriptor.querySelectorAll(".cb");
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false;
  }
}

function collapseAssesment() {
  const assesment = document.getElementById("assesment");
  const checkboxes = assesment.querySelectorAll(".cb");
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false;
  }
}

function toggleWarning() {
  const checkbox = document.getElementById("checkbox-warning");
  const warnings = document.getElementsByClassName("is-warning");

  if (checkbox.checked) {
    for (let i = 0; i < warnings.length; i++) {
      warnings[i].style.display = "table-row";
    }
  } else {
    for (let i = 0; i < warnings.length; i++) {
      warnings[i].style.display = "none";
    }
  }
}

function toggleError() {
  const checkbox = document.getElementById("checkbox-error");
  const errors = document.getElementsByClassName("is-error");

  if (checkbox.checked) {
    for (let i = 0; i < errors.length; i++) {
      errors[i].style.display = "table-row";
    }
  } else {
    for (let i = 0; i < errors.length; i++) {
      errors[i].style.display = "none";
    }
  }
}

function collapseAll() {
  collapseEslint();
  collapseHttps();
  collapseDescriptor();
  collapseAssesment();
}

window.collapseEslint = collapseEslint;
window.collapseHttps = collapseHttps;
window.collapseDescriptor = collapseDescriptor;
window.collapseAssesment = collapseAssesment;
window.collapseAll = collapseAll;

window.toggleWarning = toggleWarning;
window.toggleError = toggleError;

await getLog("eslint.log", "eslint");
await getLog("links.log", "https");
await getLog("assesment.log", "assesment");
await getLog("validate.log", "descriptor");
