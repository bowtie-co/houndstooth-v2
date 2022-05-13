import React from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { FormGroup } from '../';

export const FormFieldSelect = (props) => {
  // console.debug('FormFieldSelect', { props });

  const { id, col, options, async, name, onChange, value, list, className = '', edited, ...rest } = props;
  const { valueKey, labelKey } = rest;

  // TODO: Fix/enable actual async/promise options & props
  const promiseOptions = (inputValue) => new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          label: 'stuff',
          value: 'things'
        },
        {
          label: 'more',
          stuff: 'yes'
        }
      ]);
    }, 1000);
  });

  let defaultValue;
  // options = list ? selectLists[list] : options;

  if (options && Array.isArray(options) && options.length > 0 && typeof options[0] !== 'object') {
    defaultValue = options.reduce((arr, option) => {
      const value = typeof option === 'object' ? option[valueKey] : option;
      const text = typeof option === 'object' ? option[labelKey] : option;

      return [...arr, { label: text, value }];
    }, []);
  }

  if (async) {
    return (
      <FormGroup id={id} className={`${className} ${edited ? 'success-highlight' : ''}`} {...rest}>
        <AsyncSelect
          defaultValue={defaultValue}
          loadOptions={promiseOptions}
        />
      </FormGroup>
    );
  }

  return (
    <FormGroup id={id} className={`${className} ${edited ? 'success-highlight' : ''}`} {...rest}>
      <Select onChange={onChange} options={options} defaultValue={defaultValue} />
    </FormGroup>
  );
};
