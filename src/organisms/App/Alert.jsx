import React, { Fragment, useState, useEffect } from 'react';
import { Alert, Container, Row, Col } from 'reactstrap';

export const AppAlert = ({ children, ...props }) => {
  const { notifier } = props;
  const [ messages, setMessages ] = useState(notifier.load());
  const dismissAlert = (msg) => notifier.clearMsg(msg);

  useEffect(() => {
    const loadMessages = () => setMessages(notifier.load());

    notifier.on('change', loadMessages);

    return () => notifier.off('change', loadMessages);
  }, [ notifier ]);

  useEffect(() => {
    messages.forEach(notifier.readMsg.bind(notifier));
  }, [ notifier, messages ]);

  if (messages && messages.length > 0) {
    return (
      <Container fluid>
        <Row>
          <Col>
            {messages.map(msg =>
              <Alert key={msg.id} color={msg.color} type={msg.type} isOpen toggle={() => dismissAlert(msg)} className={`${msg.type} pre-wrap`}>
                {msg.body}
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    );
  } else {
    return <Fragment />;
  }
};
