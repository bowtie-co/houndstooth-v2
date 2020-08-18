import React from 'react';
import * as Fields from '../Field';

export const FormFieldDynamic = (props) => {
  const optionsFrom = (list) => Array.isArray(list) ? list.map(item => ({ value: item, label: item })) : [];

  const fieldComponentMap = {
    file: 'FormFieldUpload',
    upload: 'FormFieldUpload',
    img: 'FormFieldUpload',
    image: 'FormFieldUpload',
    color: 'FormFieldColor',
    colorpicker: 'FormFieldColor',
    check: 'FormFieldCheckbox',
    checkbox: 'FormFieldCheckbox',
    radio: 'FormFieldRadio',
    select: 'FormFieldSelect',
    multi: 'FormFieldSelectMulti',
    multiselect: 'FormFieldSelectMulti',
    tel: 'FormFieldPhone',
    phone: 'FormFieldPhone',
    date: 'FormFieldDate',
    time: 'FormFieldTime',
    datetime: 'FormFieldDateTime',
    text: 'FormFieldTextArea',
    textarea: 'FormFieldTextArea',
    input: 'FormFieldInput',
  };

  const nameMatchers = {
    upload: /_(path)$/,
    image: /_(img|image)$/,
    color: /_(color)$/,
    // radio: /_?(radio)$/,
    checkbox: /_(boo(lean)?|checkbox)$/,
    // select: /_?(select)$/,
    multiselect: /_(multi(select)?)$/,
    phone: /_(tel|phone)$/,
    date: /_(on|date)$/,
    time: /_(at|time)$/,
    datetime: /_(onat|on_at|datetime)$/,
    textarea: /_?(textarea|body|content)$/,
  };

  const propMatchers = {
    multiselect: ({ value }) => (Array.isArray(value) && (value.length === 0 || typeof value[0] === 'string')),
    checkbox: ({ value }) => (typeof value === 'boolean')
  };

  const { name, type } = props;
  const typeMatch = type ? type.toLowerCase() : null;
  const nameMatch = Object.keys(nameMatchers).find((match) => nameMatchers[match].test(name));
  const propMatch = Object.keys(propMatchers).find((match) => propMatchers[match](props));

  let FieldComponent = Fields.FormFieldInput;

  if (typeMatch && fieldComponentMap[typeMatch] && Fields[fieldComponentMap[typeMatch]]) {
    FieldComponent = Fields[fieldComponentMap[typeMatch]];
  } else if (nameMatch && fieldComponentMap[nameMatch] && Fields[fieldComponentMap[nameMatch]]) {
    FieldComponent = Fields[fieldComponentMap[nameMatch]];
  } else if (propMatch && fieldComponentMap[propMatch] && Fields[fieldComponentMap[propMatch]]) {
    FieldComponent = Fields[fieldComponentMap[propMatch]];
  }

  return <FieldComponent {...props} {...{ optionsFrom }} />;
};
