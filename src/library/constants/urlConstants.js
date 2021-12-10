export const getBaseUrl = (env) => {
  switch (env) {
    case 'LOCAL':
      return 'http://localhost:8000/api/v1/';
    case 'AWS':
      return 'https://incedo-guide.herokuapp.com/api/v1/';
    default:
      return 'https://incedo-guide.herokuapp.com/api/v1/';
  }
};
