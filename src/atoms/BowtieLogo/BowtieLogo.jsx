import React from 'react';
import { AppLogo } from '../';
import logoWhite from './bowtie_logo_white.png';
import logoBlack from './bowtie_logo.png';

export const BowtieLogo = ({ color = 'white', ...rest }) => {
  return (
    <AppLogo src={color === 'white' ? logoWhite : logoBlack} {...rest} />
  );
};
