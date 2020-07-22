import React, { Fragment, useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AppIcon, AppButton } from '../../../atoms';
import { FormFieldInput } from '../../../molecules';

export const CollectionItemModalForm = ({ children, isOpen, ...props }) => {
  const { itemName, defaultName, friendlyName, isValidName, isNameTaken, updateItemName, onDone, showEditName, setShowEditName, translate } = props;
  const { title, icon = 'edit', color = 'info', size = 'xs' } = props;
  const [ showModal, setShowModal ] = useState(isOpen);

  useEffect(() => {
    setShowModal(!!isOpen);
  }, [ isOpen ]);

  const toggleModal = (done = false) => () => {
    if (isValidName()) {
      if (showModal && done && typeof onDone === 'function') {
        setShowModal(!onDone(itemName));
      } else {
        setShowModal(!showModal);
      }
    } else if (showModal) {
      alert(`${translate('collections.invalid_name')}: '${itemName}'`);
    } else {
      setShowModal(true);
    }

    if (showEditName) {
      setShowEditName(false);
    }
  };

  return (
    <Fragment>
      <AppButton title={title || translate('editor.edit')} size={size} color={color} onClick={toggleModal()}>
        <AppIcon iconName={icon} />
      </AppButton>
      <Modal scrollable size='lg' isOpen={showModal} toggle={toggleModal()}>
        <ModalHeader toggle={toggleModal()}>
          {translate('collections.entry_name')}
        </ModalHeader>
        <ModalBody className='stuff-n-things'>
          <FormFieldInput
            value={isValidName() ? friendlyName(itemName) : defaultName()}
            label={translate('collections.entry_name')}
            placeholder={translate('collections.entry_name')}
            errorMessage={!isValidName() ? 'Invalid name' : isNameTaken() && 'Already exists'}
            onChange={(e) => updateItemName(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          {isValidName() && !isNameTaken() && (
            <AppButton size='sm' color={'success'} onClick={toggleModal(true)}>
              {translate('general.done')}
            </AppButton>
          )}
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};
