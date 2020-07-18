import React, { Fragment, useState } from 'react';
import {
  Modal, ModalHeader, ModalBody, ModalFooter,
  Button, Card, CardBody
} from 'reactstrap';

const defaultDebug = {
  environment: process.env
};

export const DebugProps = ({ children, label = 'Props', ...props }) => {
  const { debug, local } = props;
  const [ showDebugModal, setShowDebugModal ] = useState(false);
  const toggleDebugModal = () => setShowDebugModal(!showDebugModal);

  // console.debug('DebugProps', { children, props });

  if (!(debug || local)) {
    return <Fragment />;
  }

  return (
    <Fragment>
      <Button style={{ position: 'absolute', bottom: '10px', right: '10px' }} color='info' size='sm' onClick={toggleDebugModal}>
        Debug
      </Button>
      <Modal scrollable size='lg' isOpen={showDebugModal} toggle={toggleDebugModal}>
        <ModalHeader toggle={toggleDebugModal}>DebugProps</ModalHeader>
        <ModalBody>
          <Card className='DebugProps'>
            <CardBody>
              <code><pre>{JSON.stringify(Object.assign(defaultDebug, { props }), null, 2)}</pre></code>
            </CardBody>
          </Card>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleDebugModal}>Close</Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};
