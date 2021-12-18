import React from 'react';
import { Link } from 'react-router-dom';
import { NavBar } from '../../NavBar';
import { Button } from '../../Button';
import {
  GITHUB_OAUTH_URL,
  CI_AUTH_PATH,
  GOOGLE_OAUTH_URL,
  FACEBOOK_OAUTH_URL,
} from '../../authentication';
import { Wrapper, Content, Title, DevsOnly, Centering } from '../styles';
import { Box, Octocat, Terms, SinginLink } from './styles';
import { showFacebookLogin, showGoogleLogin } from '../../featureFlags';

export const AuthPage = () => {
  return (
    <>
      <NavBar isAuthPage={true} />
      <Wrapper>
        <Content>
          <Centering>
            <Box>
              <Title>Sign up or Sign in</Title>
              If you don&apos;t have an account, one will be created when you
              sign in.
              <Octocat
                width="120"
                height="120"
                src="/images/GitHub-Mark-120px-plus.png"
              />
              <a href={GITHUB_OAUTH_URL}>
                <Button>Sign in with GitHub</Button>
              </a>
              {showGoogleLogin ? (
                <SinginLink href={GOOGLE_OAUTH_URL}>
                  <Button>Sign in with Google</Button>
                </SinginLink>
              ) : null}
              {showFacebookLogin ? (
                <SinginLink href={FACEBOOK_OAUTH_URL}>
                  <Button>Sign in with Facebook</Button>
                </SinginLink>
              ) : null}
              <Terms>
                By signing in you agree to our{' '}
                <Link to="/terms">terms and conditions.</Link>
              </Terms>
              {process.env.NODE_ENV === 'development' ? (
                <>
                  <DevsOnly>
                    <Title>For developers only</Title>
                  </DevsOnly>
                  <Link to={CI_AUTH_PATH}>
                    <Button className="test-sign-in-as-ci">
                      Sign in as CI
                    </Button>
                  </Link>
                </>
              ) : null}
            </Box>
          </Centering>
        </Content>
      </Wrapper>
    </>
  );
};
