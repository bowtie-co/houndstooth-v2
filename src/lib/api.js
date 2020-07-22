import Api from '@bowtie/api';
import { navigate } from 'hookrouter';
import { auth } from './auth';

const {
  REACT_APP_API_ROOT = 'http://localhost:4000',
  REACT_APP_API_STAGE = 'dev',
  REACT_APP_API_PREFIX = 'api',
  REACT_APP_API_VERSION = 'v1',
} = process.env;

const api = new Api({
  root: REACT_APP_API_ROOT,
  stage: REACT_APP_API_STAGE,
  prefix: REACT_APP_API_PREFIX,
  version: REACT_APP_API_VERSION,
  secureOnly: false,
  authorization: 'Bearer'
});

api.authorize({
  token: () => auth.token
});

api.on('401', (resp) => {
  console.warn('401 - Unauthorized. Logout and login to renew session token(s).', resp);
  auth.logout();
  navigate('/');
});

export { api };
