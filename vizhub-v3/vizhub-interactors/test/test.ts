import * as assert from 'assert';
import { describe, it, beforeEach } from 'mocha';
import { Gateways } from '../src/Gateways';
import { MemoryGateways } from '../src/MemoryGateways';
import { ForkViz } from '../src/ForkViz';
import { VIZ_INFO_NOT_FOUND, VIZ_CONTENT_NOT_FOUND } from '../src/errors';
import { primordialViz, ts2, ts3, ts4 } from './fixtures';

describe('Gateways & Interactors', () => {
  let gateways: Gateways;

  beforeEach(async () => {
    gateways = MemoryGateways();
  });

  it('saveVizInfo & getVizInfo', async () => {
    const { saveVizInfo, getVizInfo } = gateways;
    const { vizInfo } = primordialViz;
    await saveVizInfo(vizInfo);
    assert.deepEqual(await getVizInfo(vizInfo.id), vizInfo);
  });

  it('saveVizContent & getVizContent', async () => {
    const { saveVizContent, getVizContent } = gateways;
    const { vizContent } = primordialViz;
    await saveVizContent(vizContent);
    assert.deepEqual(await getVizContent(vizContent.id), vizContent);
  });

  it('getVizContent error case VIZ_INFO_NOT_FOUND', () =>
    gateways.getVizInfo('unknown-id').then(
      () => Promise.reject(new Error('Expected error VIZ_INFO_NOT_FOUND.')),
      (error) => {
        assert.equal(error.name, 'VizHubError');
        assert.equal(error.code, VIZ_INFO_NOT_FOUND);
      }
    ));

  it('getVizContent error case VIZ_CONTENT_NOT_FOUND', () =>
    gateways.getVizContent('unknown-id').then(
      () => Promise.reject(new Error('Expected error VIZ_CONTENT_NOT_FOUND.')),
      (error) => {
        assert.equal(error.name, 'VizHubError');
        assert.equal(error.code, VIZ_CONTENT_NOT_FOUND);
      }
    ));

  it('deleteVizInfo', async () => {
    const { saveVizInfo, deleteVizInfo } = gateways;
    const { vizInfo } = primordialViz;
    await saveVizInfo(vizInfo);
    await deleteVizInfo(vizInfo.id);
    await gateways.getVizInfo(vizInfo.id).then(
      () => Promise.reject(new Error('Expected error VIZ_INFO_NOT_FOUND.')),
      (error) => {
        assert.equal(error.name, 'VizHubError');
        assert.equal(error.code, VIZ_INFO_NOT_FOUND);
      }
    );
  });

  it('deleteVizContent', async () => {
    const { saveVizContent, deleteVizContent } = gateways;
    const { vizContent } = primordialViz;
    await saveVizContent(vizContent);
    await deleteVizContent(vizContent.id);
    await gateways.getVizContent(vizContent.id).then(
      () => Promise.reject(new Error('Expected error VIZ_CONTENT_NOT_FOUND.')),
      (error) => {
        assert.equal(error.name, 'VizHubError');
        assert.equal(error.code, VIZ_CONTENT_NOT_FOUND);
      }
    );
  });

  it('ForkViz', async () => {
    const newVizId = 'viz2';
    const newOwner = 'user2';
    const forkedFrom = primordialViz.id;
    const timestamp = ts2;

    const { saveVizInfo, getVizInfo, saveVizContent, getVizContent } = gateways;
    const { vizContent, vizInfo } = primordialViz;
    await saveVizInfo(vizInfo);
    await saveVizContent(vizContent);

    const forkViz = ForkViz(gateways);

    await forkViz({ newVizId, newOwner, forkedFrom, timestamp });

    assert.deepEqual(await getVizInfo(newVizId), {
      ...vizInfo,
      id: newVizId,
      owner: newOwner,
      forkedFrom,
      createdTimestamp: timestamp,
      lastUpdatedTimestamp: timestamp,
    });

    assert.deepEqual(await getVizContent(newVizId), {
      ...vizContent,
      id: newVizId,
    });
  });

  it('forkViz error case VIZ_INFO_NOT_FOUND', () => {
    const forkViz = ForkViz(gateways);
    return forkViz({
      newVizId: 'viz2',
      newOwner: 'user2',
      forkedFrom: 'unknown-id',
      timestamp: ts2,
    }).then(
      () => Promise.reject(new Error('Expected error VIZ_INFO_NOT_FOUND.')),
      (error) => {
        assert.equal(error.name, 'VizHubError');
        assert.equal(error.code, VIZ_INFO_NOT_FOUND);
      }
    );
  });

  it('getForks', async () => {
    const { saveVizInfo, saveVizContent, getForks } = gateways;
    const forkViz = ForkViz(gateways);
    const { id, vizInfo, vizContent } = primordialViz;
    await saveVizInfo(vizInfo);
    await saveVizContent(vizContent);

    await forkViz({
      newVizId: 'viz2',
      newOwner: 'user2',
      forkedFrom: id,
      timestamp: ts2,
    });

    await forkViz({
      newVizId: 'viz3',
      newOwner: 'user2',
      forkedFrom: id,
      timestamp: ts3,
    });

    assert.deepEqual(
      new Set((await getForks(id)).map((fork) => fork.id)),
      new Set(['viz2', 'viz3'])
    );

    await forkViz({
      newVizId: 'viz4',
      newOwner: 'user2',
      forkedFrom: primordialViz.id,
      timestamp: ts4,
    });

    assert.deepEqual(
      new Set((await getForks(id)).map((fork) => fork.id)),
      new Set(['viz2', 'viz3', 'viz4'])
    );
  });
});
