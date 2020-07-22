import React from 'react';
import logoBlack from './houndstooth_logo.png';
import logoWhite from './houndstooth_logo_white.png';
import { AppLogo } from '../';

export const HoundstoothLogo = ({ color = 'black', ...rest }) => {
  return (
    <AppLogo src={color === 'white' ? logoWhite : logoBlack} {...rest} />
  );
};
