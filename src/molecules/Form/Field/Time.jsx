import React from 'react';
import { FormGroup } from '../';
import moment from 'moment';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

export const FormFieldTime = (props) => {
  const { value, onDateTimeChange, onChange, ...rest } = props;
  return (
    <FormGroup floatLabel {...rest}>
      <Datetime
        value={value || ''}
        inputProps={{ placeholder: rest['name'] }}
        timeFormat
        dateFormat={false}
        onChange={(event) => onChange({ target: { value: event && moment.isMoment(event) ? event.format('hh:mm A') : event } })}
        {...rest}
      />
    </FormGroup>
  );
};

FormFieldTime.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  onDateTimeChange: PropTypes.func
};
