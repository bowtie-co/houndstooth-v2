import React from 'react';

export const AppTitle = ({ children, className = '' }) => {
  return (
    <h1 className={`title break-word ${className}`}>{ children }</h1>
  );
};
