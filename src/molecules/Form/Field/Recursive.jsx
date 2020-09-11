import React from 'react';
import PropTypes from 'prop-types';
import { titleize } from '@bowtie/utils';
// import * as Fields from '../Field';
import { FormFieldGroup, FormFieldDynamic } from '../Field';

export const FormFieldRecursive = (props) => {
  const { name, field, fixedOptions, handleChange, path = '', ...rest } = props;
  const currentPath = path === '' ? name : `${path}.${name}`;

  const parseOptions = (options) => {
    return options.map(i => ({ value: i, label: i }));
  };

  if (field && field instanceof Object && !Array.isArray(field)) {
    return (
      <FormFieldGroup
        title={titleize(name, '_')}
        fields={field}
        path={currentPath}
        handleChange={handleChange}
        {...rest}
      />
    );
  } else if (Array.isArray(field) && field.length > 0 && field[0] instanceof Object) {
    return (
      <div className='field-group'>
        {titleize(name, '_')}
        {
          field.map((obj, i) => {
            return (
              <FormFieldGroup
                key={i}
                title={`#${i + 1}`}
                fields={obj}
                path={`${currentPath}.${i}`}
                handleChange={handleChange}
                {...rest}
              />
            );
          })
        }
      </div>
    );
  } else {
    if (Array.isArray(field) && (field.length === 0 || typeof field[0] === 'string')) {
      const hasFixedOptions = fixedOptions && fixedOptions[name] && Array.isArray(fixedOptions[name]);
      rest['creatable'] = !hasFixedOptions;
      rest['options'] = hasFixedOptions ? parseOptions(fixedOptions[name]) : parseOptions(field);
    }
    return (
      <FormFieldDynamic
        clearable
        key={name}
        name={name}
        label={titleize(name, '_')}
        placeholder={field !== '' && name}
        value={field}
        onChange={(e) => handleChange(currentPath, e.target.value)}
        {...rest}
      />
    );
  }
};

FormFieldRecursive.propTypes = {
  name: PropTypes.string,
  path: PropTypes.string,
  fields: PropTypes.object,
  handleChange: PropTypes.func
};
