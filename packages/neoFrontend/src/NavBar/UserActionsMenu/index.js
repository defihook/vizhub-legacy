import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { withTheme } from 'styled-components';
import { AuthContext } from '../../authentication';
import { CloseSVG } from '../../svg';
import { Avatar } from '../../Avatar';
import { AvatarOverlay, Wrapper, Menu, Item, HorizontalRule } from './styles';
import { useCloseOnGlobalClick } from './useCloseOnGlobalClick';

export const UserActionsMenu = withTheme(({ theme }) => {
  const {
    userMenuOverlayForeground,
    navbarAvatarBorderColor,
    navbarHeight
  } = theme;

  const { me, signOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  useCloseOnGlobalClick(isOpen, close);

  return (
    <Wrapper height={navbarHeight}>
      <Avatar
        size={navbarHeight}
        borderColor={isOpen ? undefined : navbarAvatarBorderColor}
        user={me}
        onClick={open}
      />
      {isOpen ? (
        <>
          <AvatarOverlay size={navbarHeight}>
            <CloseSVG
              height={navbarHeight / 2}
              fill={userMenuOverlayForeground}
            />
          </AvatarOverlay>
          <Menu height={navbarHeight}>
            <Link to="/create-viz">
              <Item className="test-create-viz" topmost={true}>
                Create Visualization
              </Item>
            </Link>
            <HorizontalRule />
            <Item className="test-sign-out" onClick={signOut} bottommost={true}>
              Sign out
            </Item>
          </Menu>
        </>
      ) : null}
    </Wrapper>
  );
});
