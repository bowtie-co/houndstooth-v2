import React, { Fragment, useState, useCallback, useEffect } from 'react';
import { WithChildren, WithContent } from '.';
import {
  AppSidebar,
  AppNavbar,
  AppAlert,
  AppFooter
} from '../../organisms';
import { pubnub, storage } from '../../lib';

export const WithSidebar = ({ children, className, ...props }) => {
  const { branchRef } = props;
  const [ buildData, setBuildData ] = useState(branchRef ? storage.get(`build-${branchRef}`) : null);
  const [ isCollapsed, setIsCollapsed ] = useState(false);
  const toggleIsCollapsed = () => setIsCollapsed(!isCollapsed);

  const isBranchBuilding = useCallback(() => {
    if (buildData) {
      const { build_status } = buildData;
      return build_status && build_status === 'IN_PROGRESS';
    }

    return false;
  }, [ buildData ]);

  useEffect(() => {
    if (!pubnub) {
      console.debug('Skip effect, PubNub is not configured');
      return;
    }

    if (branchRef) {
      const listener = {
        status: (statusEvent) => {
          console.debug('PN Status', statusEvent);
        },
        message: (msg) => {
          const { channel, message } = msg;
          const { action, subject } = message;

          console.debug('PN MSG', { channel, action, subject });

          switch(channel) {
            case 'builds':
              // setBuilds(createOrUpdate(builds, subject));
              if (subject && subject.source_version === branchRef) {
                console.log('Build update for ref', branchRef, subject);
                storage.set(`build-${branchRef}`, subject);
                setBuildData(subject);
              } else {
                console.log('IGNORE: Msg not for ref', branchRef, subject);
              }
              break;
            case 'deploys':
              // setDeploys(createOrUpdate(deploys, subject));
              break;
            default:
              console.warn('Received message for unexpected channel:', channel);
              break;
          }
        }
      };

      pubnub.addListener(listener);

      pubnub.subscribe({
        channels: [ 'builds', 'deploys' ]
      });

      return () => {
        pubnub.removeListener(listener);
      };
    }

    return () => {
    };
  }, [ branchRef ]);

  return (
    <Fragment>
      <section className='app'>
        <AppNavbar {...props} {...{ isBranchBuilding }} />

        <section className={`WithSidebar content-wrapper ${className || ''}`}>
          <AppSidebar {...props} {...{ isCollapsed, toggleIsCollapsed }} />

          <WithContent {...props}>
            <AppAlert {...props} />
            <WithChildren children={children} {...props}  />
          </WithContent>
        </section>

        <AppFooter {...props} />
      </section>
    </Fragment>
  );
};
