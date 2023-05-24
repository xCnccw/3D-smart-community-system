import axios from "axios";

const apiKey = "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";

const instance = axios.create({
  baseURL: "https://api.openai.com",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
});

export default instance;
