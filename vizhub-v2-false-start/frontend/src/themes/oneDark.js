// Inspired by https://github.com/Aerobird98/codemirror-one-dark-theme/blob/master/one-dark.css
const theme = {
  foreground: '#abb2bf',
  background: '#282c34',
  selection: '#3e4451',
  gutterBorder: '1px solid #533d51',
  lineNumbers: '#5c6370'
};

//  color: #abb2bf !important;
//  background-color: transparent;
//}
//.cm-s-one-dark .CodeMirror-cursor {border-left: 2px solid #56b6c2 !important;}
///* addon: edit/machingbrackets.js & addon: edit/matchtags.js */
//.cm-s-one-dark .CodeMirror-matchingbracket,
//.cm-s-one-dark .CodeMirror-matchingtag {
//  border-bottom: 2px solid #56b6c2;
//  color: #abb2bf !important;
//  background-color: transparent;
//}
//.cm-s-one-dark .CodeMirror-nonmatchingbracket {
//  border-bottom: 2px solid #e06c75;
//  color: #abb2bf !important;
//  background-color: transparent;
//}
///* addon: fold/foldgutter.js */
//.cm-s-one-dark .CodeMirror-foldmarker,
//.cm-s-one-dark .CodeMirror-foldgutter,
//.cm-s-one-dark .CodeMirror-foldgutter-open,
//.cm-s-one-dark .CodeMirror-foldgutter-folded {
//  border: none;
//  text-shadow: none;
//  color: #5c6370 !important;
//  background-color: transparent;
//}
///* addon: selection/active-line.js */
//.cm-s-one-dark .CodeMirror-activeline-background {background-color: rgba(153, 187, 255, 0.04);}
///* basic syntax */
//.cm-s-one-dark .cm-header {color: #e06c75;}
//.cm-s-one-dark .cm-quote {color: #5c6370;font-style: italic;}
//.cm-s-one-dark .cm-negative {color: #e06c75;}
//.cm-s-one-dark .cm-positive {color: #e06c75;}
//.cm-s-one-dark .cm-strong {color: #d19a66;font-weight: bold;}
//.cm-s-one-dark .cm-header .cm-strong {color: #d19a66;font-weight: bold;}
//.cm-s-one-dark .cm-em {color: #c678dd;font-style: italic;}
//.cm-s-one-dark .cm-header .cm-em {color: #c678dd;font-style: italic;}
//.cm-s-one-dark .cm-tag {color: #e06c75;}
//.cm-s-one-dark .cm-attribute {color: #d19a66;}
//.cm-s-one-dark .cm-link {color: #98c379;border-bottom: solid 1px #98c379;}
//.cm-s-one-dark .cm-builtin {color: #e06c75;}
//.cm-s-one-dark .cm-keyword {color: #c678dd;}
//.cm-s-one-dark .cm-def {color: #e5c07b;} /* original:  #d19a66; */
//.cm-s-one-dark .cm-atom {color: #d19a66;}
//.cm-s-one-dark .cm-number {color: #d19a66;}
//.cm-s-one-dark .cm-property {color: #56b6c2;} /* original: #abb2bf */
//.cm-s-one-dark .cm-qualifier {color: #d19a66;}
//.cm-s-one-dark .cm-variable {color: #e06c75;}
//.cm-s-one-dark .cm-string {color: #98c379;}
//.cm-s-one-dark .cm-punctuation {color: #abb2bf;}
//.cm-s-one-dark .cm-operator {color: #56b6c2;} /* original: #abb2bf */
//.cm-s-one-dark .cm-meta {color: #abb2bf;}
//.cm-s-one-dark .cm-bracket {color: #abb2bf;}
//.cm-s-one-dark .cm-comment {color: #5c6370;font-style: italic;}
//.cm-s-one-dark .cm-error {color: #e06c75;}
///* css syntax corrections */
//.cm-s-one-dark .cm-m-css.cm-variable {color: #828997;}
//.cm-s-one-dark .cm-m-css.cm-property  {color: #abb2bf;}
//.cm-s-one-dark .cm-m-css.cm-atom  {color: #56b6c2;}
//.cm-s-one-dark .cm-m-css.cm-builtin {color: #56b6c2;}
///* lua syntax corrections */
//.cm-s-one-dark .cm-m-lua.cm-variable {color: #56b6c2;}
//
theme.textLight = theme.foreground;
theme.configuratorHeaderBackground = theme.background;
theme.sectionHeaderBackground = theme.background;
theme.sectionBodyBackground = theme.background;

export const oneDark = theme;
