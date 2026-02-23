let testFolder = process.argv[2];
const fs = require('fs');
// const got = require('got');
const { JSDOM } = require("jsdom");
const filename = testFolder + 'links.log';

function appendToFile(filename,data)
{
  fs.appendFile(filename, data, function (err) {
    if (err) throw err;
  });
}

function main() {
  findFiles(testFolder);
}

main();

function checkLinks(file) {
  const html = fs.readFileSync(file);
  const dom = new JSDOM(html);
  const { document } = dom.window;
  const shortenedFile = file.replace(testFolder, '');

  const links = document.querySelectorAll('a');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href !== null) {
      if (href.startsWith('http://')) {
        appendToFile(filename, shortenedFile + '     ' + href + '\n');
      }
    }
  });
}

function findFiles(folder) {
  fs.readdir(folder, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.log(err);
    }
    files.forEach(file => {
      if (file.isDirectory()) {
        findFiles(folder + file.name + "/");
      } else {
        if (file.name.endsWith('.html')) {
          checkLinks(folder + file.name);
        }
      }
    });
  });
}