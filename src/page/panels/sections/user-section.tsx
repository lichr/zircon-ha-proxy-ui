import { Avatar, useTheme } from '@mui/material';
import _ from 'lodash';
import { useEffect } from 'react';
import { ApiStatus, IUserInfo, useApiGet, usePageCore } from '../../../services';
import { ActionLink, B, FeatureSection, Link, P, Row, SG } from '../../../ui';
import { ProjectSection } from './project-section';

export function UserSection(): JSX.Element {
  const { state: { status, error, result: userInfo } } = useApiGet<IUserInfo>('proxy/api/user_info');
  const theme = useTheme();
  const color = theme.palette.primary.main;
  const core = usePageCore();

  let userPart = null;
  let tokenPart = null;
  let ni = '?';
  let photoURL = undefined;

  // set user-info to core-state so that components can respond to its change
  useEffect(
    () => {
      core.update((state) => { state.userInfo = userInfo; });
    },
    [core, userInfo]
  )

  if (userInfo) {
    const { user, tokenId } = userInfo;
    const handleUpdateToken = () => {
      core.go('set-access-token');
    }
    if (tokenId) {
      tokenPart = (
        <P>
          <B>Access Token: </B> {`${tokenId}.******`}
          <ActionLink
            go
            css={{ margin: '0 8px' }}
            title="Update"
            onClick={handleUpdateToken}
          />
        </P>
      );
    } else {
      tokenPart = (
        <>
          <P>
            <B>No Access Token</B>
            <ActionLink
              go
              css={{ margin: '0 8px' }}
              title="Set"
              onClick={handleUpdateToken}
            />
          </P>
          <P>
            You can create an access token from&nbsp;
            <Link external href="https://zircon3d.com/user/profile#access-tokens">user profile</Link>
          </P>
        </>
      );
    }

    if (user) {
      const { displayName, email } = user;
      photoURL = user.photoURL;
      // name initials
      ni = displayName ? _.map(_.split(displayName, ' '), s => _.upperCase(s[0])).join('') : '?';
      userPart = (
        <>
          <Row css={{ gap: '36px' }}>
            <P>
              <B>User:</B> {displayName}
            </P>
            <P>
              <B>Email:</B> {email}
            </P>
          </Row>
        </>
      )
    } else {
      userPart = (
        <P>
          No user info.
        </P>
      );
    }
  }
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
        <ApiStatus status={status} error={error} hideError />
        <SG>
          {userPart}
          {tokenPart}
        </SG>
      </FeatureSection>
      <ProjectSection />
    </>
  );
}
