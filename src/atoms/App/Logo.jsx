import React from 'react';

export const AppLogo = ({ size = 'md', src, className }) => {
  const logoSize = {
    sm: 'logo-sm',
    md: 'logo-md',
    lg: 'logo-lg',
    xl: 'logo-xl'
  };

  return (
    <img src={src} className={`${logoSize[size]} ${className || ''}`} alt='logo' />
  );
};
