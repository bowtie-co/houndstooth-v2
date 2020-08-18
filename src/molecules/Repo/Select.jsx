import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import { storage } from '../../lib';

export const RepoSelect = (props) => {
  const { location, repo, translate, className = '' } = props;

  // console.debug('RepoSelect', { location, repo });

  const [ repos, setRepos ] = useState(storage.get('repos') || []);
  const [ loading, setLoading ] = useState(true);
  const [ reposCached, setReposCached ] = useState(storage.get('reposCached') || false);
  const [ selected ] = useState(!!repo && repo.id);
  const [ defaultOptions, setDefaultOptions ] = useState([]);
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
  };

  useEffect(() => {
    const updateRepos = (savedRepos) => setRepos(savedRepos);
    const removeRepos = () => setRepos([]);
    const updateCached = (reposCached) => setReposCached(!!reposCached);
    const removeCached = () => setReposCached(false);

    storage.on('repos_changed', updateRepos);
    storage.on('repos_removed', removeRepos);
    storage.on('reposCached_changed', updateCached);
    storage.on('reposCached_removed', removeCached);

    return () => {
      storage.off('repos_changed', updateRepos);
      storage.off('repos_removed', removeRepos);
      storage.off('reposCached_updated', updateCached);
      storage.off('reposCached_removed', removeCached);
    };
  }, [ setRepos, setLoading ]);

  useEffect(() => {
    setDefaultOptions(repos.length ? repos.slice(0, 100) : []);
  }, [ repos ]);

  useEffect(() => {
    if (!repo) {
      setPlaceholder(!repos.length ? `${translate('general.loading')} ...` : translate('repos.select'));
    }
    setLoading(!repos.length);
  }, [ repo, repos, translate ]);

  return (
    <AsyncSelect
      className={`NavSelect ${className}`}
      loadOptions={loadOptions}
      defaultOptions={defaultOptions}
      getOptionLabel={option => option.full_name}
      getOptionValue={option => option}
      isOptionSelected={option => selected === option.id}
      placeholder={placeholder}
      isLoading={!reposCached}
      isDisabled={loading}
      onChange={handleSelect}
      autoFocus
    />
  );
};