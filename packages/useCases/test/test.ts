import * as assert from 'assert';
import { i18n } from 'datavis-tech-i18n';

import {
  CreateVisualization,
  CreateVisualizationRequestModel,
  CreateVisualizationResponseModel,
  GetVisualization,
  GetVisualizationRequestModel,
  GetVisualizationResponseModel,
  SaveVisualization,
  SaveVisualizationRequestModel,
  SaveVisualizationResponseModel,
  VisualizationGateway
} from '../src/index';

const visualizationGateway = {};

describe('Use Cases', () => {

  describe('Create Visualization', () => {
    const createVisualization = new CreateVisualization({ visualizationGateway });
    it('should error if no owner specified.', done => {
      const requestModel: CreateVisualizationRequestModel = { owner: null };
      createVisualization.execute(requestModel).catch(error => {
        assert.equal(error.message, i18n('errorNoOwner'))
        done();
      });
    });
    // TODO test success case
  });

  describe('Get Visualization', () => {
    const getVisualization = new GetVisualization({ visualizationGateway });
    it('should error if no id specified.', done => {
      const requestModel: GetVisualizationRequestModel = { id: null };
      getVisualization.execute(requestModel).catch(error => {
        assert.equal(error.message, i18n('errorNoId'))
        done();
      });
    });
    // TODO test success case
  });

  describe('Save Visualization', () => {
    let invocations = 0;
    const visualizationGateway = {
      saveVisualization: async () => {
        invocations++;
        return { status: 'success' };
      }
    };
    const saveVisualization = new SaveVisualization({ visualizationGateway });

    it('should invoke saveVisualization in gateway.', async () => {
      const requestModel = {
        visualization: {
          info: {
            owner: '123'
          }
        },
        user: {
          id: '123'
        }
      };
      const responseModel = await saveVisualization.execute(requestModel);
      assert.equal(invocations, 1);
      assert.equal(responseModel.status, 'success');
    });

    it('should error if user does not match owner.', done => {
      let invocations = 0;
      const requestModel = {
        visualization: {
          info: {
            owner: '123'
          }
        },
        user: {
          id: '234'
        }
      };
      saveVisualization.execute(requestModel)
        .catch(error => {
          assert.equal(invocations, 0);
          assert.equal(error.message, 'You must be the owner of the document in order to save it.');
        });
    });
  });
});
