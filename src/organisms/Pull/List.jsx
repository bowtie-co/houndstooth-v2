import React from 'react';
import {
  Container, Row, Col, Table
} from 'reactstrap';
import moment from 'moment';
import { AppLink, AppIcon, AppButton } from '../../atoms';

export const PullList = ({ pulls, ...props }) => {
  const { getDeployedUrl, approveChanges, translate } = props;

  return (
    <Container fluid className='PullList'>
      <Row>
        <Col>
          <h1>{translate('sidebar.changes')}</h1>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>{translate('changes.title')}</th>
                <th>{translate('changes.user')}</th>
                <th>{translate('changes.preview')}</th>
                <th>{translate('general.last_updated')}</th>
                <th>{translate('changes.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {pulls && pulls.length ? pulls.map((pull, index) => (
                <tr key={index}>
                  <td>
                    {pull.number}
                  </td>
                  <td>
                    {pull.title}
                  </td>
                  <td>
                    {pull.user.login}
                  </td>
                  <td>
                    <AppLink href={'//' + getDeployedUrl(pull.user.login)} target='blank' iconRight='external-link-alt'>
                      {getDeployedUrl(pull.user.login)}
                    </AppLink>
                  </td>
                  <td>
                    {moment(pull.updated_at).format('YYYY-MM-DD hh:mm A')}
                  </td>
                  <td>
                    <AppButton title={translate('changes.approve')} size='xs' color='success' onClick={() => approveChanges(pull.number)}>
                      <AppIcon iconName='check' />
                    </AppButton>
                    <AppButton title={translate('changes.deny')} size='xs' color='danger'>
                      <AppIcon iconName='times' />
                    </AppButton>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan='5'>{translate('changes.empty_state')}</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
