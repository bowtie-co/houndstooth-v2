import React from 'react';
import loading from './bowtie-loader.gif';
import '../../styles/Loading.css';

export const BowtieLoader = () => {
  return (
    <div className='loader'>
      <img src={loading} className='loaderimg' alt='loading' />
    </div>
  );
};
