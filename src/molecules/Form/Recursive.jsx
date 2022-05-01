// import React, { useState, useEffect, useCallback } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'reactstrap';
import { FormFieldGroup } from './Field';

export const FormRecursive = (props) => {
  const { fields } = props;
  const { className, onChange, ...rest } = props;

  // // const [ formData, setFormData ] = useState(fields);

  // const submitForm = useCallback((event) => {
  //   console.log('submitForm', event.target, event.target.value);

  //   if (typeof onSubmit === 'function') {
  //     onSubmit(formData);
  //   } else {
  //     console.log('submitForm - onSubmit is not a function:', { onSubmit });
  //   }
  // }, [ formData ]);

  const getSafeValue = (key, value) => {
    // TODO: @Brennan + @Charlie - Configure additional keys to enforce safe parsing
    const safeKeys = [ 'title' ];

    if (safeKeys.includes(key)) {
      return value.replace(/[#"]/gmi, '');
    }

    return value;
  };

  const handleChange = (key, value) => {
    const keys = key.split('.');
    const fieldsCopy = Object.assign({}, fields);
    let pointer = fieldsCopy;

    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];

      if (i === keys.length - 1) {
        // Set nested form data by pointer (encode if included in array above)
        pointer[k] = getSafeValue(key, value);
      } else {
        pointer = pointer[k];
      }
    }

    if (typeof onChange === 'function') {
      onChange(fieldsCopy);
    } else {
      // console.debug('handleChange - onChange is not a function:', { onChange });
    }
  };

  return (
    <Form className={`FormRecursive ${className || ''}`}>
      <FormFieldGroup {...rest} handleChange={handleChange} />
    </Form>

    // <div>
    //   {
    //     !rest['disabled'] &&
    //       <div style={{ 'padding': '20px 0px 15px 5px' }}>
    //         <Row>
    //           <Col sm='6'>
    //             <div className='flex align-center justify-content-start w-100 h-100'>
    //               <AppIcon
    //                 onClick={toggleModal}
    //                 iconName='trash-alt'
    //                 color='#ff3500'
    //                 size='sm'
    //                 id='delete-item-icon'
    //                 tooltip='Delete file'
    //                 placement='top'

    //               />
    //             </div>
    //           </Col>
    //           <Col sm='6'>
    //             <div className='flex align-center justify-content-end'>
    //               <AppButton onClick={() => onSubmit(formData)}>
    //                   Save
    //               </AppButton>
    //             </div>
    //           </Col>
    //         </Row>
    //       </div>
    //   }

    //   {/* <DeleteFileModal
    //     isOpen={isDeleteModalOpen}
    //     handleClick={deleteItem}
    //     toggleModal={toggleModal}
    //   /> */}
    // </div>
  );
};

FormRecursive.defaultProps = {
  formData: {},
  onSubmit: () => {}
};

FormRecursive.propTypes = {
  formData: PropTypes.object.isRequired,
  fields: PropTypes.object,
  onSubmit: PropTypes.func.isRequired
};
