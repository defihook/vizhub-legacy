import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

const theme = {
  dark: '#161514',
  attentionGrabber: '#f0353d',
  shadow: '0 1px 4px 0 rgba(0, 0, 0, 0.15)'
};

const Wrapper = styled.div`
  color: ${props => props.theme.dark};
`;

export const Themed = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Wrapper>{children}</Wrapper>
  </ThemeProvider>
);