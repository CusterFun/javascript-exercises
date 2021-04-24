const axios = require('axios');
const projectConfig = require('../util/projectConfigResolver');

const hostBaseUrl = projectConfig.hostBaseUrl;

exports.doHttpGetRequest = function (ctx, requestUrl, params) {
  return this.doHttpRequest(ctx, requestUrl, params, 'GET');
}

exports.doHttpPutRequest = function (ctx, requestUrl, params) {
  return this.doHttpRequest(ctx, requestUrl, params, 'PUT');
}

exports.doHttpPostRequest = function (ctx, requestUrl, params) {
  return this.doHttpRequest(ctx, requestUrl, params, 'POST');
}

exports.doHttpDeleteRequest = function (ctx, requestUrl, params) {
  return this.doHttpRequest(ctx, requestUrl, params, 'DELETE');
}

exports.doHttpRequest = function (ctx, requestUrl, params, method) {
  if ('GET' === method) {
    return axios({
      baseURL: hostBaseUrl,
      url: requestUrl,
      method: 'GET',
      params: params
    });
  } else if ('PUT' === method || 'POST' === method || 'DELETE' === method) {
    return axios({
      baseURL: hostBaseUrl,
      url: requestUrl,
      method: method,
      data: params
    });
  }
};


