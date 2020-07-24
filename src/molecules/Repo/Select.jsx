import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'hookrouter';
import AsyncSelect from 'react-select/async';

export const RepoSelect = (props) => {
  const { repo, repos, translate, className = '' } = props;

  // const repoOptions = Array.isArray(repos) ? repos.map(repo => ({ value: repo, label: repo.full_name })) : [];

  const [ selected, setSelected ] = useState(!!repo && repo.id);
  const [ placeholder, setPlaceholder ] = useState(!!repo ? repo.full_name : translate('general.loading'));

  const handleSelect = (e) => {
    setSelected(e.id);
    navigate(`/${e.full_name}/collections?ref=${e.default_branch || 'master'}`);
  }

  const customFilter = (option, text) => {
    console.log(option, text)
    if (!!text) {
      debugger;
      // option.full_name.toLowerCase().includes(text.toLowerCase());
    } else {
      return true;
    }
  }

  useEffect(() => {
    if (!repo) {
      setPlaceholder(!repos ? `${translate('general.loading')} ...` : translate('repos.select'));
    }
  }, [repos])

  return (
    <AsyncSelect
      className={`RepoSelect ${className}`}
      // TODO: @Brennan - replace with loadOptions promise function
      defaultOptions={repos}
      getOptionLabel={option => option.full_name}
      getOptionValue={option => option}
      isOptionSelected={option => selected === option.id}
      placeholder={placeholder}
      isSearchable
      // filterOption={customFilter}
      onChange={handleSelect}
      autoFocus
    />
    // <FieldContainer
    //   // async
    //   className='repo-select'
    //   clearable={false}
    //   name='select-repo'
    //   type={'select'}
    //   placeholder={!repos ? 'Loading ...' : 'Select Repo'}
    //   value={`${baseRoute}`}
    //   valueKey={'full_name'}
    //   labelKey='full_name'
    //   disabled={!repos}
    //   options={asyncRepoList}
    //   onChange={(e) => {
    //     history.push({ pathname: `/${e.target.value}/collections`, search: `?ref=${e.target.default_branch || 'master'}` });
    //   }}
    // />
  );
};

RepoSelect.propTypes = {
  stagedFiles: PropTypes.array,
  repo: PropTypes.object,
  message: PropTypes.string,
  setMessage: PropTypes.func,
  pushToGithub: PropTypes.func
};