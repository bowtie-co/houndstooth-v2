import React from 'react';
import { Container } from 'reactstrap';
import { CollectionCards } from '../../molecules';

export const CollectionList = ({ children, ...props }) => {
  const { jekyll, translate } = props;

  return (
    <Container fluid className="CollectionList">
      <h1>{translate('sidebar.collections')}</h1>
      <hr />
      {jekyll && jekyll.collections ? (
        <CollectionCards {...props} />
      ): (
        <p>{translate('collections.empty_state')}</p>
      )}
    </Container>
  );
};
