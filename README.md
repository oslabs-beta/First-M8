<!-- <img src="../First-M8/build/5bf60e15d76211f7b0d6.png"> -->
<img src="./client/assets/first-m8-logo.png">

![license](https://img.shields.io/github/license/oslabs-beta/First-M8?color=%2357d3af) ![version](https://img.shields.io/badge/version-Alpha1.0-orange) ![lastcommit](https://img.shields.io/github/last-commit/oslabs-beta/First-M8?color=%2357d3af) ![gitcontribute](https://img.shields.io/github/contributors/oslabs-beta/First-M8) ![gitstars​](https://img.shields.io/github/stars/oslabs-beta/First-M8?style=social) ![gitforks](https://img.shields.io/github/forks/oslabs-beta/First-M8?style=social)

## Table of Contents
- <a href="#about">About</a>
- <a href="#getting-started">Getting Started</a>
- <a href="#example">Quick-Start</a>
- <a href="#contributors">Contributors</a>
- <a href="#looking-ahead">Looking Ahead</a>
- <a href="#license">License</a>

## About <a id="about"></a>

First M8 is an Electron-based application built to make querying Prometheus instances much more accessable and approachable to those new to Dev Ops or seasoned veterans who want a more intuitive interface when monitoring and scraping data.

• Drag-and-drop feature eliminates the chance of typing mistakes and greatly streamlines the process of writing complex queries.

• Users can visualize data that means the most to them in a way that is easy to digest without having to have prior knowledge of PromQL.

• One-stop-shop application monitoring remains, but users gain the ability to more easily track and separate their queries by different applications and Prometheus instances.

## Getting Started <a id="getting-started"></a>

First M8 can be set up by bundling the electron app and running it as a native desktop App. The instructions are as follows:

1. Make sure you're on the main branch

2. Go to your terminal and type the following:

```
npm install
npm run build
npm start

```
In your FIRST-M8 folder, navigate to the release-builds folder and double-click on FirstM8.app/exe (executable).

## Quick-Start <a id="example"></a>

When you have opened the First M8 application:

1. Select _"Settings"_.

2. Input _Name, IP, and Port_ for your Prometheus instance.

3. Select the created setting from the _pull-down menu_.

4. Click _'Create a Dashboard'_, name it and select the draggable metrics you want to monitor.

5. Once you've selected your metrics and are satisfied with the query, click _"Save"_.

## Contributors <a id="contributors"></a>

[Jung Ho (Alex) Lee](https://www.linkedin.com/in/jungholee27/) [@jungholee27](https://github.com/jungholee27)

[Derek Chen](https://www.linkedin.com/in/derek-junhao-chen/) [@derekchen](https://github.com/poofywater)

[Nisa Lintakoon](https://www.linkedin.com/in/nisalintakoon/) [@nisalintakoon](https://github.com/nisalintakoon)

[Kevin MacCoy](https://www.linkedin.com/in/kevin-maccoy/) [@kevinmaccoy](https://github.com/kmaccoy)

## Looking Ahead <a id="looking-ahead"></a>

First M8 is currently in Alpha stage. Some features we look to implement in the future are:
- Downloadable dashboard views and query history.
- Connecting to Grafana viewer.
- Handle more advanced Prometheus queries.
- Add a space to track error logs and highlight trends that may need to be addressed.
- There is currently no Mac installer. Coming soon!

## License <a id="license"></a>

This product is licensed under the MIT License -- see [LICENSE.md](https://github.com/oslabs-beta/First-M8/blob/main/LICENSE) file for more details.

This product is accelerated by [OS Labs](https://opensourcelabs.io/).
