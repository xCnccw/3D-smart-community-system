import request from './OpenAirequest.js'

export const getAianswer = (params) => {
    console.log(params, "AI回答");
    return request.post('/v1/completions', params)
}