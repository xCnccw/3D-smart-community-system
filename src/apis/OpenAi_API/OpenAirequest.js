import axios from 'axios';

const apiKey = "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"

const instance = axios.create({
    baseURL: 'https://api.openai.com',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    }
});

export default instance;
