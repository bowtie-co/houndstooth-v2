import React, { useEffect } from 'react';
import { WithChildren } from '../';
import { pubnub } from '../../lib';
// import { createOrUpdate } from '../../lib/helpers';

export const WithServicePubnub = ({ children, ...props }) => {
  const { serviceName } = props;

  useEffect(() => {
    if (!pubnub) {
      console.debug('Skip effect, PubNub is not configured');
      return;
    }

    const listener = {
      status: (statusEvent) => {
        console.debug('PN Status', statusEvent);
      },
      message: (msg) => {
        const { channel, message } = msg;
        const { action, subject } = message;

        console.debug('PN MSG', { channel, action, subject });

        if (message.service !== serviceName) {
          console.debug('Ignoring message', message);
          return;
        }
      }
    };

    pubnub.addListener(listener);

    return () => {
      pubnub.removeListener(listener);
    };
  }, [ serviceName ]);

  return (
    <WithChildren children={children} {...props} />
  );
};
