import { Avatar, useTheme } from '@mui/material';
import _ from 'lodash';
import { ApiStatus, IUserInfo, useApiGet } from '../../../services';
import { ActionLink, B, FeatureSection, P, PanelSection, Row, SG } from '../../../ui';
import { ProjectSection } from './project-section';

export function UserSection(): JSX.Element {
  const { state: { status, error, result: userInfo } } = useApiGet<IUserInfo>('user_info');
  const theme = useTheme();
  const color = theme.palette.primary.main;


  if (userInfo) {
    const { displayName, email, photoURL, tokenId } = userInfo;
    // name initials
    const ni = displayName ? _.map(_.split(displayName, ' '), s => _.upperCase(s[0])).join('') : '?';
    return (
      <>
        <FeatureSection
          side={
            <Avatar
              sx={{
                backgroundColor: color
              }}
              src={photoURL ?? undefined}
            >{ni}</Avatar>
          }
          title="User Info"
        >
          <SG>
            <Row css={{ gap: '36px' }}>
              <P>
                <B>User:</B> {displayName}
              </P>
              <P>
                <B>Email:</B> {email}
              </P>
            </Row>
            <P>
              <B>Access Token: </B> {`${tokenId}.******`}
              <ActionLink go css={{ margin: '0 8px' }} title="Update" onClick={() => { }} />
            </P>
          </SG>
        </FeatureSection>
        <ProjectSection />
      </>
    );
  } else {
    return (
      <PanelSection title="User Info">
        <ApiStatus status={status} error={error} />
        <P>
          No user info.
        </P>
      </PanelSection>
    );
  }
}
