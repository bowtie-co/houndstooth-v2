import React from 'react';
import { AppLink, AppIcon } from '..';

const AppSocialLink = ({ socialMedia, href }) => {
  return (
    <AppLink className='social-link' href={href}>
      <AppIcon className={`fab fa-${socialMedia}`} />
    </AppLink>
  );
};

export default AppSocialLink;
