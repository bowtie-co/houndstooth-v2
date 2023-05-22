import { Notifier } from '@airbrake/browser';

const {
  REACT_APP_ENV,
  REACT_APP_PROFILE,
  REACT_APP_VERSION,
  REACT_APP_AIRBRAKE_ID,
  REACT_APP_AIRBRAKE_KEY
} = process.env;

let airbrake = null;
if(REACT_APP_AIRBRAKE_ID && REACT_APP_AIRBRAKE_KEY) {
  airbrake = new Notifier({
    projectId: REACT_APP_AIRBRAKE_ID,
    projectKey: REACT_APP_AIRBRAKE_KEY
  });
  
  const determineEnv = () => {
    return 'development';
  };
  
  airbrake.addFilter((notice) => {
    if (notice) {
      notice.context.profile = REACT_APP_PROFILE;
      notice.context.version = REACT_APP_VERSION || '0';
      notice.context.environment = REACT_APP_ENV || determineEnv();
      
      if (notice.context.environment === 'development') {
        notice.context.severity = 'warn';
      }
    }
    
    return notice;
  });
}

export { airbrake };
