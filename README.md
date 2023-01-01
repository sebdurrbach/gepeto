# Gepeto

**_A smart lazy note-taking assitant_**

## Description

Gepeto uses GPT-3 (text-davinci-003 algorithm) from OpenAI to summarize articles with a simple link.

You can then preview the result in a pre-processed markdown format, export it as a .md file and open it with the default system application.

Gepeto was built with Electron and Angular.

## Configuration

### API Key

You must provide an API key first in order to process a summary.

If you don't have one, Gepeto will take you to the right place, otherwise you can get one from [OpenAI](https://openai.com/).

### Default location

You can provide a default location to export your files, otherwise Gepeto will export your files in your Documents folder.

Configuration are store in a config.json file inside the User Data using electron-store.

On Windows, the User Data folder is located in the AppData/Roaming folder.

## Installation

### Prerequisites

- Node.js
- NPM
- Angular CLI

### Install

```bash
npm install
```

### Development

Uncomment the following line in app.js to enable the dev tools:

```javascript
// win.webContents.openDevTools();
```

### Run

```bash
npm start
```

This will build the Angular app and start Electron all at once.

You can run only the Angular front part with the CLI command: `ng serve`.

## Build a distributable package for Windows

### Prerequisites

- Electron Builder

See [Electron Builder](https://www.electron.build/) for more information.

### Build

```bash
npm run dist
```

This will create a NSIS Windows installer in the build folder.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Improvements to be made

- Code architecture both on the Angular and Electron side
- Typescript on the backend
- Error handling
- Add more options to the configuration
- Add more options for the note generation
- Add a dark mode
- Design improvements
