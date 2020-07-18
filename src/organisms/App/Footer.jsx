import React from 'react';
import { Row, Col } from 'reactstrap';

export const AppFooter = ({ children, ...props }) => {
  const { translate } = props;

  return (
    <section className='AppFooter footer-section'>
      <Row className='text-center'>
        <Col sm='12'>
          <div className='mt-4'>
            <span>{translate('footer.powered_by')}</span>
            <br />
            <span>{translate('footer.support_msg')} <a href='mailto:info@bowtie.co'>info@bowtie.co</a></span>
          </div>
        </Col>
      </Row>
    </section>
  );
};
