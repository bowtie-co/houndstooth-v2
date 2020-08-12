import React, { useState } from 'react';
import qs from 'qs';
import Select from 'react-select';

export const BranchSelect = (props) => {
  const { location, branch, branches, className = '', pageProps } = props;
  const { queryParams } = pageProps;

  const [ selected ] = useState(!!branch && branch);

  const handleSelect = (e) => {
    const newParams = Object.assign({}, queryParams, { ref: e.name });
    location.href = `${location.pathname}?${qs.stringify(newParams)}`;
  }

  return (
    <Select
      className={`NavSelect ${className}`}
      options={branches}
      getOptionLabel={option => option.name}
      getOptionValue={option => option.name}
      isOptionSelected={option => selected === option.id}
      placeholder={branch}
      onChange={handleSelect}
      autoFocus
    />
  );
};