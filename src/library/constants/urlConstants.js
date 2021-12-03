export const getBaseUrl = (env = 'LOCAL') => {
  switch (env) {
    case 'LOCAL':
      return 'http://localhost:8000/api/v1/';
    // return 'https://incedo-guide.herokuapp.com/api/v1/';
    default:
      return 'http://localhost:8000/api/v1/';
  }
};
