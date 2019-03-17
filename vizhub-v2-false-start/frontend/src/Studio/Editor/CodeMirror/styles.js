import styled, { createGlobalStyle } from 'styled-components';
import { mono } from '../../../styles.js';

export const Wrapper = styled.div`
  flex: 1;
  background-color: ${props => props.theme.background};
  cursor: text;
`;

const color = key => ({ theme }) => `color: ${theme[key].color || theme[key]}`;
const style = key => ({ theme }) =>
  `font-style: ${theme[key].style || 'normal'}`;
const weight = key => ({ theme }) =>
  `font-weight: ${theme[key].weight || 'normal'}`;

export const CodeMirrorGlobalStyle = createGlobalStyle`
  .codemirror {
    font-family: '${mono.family}';
    line-height: ${mono.lineHeight};
    font-size: ${mono.size};
  }
  .codemirror, .codemirror-gutter {
    background-${color('background')};
  }
  .codemirror ::selection {
    background-${color('selection')};
  }
  .codemirror-gutter {
    border-right: ${props => props.theme.gutterBorder};
  }
  .codemirror-gutter-element {
    ${color('lineNumbers')} !important;
  }
  .codemirror-content {
    caret-${color('foreground')};
  }

  .cm-keyword,
  .cm-attribute {
    ${color('keyword')};
    ${weight('keyword')};
  }

  .cm-comment {
    ${color('comment')};
    ${style('comment')};
  }

  .cm-atom,
  .cm-string,
  .cm-string-2,
  .cm-qualifier {
    ${color('atom')};
  }

  .cm-number {
    ${color('number')};
  }

  .cm-operator {
    ${color('operator')};
  }

  .cm-property {
    ${color('property')};
  }
`;
