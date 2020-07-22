import React from 'react';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { notifier } from '../../lib';


export const CollectionItemEditor = (props) => {
  // console.debug('CollectionItemEditor', { props });

  const { api, itemContent, setItemContent, disabled = false } = props;

  const onEditorChange = (data) => setItemContent(data);

  // TODO: Upgrade inline wysiwyg uploads to use dedicated s3 asset uploads
  const onUpload = (blobInfo, success, failure) => {
    const blob = blobInfo.blob();

    api.post('upload', {
      Key: `upload/${blob.type}/${Date.now()}-${blob.name}`,
      ContentType: blob.type
    }).then(resp => resp.json()).then((upload) => {
      const { publicUrl, signedUrl } = upload;

      fetch(signedUrl, { method: 'PUT', body: blob }).then(() => {
        success(publicUrl);
      }).catch(err => {
        console.error(err);
        notifier.bad(err);
        failure(err);
      });
    }).catch(err => {
      console.error(err);
      notifier.bad(err);
      failure(err);
    });
  };

  return (
    <div className='wysiwyg-section tab-content-card'>
      <Editor
        // inline
        apiKey={process.env.REACT_APP_TINY_API_KEY}
        disabled={disabled}
        initialValue={itemContent}
        onEditorChange={onEditorChange}
        init={{
          height: '100%',
          toolbar_drawer: 'floating',
          plugins: 'link image code hr lists fullscreen media',
          menubar: 'false',
          toolbar1: 'undo redo | formatselect | fontselect | fontsizeselect | link media image',
          toolbar2: ' bold italic underline superscript | alignleft aligncenter alignright alignjustify | bullist numlist | hr | removeformat | fullscreen code',
          content_style: 'img {max-width: 100%;}',
          relative_url: false,
          convert_urls: false,
          file_picker_types: 'file image media',
          images_upload_handler: onUpload
        }}
        // value={itemContent}
        // plugins={'code image imagetools'}
        // toolbar={'code image preview imageoptions media'}
      />
    </div>
  );
};

CollectionItemEditor.propTypes = {
  itemContent: PropTypes.string,
  pageProps: PropTypes.object
};
