const { Configuration, OpenAIApi } = require('openai');
const Store = require('electron-store');

const store = new Store();

const configuration = new Configuration({
  apiKey: store.get('apiKey'),
});

const openai = new OpenAIApi(configuration);

/**
 * Get a summary from OpenAI API
 * Set the maximum number of tokens with a 10% margin to avoid API error
 * 
 * @param { string } url 
 * @param { boolean } withCode 
 * @returns 
 */
async function getSummary(url, withCode) {
  // Prompt model with the URL
  let prompt = `Summarize this article : ${url}. The output must be in markdown format and use Obsidian convention. Add a link on a new line. Add tags including a draft tag.`;

  if (withCode) {
    prompt += ` Add a detailed code example.`;
  }

  // TODO : Get the max_tokens from user or store

  // Set the maximum number of tokens with a 10% margin to avoid API error
  let max_tokens = 4000 - Math.ceil(prompt.split(" ").length * 1.1);

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: max_tokens,
    temperature: 0.1,
    top_p: 1,
    frequency_penalty: 0.2,
    presence_penalty: 0.2,
    echo: false,
  });

  const rawText = completion.data.choices[0].text;
  const trimText = rawText.replace(/^\n/, "");
  const fileName = getFileName(trimText);

  return { fileName, text: JSON.stringify(trimText) };
}

/**
 * Get a file name from the API response by extracting the main title
 * If there is no main title, name it "draft-gepeto" with the current datetime
 * 
 * @param { string } text 
 * @returns { string } The file name
 */
function getFileName(text) {
  // Split the summary into lines
  const summaryLines = text.split("\n");
  // Set the file name to the main title
  let fileName;
  const mainTitle = summaryLines.find(line => line.startsWith("# "));
  if (mainTitle) {
    // Remove the "#" and replace spaces and special characters with "-"
    fileName = mainTitle.replace("# ", "").replace(/ /g, " ").replace(/[^a-zA-Z0-9-]/g, " ");
  } else {
    // If there is no main title, name it "draft-gepeto" with the current datetime
    const date = new Date();
    fileName = `draft-gepeto-${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
  }
  return fileName;
}

/**
 * @returns { boolean } True if the API key is set
 */
function hasApiKey() {
  return !!store.get('apiKey');
}

/**
 * Save the API key to the store
 */
function saveApiKey(apiKey) {
  store.set('apiKey', apiKey);
  openai.configuration.apiKey = apiKey;
}

/**
 * Get the folder path from the store
 * or the default documents folder
 * 
 * @param {*} app 
 * @returns 
 */
function getFolderPath(app) {
  return store.get('folderPath') || app.getPath("documents");
}

/**
 * Save the folder path to the store
 * 
 * @param { string } folderPath 
 */
function saveFolderPath(folderPath) {
  store.set('folderPath', folderPath);
}

/**
 * Get the window size from the store
 * or the default size (900, 600)
 * 
 * @returns { number[] } The window size
 */
function getWinSize() {
  const defaultSize = [900, 600];
  const size = store.get('winSize');
  if (size) {
    return size;
  } else {
    store.set('winSize', defaultSize);
    return defaultSize;
  }
}

/**
 * Save the window size to the store
 * 
 * @param { number[] } size 
 */
function saveWinSize(size) {
  store.set('winSize', size);
}

module.exports = {
  getSummary,
  hasApiKey,
  saveApiKey,
  getWinSize,
  saveWinSize,
  getFolderPath,
  saveFolderPath,
};