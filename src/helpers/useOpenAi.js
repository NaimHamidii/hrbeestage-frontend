import { OpenAI } from 'openai';
const key = "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";

const configuration = {
    apiKey: key,
    dangerouslyAllowBrowser: true
}

const openai = new OpenAI(configuration);

export default openai;