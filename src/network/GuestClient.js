import {ApiConfig} from './ApiConfig';
import axios from 'axios';

const client = axios.create({
  baseURL: ApiConfig.baseUrl,
  timeout: 60000,
  headers: {
    Accept: 'application/json',
  },
});

const getAPIClient = () => {
  return client;
};

function getUrl(config) {
  if (config.baseURL) {
    return config.url.replace(config.baseURL, '');
  }
  return config.url;
}

// Intercept all requests
client.interceptors.request.use(
  config => {
    logRequest(config);
    return config;
  },
  error => Promise.reject(error),
);

// Intercept all responses
client.interceptors.response.use(
  async response => {
    logResponse(response);
    return response;
  },
  error => {
    logError(error);
    return Promise.reject(error);
  },
);

const logRequest = request => {
  console.log(
    `%c#REQUEST ${request.method.toUpperCase()} - ${getUrl(request)}:`,
    'color: #0086b3; font-weight: bold',
    request,
  );
};

const logResponse = response => {
  console.log(
    `%c#RESPONSE ${response.status} - ${getUrl(response.config)}:`,
    'color: #74d463; font-weight: bold',
    response,
  );
};

const logError = error => {
  console.log(
    `%c#ERROR ${error.response.status} - ${getUrl(error.response.config)}:`,
    'color: #f44336; font-weight: bold',
    error.response,
  );
};

export default getAPIClient;
