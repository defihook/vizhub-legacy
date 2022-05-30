import * as assert from 'assert';
import { describe, it } from 'mocha';
import { build } from '../src/build';
import * as expectedValues from './expectedValues';
import puppeteer from 'puppeteer';

describe('Build', () => {
  it('should build a single file as UMD', async () => {
    assert.deepEqual(
      await build({
        files: {
          'index.js': 'export const main = () => console.log("Hello");',
        },
      }),
      expectedValues.singleFileUMD
    );
  });

  it('should handle modules', async () => {
    assert.deepEqual(
      await build({
        files: {
          'index.js': `
            import { add } from './add';
            export const main = () => console.log(add(1, 2));
          `,
          'add.js': 'export const add = (a, b) => a + b;',
        },
      }),
      expectedValues.modules
    );
  });
});

// Puppeteer-based tests that instantiate the runtime in a Chrome iframe.
// Note that there are several levels of nesting here:
//  * `page` is the headless Chrome page (akin to the browser page running the VizHub app)
//  * `#runner-iframe` is the iframe within that page (akin to the running viz)
describe('run', () => {
  let browser;
  let page;

  before(async () => {
    browser = await puppeteer.launch();
  });

  after(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();

    // For debugging while writing tests.
    page.on('console', (msg) => console.log(msg.text()));
  });

  afterEach(() => {
    page.close();
  });

  it('sanity check', async () => {
    await page.addScriptTag({
      path: './build/vizhub-runtime.js',
    });
    await page.evaluate(async () => {
      const iframe = document.createElement('iframe');
      iframe.id = 'runner-iframe';
      document.body.appendChild(iframe);
      await VizHubRuntime.Runner(iframe);
    });

    const iframe = page
      .frames()
      .find((frame) => frame.name() === 'runner-iframe');

    assert.equal(iframe.name(), 'runner-iframe');
  });

  it('should generate srcdoc', async () => {
    await page.addScriptTag({
      path: './build/vizhub-runtime.js',
    });
    const srcdoc = await page.evaluate(async () => {
      const { code } = await VizHubRuntime.build({
        files: {
          'index.js': `
            export const main = (node, configuration) => {
              parent.postMessage({configuration}, "*");
            };
          `,
        },
      });
      const configuration = { foo: 'bar' };

      return VizHubRuntime.generateSrcdoc({
        code,
        configuration,
      });
    });

    assert.deepEqual(srcdoc, expectedValues.srcdoc);
  });

  it('should execute initial srcdoc', async () => {
    await page.addScriptTag({
      path: './build/vizhub-runtime.js',
    });
    const result = await page.evaluate(async () => {
      const iframe = document.createElement('iframe');
      //const runner = await VizHubRuntime.Runner(iframe);
      //runner.run();

      // TODO remove these from this test, do a separate dedicated test for `cdn`
      const dependencies = {
        //d3: '7.4.4',
        //react: '18.1.0',
        //'react-dom': '18.1.0',
      };
      const libraries = {
        //d3: {
        //  global: 'd3',
        //  path: '/dist/d3.min.js',
        //},
        //react: {
        //  global: 'React',
        //  path: '/umd/react.production.min.js',
        //},
        //'react-dom': {
        //  global: 'ReactDOM',
        //  path: '/umd/react-dom.production.min.js',
        //},
      };
      // TODO test sourcemap support
      const { code } = await VizHubRuntime.build({
        files: {
          'index.js': `
            export const main = (node, configuration) => {
              parent.postMessage({configuration}, "*");
            };
          `,
        },
      });
      const configuration = { foo: 'bar' };

      const data = await new Promise((resolve) => {
        // TODO validate it's coming from the right place
        window.addEventListener('message', (event) => {
          resolve(event.data);
        });
        iframe.srcdoc = VizHubRuntime.generateSrcdoc({
          dependencies,
          libraries,
          code,
          configuration,
        });
        document.body.appendChild(iframe);
      });
      return data;
    });

    // Tests round trip of config through built app, and that libs are coming from CDN.
    assert.deepEqual(result, { configuration: { foo: 'bar' } });
  });
});
// TODO test that it generates the HTML for use in initializing the iframe, and it runs.

// TODO test that it injects new JS into the existing iframe
// TODO test that it generates the HTML with configuration for use in initializing the iframe.
// TODO test that it injects new configuration into the existing iframe

// it('should run JS', async () => {
//   await page.evaluate(() => {
//     window.runner.run({
//       'index.js': "export const main = () => { window.foo = 'bar'; }",
//     });
//   });
//   const foo = await frame.evaluate(() => window.foo);
//   assert.equal(foo, 'bar');
// });
//
// it('should fail silently if main is undefined', async () => {
//   await page.evaluate(() => {
//     window.runner.run({
//       'index.js': `window.foo = 'bar'`,
//     });
//   });
//   const foo = await frame.evaluate(() => window.foo);
//   assert.equal(foo, 'bar');
// });
//
// it('should set state from outside', async () => {
//   await page.evaluate(() => {
//     window.runner.setState('outside');
//     window.runner.run({
//       'index.js': 'export const main = (state) => { window.foo = state; }',
//     });
//   });
//   const foo = await frame.evaluate(() => window.foo);
//   assert.equal(foo, 'outside');
// });
//
// it('should set state from inside', async () => {
//   await page.evaluate(() => {
//     window.runner.run({
//       'index.js': `
//         export const main = (state, setState) => {
//           setState('inside');
//           window.foo = state;
//         }
//       `,
//     });
//   });
//   // Wait for inner requestAnimationFrame.
//   // TODO wait for message that state was set instead of this hack.
//   await new Promise((resolve) => setTimeout(resolve, 100));
//
//   const foo = await frame.evaluate(() => window.foo);
//   assert.equal(foo, 'inside');
// });
//
// it('should notify of state changes from inside', async () => {
//   await page.evaluate(() => {
//     window.runner.onstatechange = (state) => {
//       window.newState = state;
//     };
//     window.runner.run({
//       'index.js': `
//         export const main = (state, setState) => {
//           setState('new from inside');
//         }
//       `,
//     });
//   });
//   // Wait for inner requestAnimationFrame.
//   await new Promise((resolve) => setTimeout(resolve, 100));
//
//   const newState = await page.evaluate(() => window.newState);
//   assert.equal(newState, 'new from inside');
// });
//
// it('should notify of state changes from outside', async () => {
//   await page.evaluate(() => {
//     window.newState = 'not set';
//     window.runner.onstatechange = (state) => {
//       window.newState = state;
//     };
//     window.runner.run({
//       'index.js': 'export const main = () => {}',
//     });
//     window.runner.setState('new from outside');
//   });
//
//   // Wait for inner requestAnimationFrame.
//   await new Promise((resolve) => setTimeout(resolve, 100));
//
//   const newState = await page.evaluate(() => window.newState);
//   assert.equal(newState, 'new from outside');
// });
