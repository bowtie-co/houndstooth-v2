import React, { useState } from 'react';
import { navigate } from 'hookrouter';
import Select from 'react-select';

export const BranchSelect = (props) => {
  const { location, branch, branches, className = '' } = props;

  const [ selected, setSelected ] = useState(!!branch && branch);

  const handleSelect = (e) => {
    setSelected(e.name);
    navigate(`${location.pathname}?ref=${e.name}`);
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