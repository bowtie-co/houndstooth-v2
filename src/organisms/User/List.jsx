import React, { Fragment } from 'react';
import { Container, Row, Col, Table } from 'reactstrap';
import { AppIcon, AppLink, AppButton } from '../../atoms';

export const UserList = ({ contributors, collaborators, otherMembers, user, ...props }) => {
  const { getDeployedUrl, revokeUserAccess, translate } = props;

  return (
    <Container fluid className='UserList'>
      <Row>
        <Col>
          <h1>{translate('sidebar.users')}</h1>
          <Table>
            <thead>
              <tr>
                <th>{translate('users.access')}</th>
                <th>{translate('users.name')}</th>
                <th>Github</th>
                <th>{translate('users.preview')}</th>
                <th>{translate('users.revoke')}</th>
              </tr>
            </thead>
            <tbody>
              {(!collaborators || collaborators.length === 0) && (!otherMembers || otherMembers.length === 0) ? (
                <tr>
                  <td colSpan='5'>{translate('users.empty_state')}</td>
                </tr>
              ) : (
                <Fragment>
                  {collaborators.map((collaborator, index) => (
                    <tr key={index}>
                      <td>
                        {collaborator.permissions.admin ? (
                          <span><AppIcon iconName='user-shield' />Admin</span>
                        ) : (
                          <span><AppIcon iconName='user-edit' />Editor</span>
                        )}
                      </td>
                      <td>
                        {collaborator.login}
                      </td>
                      <td>
                        <AppLink href={collaborator.html_url}>{collaborator.html_url}</AppLink>
                      </td>
                      <td>
                        <AppLink href={'//' + getDeployedUrl(collaborator.login)} target='blank' iconRight='external-link-alt'>
                          {getDeployedUrl(collaborator.login)}
                        </AppLink>
                      </td>
                      <td>
                        { collaborator.id !== user.id && (
                          <AppButton title={translate('users.revoke')} size='xs' onClick={() => revokeUserAccess(collaborator.login)}>
                            <AppIcon color='red' className={'fas fa-ban'}></AppIcon>
                          </AppButton>
                        )}
                      </td>
                    </tr>
                  ))}
                  {otherMembers.map((member, index) => (
                    <tr key={index}>
                      <td>
                        <span><AppIcon iconName='user-times' />None</span>
                      </td>
                      <td>
                        {member.login}
                      </td>
                      <td>
                        <AppLink href={member.html_url}>{member.html_url}</AppLink>
                      </td>
                      <td>
                      </td>
                      <td>
                      </td>
                    </tr>
                  ))}
                </Fragment>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
