import React from 'react';
import { Button } from 'reactstrap';
import { auth } from '../../lib';

export const LoginBitbucket = (props) => {
  // console.debug('LoginBitbucket', { props });

  return (
    <Button onClick={() => auth.login('BITBUCKET')} block size='lg' color='primary'>
      <i className="fab fa-bitbucket" />
      &nbsp;
      Sign in with Bitbucket
    </Button>
  );
};
