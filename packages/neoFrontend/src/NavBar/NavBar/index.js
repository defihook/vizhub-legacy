import React, { useContext } from 'react';
import { withTheme } from 'styled-components';
import { showPricing } from '../../featureFlags';
import { LogoSVG } from '../../svg';
import { isMobile } from '../../mobileMods';
import { AuthContext, AUTH_PENDING } from '../../authentication';
import {
  SignIn,
  LogoLink,
  LogoHREF,
  Right,
  PricingLink,
  Banner,
  Wrapper,
} from './styles';
import { UserActionsMenu } from './UserActionsMenu';
import { Search } from './Search';

export const NavBar = withTheme(
  ({
    theme,
    searchProps = {},
    showSearch = false,
    showRight = true,
    isHomePage = false,
    isAuthPage = false,
  }) => {
    const { navbarHeight, navbarLogoColor } = theme;
    const { me, signIn } = useContext(AuthContext);

    return (
      <Wrapper isMobile={isMobile}>
        <Banner isMobile={isMobile}>
          {isHomePage ? (
            <LogoHREF
              target="_blank"
              rel="noopener noreferrer"
              href="https://datavis.tech/vizhub/"
            >
              <LogoSVG height={navbarHeight} fill={navbarLogoColor} />
            </LogoHREF>
          ) : (
            <LogoLink to="/" target="_blank" rel="noopener noreferrer">
              <LogoSVG height={navbarHeight} fill={navbarLogoColor} />
            </LogoLink>
          )}

          {showSearch && !isMobile && <Search {...searchProps} />}

          {isAuthPage ? null : (
            <Right
              className="test-user-navbar-section"
              data-test-is-authenticated={Boolean(me)}
            >
              {showPricing ? (
                <PricingLink to="/pricing">Pricing</PricingLink>
              ) : null}
              {me === AUTH_PENDING || !showRight ? null : me ? (
                <UserActionsMenu />
              ) : (
                <SignIn className="test-sign-in" onClick={signIn}>
                  Sign up / Sign in
                </SignIn>
              )}
            </Right>
          )}
        </Banner>
        {showSearch && isMobile && <Search />}
      </Wrapper>
    );
  }
);
