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

  return JSON.stringify(completion.data.choices[0].text);
}

function hasApiKey() {
  return !!store.get('apiKey');
}

function saveApiKey(apiKey) {
  store.set('apiKey', apiKey);
  openai.configuration.apiKey = apiKey;
}

function getFilePath(app) {
  return store.get('filePath') || app.getPath("documents");
}

function saveFilePath(filePath) {
  store.set('filePath', filePath);
}

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

function saveWinSize(size) {
  store.set('winSize', size);
}

module.exports = {
  getSummary,
  hasApiKey,
  saveApiKey,
  getWinSize,
  saveWinSize,
  getFilePath,
  saveFilePath,
};