<div align="center">
  <img src="src/assets/gepeto-home-screen.png" alt="Gepeto" />
</div>

## Description

Gepeto uses GPT-3 (text-davinci-003 algorithm) from OpenAI to generate notes from a given article.

Gepeto was built with Electron and Angular as a personal mini-project.

## Features

- Summarize an article with a simple link
- Preview the result in a pre-processed markdown format
- Export the result as a .md file
- Open the .md file with the default system application
- Configure your OpenAI API key and export location

## Advisory note

The text returned by GPT-3 may differ significantly from one try to another for the same article.

You can try to generate a new note with the same article to get a different result, or try to adjust the prompt and options given in the api.js file.

## Installation

### Prerequisites

- Node.js
- NPM
- Angular CLI

### Install dependencies

```bash
npm install
```

### Run

```bash
npm start
```

This will build the Angular app and start Electron all at once.

You can run only the Angular front part with the CLI command: `ng serve`.

## Development

Uncomment the following line in app.js to enable the dev tools:

```javascript
// win.webContents.openDevTools();
```

## Build a distributable package for Windows

### Prerequisites

- Electron Builder

You need to install Electron Builder in order to build the distributable package.

See [Electron Builder](https://www.electron.build/) for more information.

### Build

```bash
npm run dist
```

This will create a NSIS Windows installer in the build folder.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Improvements to be made

- Code architecture especially on the Electron side
- Typescript on the backend
- Error handling
- Add more configuration to the build process
- Add more options to the configuration
- Add more options for the note generation
- Add a dark mode
- Design improvements
