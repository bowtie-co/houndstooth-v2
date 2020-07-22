import React from 'react';
// import * as yaml from 'js-yaml';
import { Row, Col } from 'reactstrap';
import { AppIcon, AppButton } from '../../atoms';
import { CollectionItemModalForm } from '../../organisms';

export const CollectionItemControls = (props) => {
  // TODO: Additional sanitize & safe inputs (parse,strip,encode,etc)
  const { itemName, pageProps, isValidName, upsertItem, deleteItem, showEditName, translate } = props;
  const { entry } = pageProps;

  const saveChanges = (e) => {
    if (window.confirm(translate('notify.confirm'))) {
      upsertItem();
    }
  };

  const duplicateItem = (e) => {
    if (isValidName() && itemName !== entry) {
      // Duplicate argument = true
      upsertItem(true);
      return true;
    } else if (itemName === entry) {
      return true;
    } else {
      return window.confirm(`${translate('general.cancel')}?`);
    }
  };

  const deleteItemAction = (e) => {
    if (window.confirm(translate('notify.confirm'))) {
      deleteItem();
    }
  };

  return (
    <Row className='CollectionItemControls'>
      <Col xs='6' sm='8' md='9' lg='10'>
        {/* <CollectionItemModalForm {...props} {...{ defaultName, isValidName, isOpen: !isValidName() }} /> */}
        <AppButton title={translate('editor.save_title')} size='xs' color='success' onClick={saveChanges}>
          <AppIcon iconName='save' />{translate('editor.save')}
        </AppButton>
        <CollectionItemModalForm {...props} title={translate('editor.rename')} isOpen={showEditName} />
        <CollectionItemModalForm {...props} title={translate('editor.duplicate_title')} icon='copy' onDone={duplicateItem} />
      </Col>
      <Col xs='6' sm='4' md='3' lg='2' className='text-right'>
        <AppButton title={translate('editor.delete_title')} size='xs' color='danger' onClick={deleteItemAction}>
          <AppIcon iconName='trash' />
        </AppButton>
      </Col>
    </Row>
  );
};
