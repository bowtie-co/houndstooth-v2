import React from 'react';
import moment from 'moment';
import { AppIcon } from '../../atoms/App';
import { BowtieLogo } from '../../atoms';

export const AppFooter = ({ children, ...props }) => {
  // const { translate } = props;

  return (
    <section className='AppFooter footer-section'>
      <BowtieLogo />
      <div className='copyright'>Copyright Bowtie <AppIcon iconName='copyright' fill={false} />
        {moment().year()}
      </div>
    </section>
  );
};
