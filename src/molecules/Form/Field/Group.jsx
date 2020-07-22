// import React, { useState, useEffect, useCallback } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import { FormFieldRecursive } from '.';

export const FormFieldGroup = (props) => {
  const { title, fields, handleChange, path = '', ...rest } = props;
  const fieldKeys = Object.keys(fields);

  return (
    <div className='field-group'>
      {title && <p className='bold'>{title}</p>}
      {fieldKeys.map(key => (
        <FormFieldRecursive
          key={key}
          name={key}
          field={fields[key]}
          handleChange={handleChange}
          path={path}
          {...rest}
        />
      ))}
    </div>
  );
};

FormFieldGroup.propTypes = {
  title: PropTypes.string,
  path: PropTypes.string,
  fields: PropTypes.object,
  handleChange: PropTypes.func
};
