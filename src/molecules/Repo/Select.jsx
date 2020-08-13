import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';

export const RepoSelect = (props) => {
  const { location, repo, repos, translate, className = '' } = props;

  const [ loading, setLoading ] = useState(true);
  const [ selected ] = useState(!!repo && repo.id);
  const [ defaultOptions ] = useState(repos.length ? repos.slice(0, 100) : []);
  const [ placeholder, setPlaceholder ] = useState(!!repo ? repo.full_name : translate('general.loading'));

  const search = (inputValue) => {
    return inputValue ?
      repos.filter(r =>r.full_name.toLowerCase().includes(inputValue.toLowerCase())).slice(0, 100)
      : defaultOptions;
  };

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(search(inputValue));
    }, 100);
  };

  const handleSelect = (e) => {
    location.href = `/${e.full_name}/collections`;
  }

  useEffect(() => {
    if (!repo) {
      setPlaceholder(!repos.length ? `${translate('general.loading')} ...` : translate('repos.select'));
    }
    setLoading(!repos.length);
  }, [repo, repos, translate]);

  return (
    <AsyncSelect
      className={`NavSelect ${className}`}
      loadOptions={loadOptions}
      defaultOptions={defaultOptions}
      getOptionLabel={option => option.full_name}
      getOptionValue={option => option}
      isOptionSelected={option => selected === option.id}
      placeholder={placeholder}
      isLoading={loading}
      isDisabled={loading}
      onChange={handleSelect}
      autoFocus
    />
  );
};