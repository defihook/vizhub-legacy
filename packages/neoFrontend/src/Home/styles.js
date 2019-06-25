import styled from 'styled-components';
import { LogoSVGAspectRatio } from '../svg/LogoSVG';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  max-width: 1380px;
  flex: 1;
`;

export const Banner = styled.div`
  padding-top: 32px;
  padding-bottom: 32px;
  margin: 6px;
  flex: 1;
  display: flex;
  justify-content: space-between;
`;

export const SignIn = styled.div`
  color: #f0353c;
  font-weight: bold;
`;

export const Logo = styled.div`
  width: ${props => props.height * LogoSVGAspectRatio}px;
`;
