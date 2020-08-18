import React, { useState, useEffect } from 'react';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import { Progress, Row, Col, Label } from 'reactstrap';
import { AppButton, AppIcon } from '../../../atoms';
import { FormGroup } from '../';
import { fileIcons } from '../../../lib/lists';
import { notifier } from '../../../lib';

const getFileExt = (filename) => {
  if (!filename || !/[^.]+\.[^.]/.test(filename)) {
    console.warn('WithDocuments.getFileExt() - Cannot get ext from filename:', filename);
    return null;
  }

  return filename.split('.')[filename.split('.').length - 1].toLowerCase();
};

const getFileIcon = (filename) => {
  const ext = getFileExt(filename);
  const icon = ext && fileIcons[ext] ? fileIcons[ext] : fileIcons['file-alt'];

  return icon;
};

export const FormFieldUpload = (props) => {
  const { api, user, name, value, onChange, onError, onProgress, onFinish, document, translate, repo, ...rest } = props;
  const { preventUpdate = false, iconOnly = false } = rest;
  // const { docFilepath = 'default', docLifetime = 30, docPermsAllow = ['admin'] } = rest;

  // const [ uploadedUrl, setUploadedUrl ] = useState();
  const [ previewUrl, setPreviewUrl ] = useState();
  const [ previewIcon, setPreviewIcon ] = useState(getFileIcon(value) || 'file');
  const [ isUploading, setIsUploading ] = useState(false);
  const [ showPreview, setShowPreview ] = useState(!!value);
  const [ uploadProgress, setUploadProgress ] = useState(0);

  useEffect(() => {
    const icon = getFileIcon(value);

    if (icon) {
      setPreviewIcon(icon);
      setShowPreview(true);
    }

    if (value && /^https?:\/\//.test(value)) {
      setTimeout(() => {
        fetch(value).then((resp) => {
          if (resp.status < 400) {
            setPreviewUrl(value);
            setShowPreview(true);
          }
        }).catch(err => {
          console.error('Invalid preview url lookup', err);
        });
      }, 1000);
    }
  }, [ value ]);

  const getSignedUrl = (file, callback) => {
    if (/image/.test(file.type)) {
      setPreviewUrl(file.preview);
    }

    setShowPreview(true);

    api.post('upload', {
      Key: `${repo.full_name}/${Date.now()}-${file.name}`,
      ContentType: file.type
    }).then(resp => resp.json()).then((upload) => {
      const { publicUrl, signedUrl } = upload;
      onChange({ target: { name, value: publicUrl }});
      callback({ signedUrl });
    }).catch(err => {
      console.error(err);
      notifier.bad(err);
    });

    // if (document) {
    //   api.post('documents', {
    //     filepath: docFilepath,
    //     filename: file.name,
    //     filetype: file.type,
    //     filesize: file.size,
    //     lifetime: docLifetime,
    //     owner: user.login,
    //     permissions: {
    //       allow: docPermsAllow
    //     }
    //   }).then(resp => resp.json()).then((document) => {
    //     console.log('Document', document);
    //     onChange(document);
    //     notifier.success(translate('documents.created'));
    //     // setPreviewUrl(document.getObjectUrl);
    //     callback({ signedUrl: document.putObjectUrl });
    //   }).catch(err => {
    //     console.error(err);
    //     notifier.bad(err);
    //   });
    // } else {
    //   api.post('upload', {
    //     Key: `${file.type}/${file.name}`,
    //     ContentType: file.type
    //   }).then(resp => resp.json()).then((upload) => {
    //     const { publicUrl, signedUrl } = upload;

    //     console.log('Uploaded:', upload);
    //     onChange({ target: { name, value: publicUrl }});

    //     callback({ signedUrl });
    //   }).catch(err => {
    //     console.error(err);
    //     notifier.bad(err);
    //   });
    // }
  };

  const onUploadProgress = (args) => {
    if (!isUploading) setIsUploading(true);

    setUploadProgress(args);

    if (typeof onProgress === 'function') {
      onProgress(args);
    }

    if (args === 100 && typeof onFinish === 'function') {
      onFinish();
    }
  };

  const onUploadError = (args) => {
    notifier.bad(args);

    setIsUploading(false);

    if (typeof onError === 'function') {
      onError(args);
    }
  };

  const changeUpload = () => {
    setIsUploading(false);
    setShowPreview(false);
    setPreviewUrl(null);
  };

  const clearUpload = () => {
    changeUpload();
    onChange({ target: { value: null } });
  };

  return (
    <FormGroup {...rest}>
      {/* <p className='truncate'>
        { previewUrl ? (
          <AppLink target='_blank' href={previewUrl}>
            {previewUrl.replace(/^https?:\/\/([^/]+)\//, '')}
          </AppLink>
        ) : value && (
          <AppLink target='_blank' href={value}>
            {value.replace(/^https?:\/\/([^/]+)\//, '')}
          </AppLink>
        )}
      </p> */}
      {showPreview ? (
        <Row className='text-center'>
          <Col sm='12' className={'text-left'} style={{ marginTop: '5px' }} onClick={(e) => e.preventDefault()}>
            <AppIcon onClick={() => clearUpload()} iconName={'trash'} />
          </Col>
          <Col sm='12' style={{ marginTop: '10px', marginBottom: '15px' }} onClick={(e) => e.preventDefault()}>
            {!iconOnly && previewUrl ? (
              <img alt='preview' className={'img-thumbnail'} src={previewUrl} style={{ maxHeight: '200px' }} />
            ) : (
              <AppIcon iconName={previewIcon} size='xxl' />
            )}
          </Col>
          {preventUpdate ? (
            <Col sm='12'>
              <Label>
                {value}
              </Label>
            </Col>
          ) : (
            <Col sm='12'>
              <AppButton block onClick={() => changeUpload()}>
                {translate('form.change')}
              </AppButton>
            </Col>
          )}
        </Row>
      ) : (
        <Row className='text-center'>
          <Col sm='12'>
            <DropzoneS3Uploader
              style={{
                width: '100%',
                height: 'auto',
                padding: '40px',
                cursor: 'pointer',
                border: '2px dashed rgb(153, 153, 153)',
                borderRadius: '10px',
                overflow: 'hidden'
              }}
              name={name}
              // onDrop={handleFileDrop}
              multiple={false}
              onProgress={onUploadProgress}
              onError={onUploadError}
              s3Url={process.env.REACT_APP_S3_UPLOAD_URL}
              maxSize={1024 * 1024 * 50}
              upload={{
                getSignedUrl,
                uploadRequestHeaders: {},
              }}
            >
              <AppButton block onClick={(e) => e.preventDefault()}>
                {translate('form.upload')}
              </AppButton>
            </DropzoneS3Uploader>
          </Col>
        </Row>
      )}
      {isUploading && (
        <Row>
          <Col>
            <div className="text-center">{uploadProgress}%</div>
            <Progress value={uploadProgress} />
          </Col>
        </Row>
      )}
    </FormGroup>
  );
};
