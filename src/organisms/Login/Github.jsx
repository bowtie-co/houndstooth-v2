import React from 'react';
import { Row, Col } from 'reactstrap';
import { auth } from '../../lib';
import { AppLink, AppIcon, AppButton, BowtieLogo, HoundstoothLogo } from '../../atoms';

export const LoginGithub = (props) => {
  // console.debug('LoginGithub', { props });

  // return (
  //   <Button onClick={() => auth.login('GITHUB')} block size='lg' color='secondary'>
  //     <i className="fab fa-github" />
  //     &nbsp;
  //     Sign in with GitHub
  //   </Button>
  // );

  return (
    <section className='welcome-screen'>
      <Row className='flex-center'>
        <Col className='column-1' sm='12'>
          <HoundstoothLogo size='lg' />
        </Col>
        <Col className='flex flex-center' sm='12'>
          by
          <AppLink href='https://bowtie.co/' target='_blank'>
            <BowtieLogo color='black' size='sm' />
          </AppLink>
        </Col>
        <Col className='flex flex-center column-3' sm='12'>
          <AppButton className='btn-login' onClick={() => auth.login('GITHUB')}>
            <AppIcon className={'fab fa-github'} size='md' />
            <div>Login with Github</div>
          </AppButton>
        </Col>
      </Row>
    </section>
  );
};
