import React, { Fragment } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AppButton } from '../../../atoms';

export const RepoModalResolve = (props) => {
  // console.debug('RepoModalResolve', props);

  const { branchConflicts, resolveConflicts, translate } = props;
  // const [ showModal, setShowModal ] = useState(true);
  const isConflicting = () => (branchConflicts && branchConflicts.length > 0);
  // const toggleModal = () => setShowModal(!showModal);
  const toggleModal = () => {
    resolveConflicts(true);

    // Allow link to resolve? Advanced?
    // https://github.com/5290charlie/45rpm-site/pull/15/conflicts
  };

  if (!isConflicting()) {
    return <Fragment />;
  }

  return (
    <Fragment>
      <Modal size='md' isOpen>
        <ModalHeader>
          {translate('changes.conflicting')}
        </ModalHeader>
        <ModalBody>
          {translate('changes.resolve_modal')}
          <br />
          <br />
          {translate('changes.resolve_files')}
          <br />
          <ul>
            {branchConflicts.map((conflict, i) => (
              <li key={i}>
                {conflict.filename}
              </li>
            ))}
          </ul>
        </ModalBody>
        <ModalFooter>
          <AppButton color={'warning'} onClick={toggleModal}>
            {translate('changes.reset')}
          </AppButton>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};
