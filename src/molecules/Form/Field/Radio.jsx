import React from 'react';
import { Row, Col, Input, Label } from 'reactstrap';
import { FormGroup } from '../';
import { AppIcon } from '../../../atoms';

export const FormFieldRadio = ({ id, options, name, onChange, edited, className = '', ...rest }) => {
  if (rest.value === 'false') {
    rest.value = false;
  } else if (rest.value === 'true') {
    rest.value = true;
  }

  return (
    <FormGroup radio className={`${className} ${edited ? 'success-highlight' : ''}`} {...rest}>
      <Row>
        {options.map((option, i) => {
          return (<Col key={i}>
            <Label check for={id}>
              <Input
                id={id}
                value={option.value}
                type='radio'
                name={name}
                onChange={onChange}
                checked={rest.value === option.value}
              />
              {
                rest.value === option.value
                  ? <AppIcon iconName='dot-circle' size={'sm'} fill={false} />
                  : <AppIcon iconName='circle' size={'sm'} fill={false} />
              }
              <span>{option.label}</span>
            </Label>
          </Col>);
        }
        )}
      </Row>
    </FormGroup>
  );
};
