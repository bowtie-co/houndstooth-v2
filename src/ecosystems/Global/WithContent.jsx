import React from 'react';
import { Container } from 'reactstrap';
import { WithChildren } from '.';

export const WithContent = ({ children, className, ...props }) => {
  // console.debug('WithContent', { children, props });

  return (
    <Container fluid>
      <section className={`WithContent ${className || ''}`}>
        <WithChildren {...props} children={children} />
      </section>
    </Container>
  );
};
