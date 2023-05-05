import getAPIClient from './GuestClient';

export const getRequest = (url, callback) => {
  getAPIClient()
    .get(url)
    .then(response => {
      console.log('response ---->>>', response);
      callback(response.data);
    })
    .catch(error => {
      console.log('error -->>', error);
      handleError(error);
      callback(error?.response?.data);
    });
};

const handleError = error => {
  console.log('handleError', error);
};

module.exports = {
  getRequest,
};
