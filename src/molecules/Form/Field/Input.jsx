import React from 'react';
import { Input } from 'reactstrap';
import { AppIcon } from '../../../atoms';
import { FormGroup } from '../';

export const FormFieldInput = (props) => {
  const { id, label, value, edited, className = '', cleanObjectsFromDom, clearable, ...rest } = props;
  const { onChange } = rest;
  // TODO: Is a helper like "cleanObjectsFromDom" useful? Should we copy or recreate?
  // const sanitizedProps = cleanObjectsFromDom(rest);

  return (
    <FormGroup className={`${className} ${edited ? 'success-highlight' : ''}`} {...props}>
      <div className='flex'>
        <Input value={value || ''} {...rest} />
        {clearable && value !== null && (
          <span className='flex center' style={{ border: '1px solid #c2c2c2', borderLeft: 'none' }}>
            <AppIcon iconName='times' onClick={() => onChange({ target: { value: null } })} />
          </span>
        )}
      </div>
    </FormGroup>
  );
};
