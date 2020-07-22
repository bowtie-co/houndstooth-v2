import React from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import CreatableSelect from 'react-select/creatable';
import { FormGroup } from '../';

export const FormFieldSelectMulti = (props) => {
  console.log('FormFieldSelectMulti', { props });

  const { id, name, async, onChange, creatable, options, optionsFrom, className = '', edited, value = [], ...rest } = props;

  // TODO: Enable async options
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

  if (value && Array.isArray(value) && value.length > 0 && typeof value[0] !== 'object') {
    defaultValue = optionsFrom(value);
  }

  const selectProps = {
    options: options || defaultValue,
    defaultValue,
    onChange: (val) => {
      console.log('SelectMulti.onChange()', val);
      onChange({ target: { name, value: val ? val.map(v => v.value) : [] }});
    }
  };

  if (async) {
    return (
      <FormGroup id={id} className={`${className} ${edited ? 'success-highlight' : ''}`} {...rest}>
        <AsyncSelect
          loadOptions={promiseOptions}
          {...selectProps}
        />
      </FormGroup>
    );
  } else if (creatable) {
    return (
      <FormGroup id={id} className={`${className} ${edited ? 'success-highlight' : ''}`} {...rest}>
        <CreatableSelect
          isMulti
          {...selectProps}
        />
      </FormGroup>
    );
  }

  return (
    <FormGroup id={id} className={`${className} ${edited ? 'success-highlight' : ''}`} {...rest}>
      <Select
        isMulti
        {...selectProps}
      />
    </FormGroup>
  );
};
