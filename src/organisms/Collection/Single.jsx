import React from 'react';
import { Container, Row, Col } from 'reactstrap';
// import { AppIcon } from '../../atoms';
import { CollectionItemCards } from '../../molecules';
import { AppButton, AppIcon } from '../../atoms';

export const CollectionSingle = ({ children, ...props }) => {
  const { repo, collection, translate } = props;
  // const { label = collection, icon = 'folder' } = jekyll.collections[collection];

  const handleClick = () => {
    return window.location.href = `/${repo.full_name}/collections/${collection}/_new`;
  };

  return (
    <Container fluid className="CollectionSingle">
      <Row>
        <Col>
          <h1>{collection}</h1>
          <hr />
        </Col>
        <Col className="text-right">
          <AppButton size={'sm'} color={'info'} onClick={handleClick}>
            <AppIcon iconName={'file-alt'} fill={false} /> {translate('editor.new')}
          </AppButton>
        </Col>
      </Row>
      <CollectionItemCards {...props} />
    </Container>
  );
};
