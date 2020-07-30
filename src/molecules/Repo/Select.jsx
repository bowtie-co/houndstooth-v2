import React, { useEffect, useState } from 'react';
import { navigate } from 'hookrouter';
import Select from 'react-select';

export const RepoSelect = (props) => {
  const { repo, repos, translate, className = '' } = props;

  const [ loading, setLoading ] = useState(true);
  const [ selected, setSelected ] = useState(!!repo && repo.id);
  const [ placeholder, setPlaceholder ] = useState(!!repo ? repo.full_name : translate('general.loading'));

  const handleSelect = (e) => {
    setSelected(e.id);
    navigate(`/${e.full_name}/collections?ref=${e.default_branch || 'master'}`);
  }

  useEffect(() => {
    if (!repo) {
      setPlaceholder(!repos.length ? `${translate('general.loading')} ...` : translate('repos.select'));
    }
    setLoading(!repos.length);
  }, [repo, repos, translate])

  return (
    <Select
      className={`RepoSelect ${className}`}
      options={repos}
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