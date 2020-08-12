import React, { useState } from 'react';
import Select from 'react-select';

export const BranchSelect = (props) => {
  const { location, branch, branches, className = '', linkWithQueryParams } = props;

  const [ selected ] = useState(!!branch && branch);

  const handleSelect = (e) => {
    location.href = linkWithQueryParams(location.pathname, { ref: e.name });
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