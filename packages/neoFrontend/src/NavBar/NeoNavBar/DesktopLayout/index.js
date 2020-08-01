import React, { useContext } from 'react';
import { AuthContext } from '../../../authentication';
import { Banner } from '../styles';
import { Right, Left } from './styles';

export const DesktopLayout = ({
  Logo,
  DashboardLink,
  Search,
  HomeLink,
  AboutLink,
  PricingLink,
  AuthSection,
}) => {
  const { me } = useContext(AuthContext);

  return (
    <Banner>
      <Left>
        {Logo}
        {DashboardLink}
      </Left>
      <Right
        className="test-user-navbar-section"
        data-test-is-authenticated={Boolean(me)}
      >
        {Search}
        {HomeLink}
        {AboutLink}
        {PricingLink}
        {AuthSection}
      </Right>
    </Banner>
  );
};
