import React from 'react';
import Dropzone from 'react-dropzone';
import { notifier } from '../../../lib';
import { Row, Col } from 'reactstrap';
import { AppButton } from '../../../atoms';
import { FormGroup } from '../';

const handleFileDrop = ({ name, onChange, togglePreview }) => (accepted, rejected) => {
  rejected.forEach(file => {
    if (file.size > (5 * 1024 * 1024)) {
      notifier.error(`File: ${file.name} is too large. Must be less than 5MB.`);
    } else {
      notifier.error(`File: ${file.name} is invalid.`);
    }
  });

  accepted.forEach(file => {
    const reader = new FileReader();
    reader.onload = () => {
      const documentBase64 = reader.result;
      onChange({ target: { name, value: documentBase64 } });
    };

    reader.onabort = () => console.debug('file reading was aborted');
    reader.onerror = () => console.debug('file reading has failed');

    reader.readAsDataURL(file);
    togglePreview(true);
  });
};

const handleCancelPreview = ({ onChange, name, togglePreview }) => (e) => {
  e.preventDefault();
  onChange({ target: { name, value: null, revert: true } });
  togglePreview(false);
};

const deleteImage = ({ onChange, name }) => (e) => {
  e.preventDefault();
  onChange({ target: { name, value: null } });
};

export const FormFieldUploadEmpty = (props) => {
  const { name, value, defaultImage, preview, ...rest } = props;
  return (
    <FormGroup {...rest}>
      <Dropzone
        className='react-dropzone'
        name={name}
        onDrop={handleFileDrop(props)}
        multiple={false}
        accept='image/*'
      >
        <div>Upload Image</div>
      </Dropzone>
    </FormGroup>
  );
};

export const FormFieldImageUpload = (props) => {
  // console.debug('FormFieldImageUpload', { props });
  const { name, value, defaultImage, preview, ...rest } = props;

  if (!value || value.trim() === '') {
    return <FormFieldUploadEmpty {...props} />;
  }

  return (
    <FormGroup {...rest}>
      <img alt='preview' className={'img-preview'} src={value} />
      <Dropzone
        className='react-dropzone-preview'
        name={name}
        onDrop={handleFileDrop(props)}
        multiple={false}
        accept='image/*'
      >
        <Row>
          <Col>
            <AppButton onClick={(e) => e.preventDefault()}>Change Image</AppButton>
          </Col>

        </Row>
      </Dropzone>
      <Col>
        {
          preview
            ? <AppButton onClick={handleCancelPreview(props)}>Cancel</AppButton>
            : <AppButton onClick={deleteImage(props)}>Delete</AppButton>
        }
      </Col>
    </FormGroup>
  );
};

// /* global FileReader */

// import { compose, withHandlers, withState } from 'recompose';
// import { withEither } from '@bowtie/react-utils';
// import { notifier } from 'lib';
// import ImageUpload from './ImageUpload';
// import EmptyState from './EmptyState';

// const emptyStateConditionalFn = ({ value }) => !value;

// export default compose(
//   withState('preview', 'togglePreview', false),
//   withHandlers({
//     handleFileDrop: ({ name, onChange, togglePreview }) => (accepted, rejected) => {
//       rejected.forEach(file => {
//         if (file.size > (5 * 1024 * 1024)) {
//           notifier.error(`File: ${file.name} is too large. Must be less than 5MB.`);
//         } else {
//           notifier.error(`File: ${file.name} is invalid.`);
//         }
//       });

//       accepted.forEach(file => {
//         const reader = new FileReader();
//         reader.onload = () => {
//           const documentBase64 = reader.result;
//           onChange({ target: { name, value: documentBase64 } });
//         };

//         reader.onabort = () => console.log('file reading was aborted');
//         reader.onerror = () => console.log('file reading has failed');

//         reader.readAsDataURL(file);
//         togglePreview(true);
//       });
//     },
//     handleCancelPreview: ({ onChange, name, togglePreview }) => (e) => {
//       e.preventDefault();
//       onChange({ target: { name, value: null, revert: true } });
//       togglePreview(false);
//     },
//     deleteImage: ({ onChange, name }) => (e) => {
//       e.preventDefault();
//       onChange({ target: { name, value: null } });
//     }
//   }),
//   withEither(emptyStateConditionalFn, EmptyState)
// )(ImageUpload);
