# Build-Validation

This repository contains the code that validates code after the experiments are build.

## Plugin Information

1. This repository is acting like a plugin for the repository ph3-lab-mgmt.
2. It is integrated with the build process for that you could check the `validation-plugin-Aditya` branch.
3. For integrating this plugin a new pluginscope by the name `POSTBUILD` is created as well a new plugin function `processPostBuildPlugins` in plugin.js has been created.
4. The below function is called after experiment builds in experiment.js.
5. The information of this plugin is in file `plugin-config.testing.js`

## [link_validation.js](https://github.com/virtual-labs/build-validation/blob/main/link_validation.js)

This file has 2 functions:
1. `findFiles` : This function recursively finds all the html files in the directory. Since this repository is a plugin for the main repository the path to directory is hard-coded as `let testFolder = '../../../build/';`. 

2. `checkLinks`: This function checks if the links in the html files contains only valid links, i.e. the link must start with `https:` not with `http:`. For this purpose JSDOM is used.

## How to Run it on a Local Machine - For Developers 

1. For running this you must have a node.js and npm installed on your local machine.
2. Preferred version of node.js is 16.14.2 and npm is 8.5.0.
3. Run the following command:
```
npm install
node node link_validation.js
```

# Eslint configuration

The repository [ph3-lab-mgmt](https://github.com/virtual-labs/ph3-lab-mgmt) has an eslint configuration file [.eslintrc.js](https://github.com/virtual-labs/ph3-lab-mgmt/blob/master/.eslintrc.js). Click here for eslint documentation: [eslint.org](https://eslint.org/docs/latest/user-guide/configuring/).

Eslint is configured with the eslint recommended, with plugin as only warning. The warnings can be changed to error by adding it in the rules section of eslintrc.js. 

## How to Run it on a Local Machine - For Developers 

The command to run eslint is `npx eslint -c ./.eslintrc.js ../experiment` which is also added in the [package.json](https://github.com/virtual-labs/ph3-lab-mgmt/blob/master/package.json).

## Fixing Issues using ESLINT
Add the relevant issue is the .eslintrc.js file and run `npx eslint -c ./.eslintrc.js ../experiment --fix`. 
For example:
```
"rules": {
    "semi": [2, "always"]
},
```
Then run the command `npx eslint -c ./.eslintrc.js ../experiment --fix` it will add semi-colon at end of those line where semi-colon is not present.
