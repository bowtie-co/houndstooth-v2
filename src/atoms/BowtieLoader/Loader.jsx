import React from 'react';
import loading from './bowtie-loader.gif';
import '../../styles/Loading.scss';

export const BowtieLoader = ({nonBlocking = false, ...props}) => {
  const className = nonBlocking ? 'loader-non-blocking' : '';

  return (
    <div className={`loader ${className}`}>
      <img src={loading} className='loaderimg' alt='loading' />
    </div>
  );
};
