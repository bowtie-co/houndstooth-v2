import React from 'react';
import PropTypes from 'prop-types';

export const AppSummary = ({ content, children }) => {
  return (
    <div className='summary'>{ content || children }</div>
  );
};

AppSummary.propTypes = {
  content: PropTypes.string
};