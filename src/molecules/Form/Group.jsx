import React from 'react';
import { FormGroup as FormGroupRS, Label, FormText } from 'reactstrap';
import PropTypes from 'prop-types';

export const FormGroup = ({ id, label, title, errorMessage, helper, iconHelper: IconHelper, children, floatLabel = false, check = false, required }) => {
  const radioTitle = title ? <h2>{title}</h2> : null;
  const isHintLabel = label.includes('Hint');

  return (
    <FormGroupRS>
      { radioTitle }
      {helper ? <p className='helpertext'>{helper}</p> : ''}
      <Label for={id} check={check} className={`${floatLabel ? 'has-float-label' : ''} ${required ? 'required' : 'optional'}`}>
        {!isHintLabel && <span>{label} { IconHelper && <IconHelper /> }</span>}
        { children }
      </Label>
      <FormText>
        <span style={{ color: 'red' }}>{errorMessage}</span>
      </FormText>
    </FormGroupRS>
  );
};

FormGroup.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  title: PropTypes.string,
  helper: PropTypes.string,
  floatLabel: PropTypes.bool,
  check: PropTypes.bool,
  required: PropTypes.bool
};
