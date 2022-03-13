export const external = [
  '@teamwork/websocket-json-stream',
  'assert',
  'diff-match-patch',
  'express',
  'http',
  'jsesc',
  'json0-ot-diff',
  'mocha',
  'ot-json1',
  'ot-text-unicode',
  'react',
  'react-bootstrap',
  'react-bootstrap/SSRProvider',
  'react-dom',
  'react-dom/server',
  'sharedb',
  'sharedb-client-browser',
  'sharedb-mingo-memory',
  'sharedb/lib/client',
//  'vizhub-ui',
  'ws'
];

export const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'sharedb/lib/client': 'ShareDBClient',
  'react-bootstrap': 'ReactBootstrap',
  //'vizhub-ui': 'VizHubUI',
};
