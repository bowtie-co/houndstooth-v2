import React from 'react';
import { FormGroup } from '../';
import { AppIcon } from '../../../atoms';

export const FormFieldHint = (props) => {
  const { value, edited, className = '' } = props;
  let hintValue = value;

  if (!value || value.trim() === '') {
    hintValue = 'Add a hint value in your files front matter';
  }

  return (
    <FormGroup className={`${className} ${edited ? 'success-highlight' : ''}`} {...props}>
      <div className='flex'>
        <pre>
          <AppIcon className='far fa-lightbulb' />
          {hintValue}
        </pre>
      </div>
    </FormGroup>
  );
};
