import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import SketchPicker from 'react-color';
import { FormGroup } from '../';

export const FormFieldColor = ({ value, ...rest }) => {
  const [ open, setOpen ] = useState(false);
  const { onChange } = rest;

  const toggleOpen = () => {
    setOpen(!open);
  };

  const handleClose = (e) => {
    e.target.tagName !== 'INPUT' && setOpen(false);
  };

  const setValue = (colorVal) => {
    onChange({ target: { value: colorVal } });
  };

  const handleColorChange = (color) => {
    if (color.rgb.a !== 1) {
      setValue(`rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`);
    } else {
      if (value && value.includes('#')) {
        setValue(`#${color.hex}`);
      } else {
        setValue(`rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`);
      }
    }
  };

  return (
    <FormGroup {...rest}>
      <div className='inner-group'>

        <div>
          <div className='input-group'>
            <span className='input-group-addon' style={({ backgroundColor: value, width: '30px' })} />
            <Input value={value || ''} readOnly onClick={toggleOpen} {...rest}/>
          </div>

          <div style={({ display: open ? 'block' : 'none' })} onClick={handleClose}>
            <SketchPicker
              color={value || '#000'}
              display={open}
              type='chrome'
              position='below'
              onChangeComplete={handleColorChange}
              onClose={handleClose}
            />
          </div>
        </div>
      </div>
    </FormGroup>
  );
};

FormFieldColor.propTypes = {
  open: PropTypes.bool,
  toggleState: PropTypes.func,
  handleColorChange: PropTypes.func,
  handleClose: PropTypes.func,
  value: PropTypes.string
};
