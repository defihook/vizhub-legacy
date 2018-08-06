import { Visualization, UserId, DocumentId } from 'datavis-tech-entities';
import { i18n } from 'datavis-tech-i18n';
import { Interactor, RequestModel, ResponseModel } from '../interactor';
import { VisualizationGateway } from '../gatewayInterfaces/visualizationGateway'
import { generateId } from '../utils/generateId';

export interface ForkVisualizationRequestModel extends RequestModel {
  visualization: Visualization,
  owner: UserId
}

export interface ForkVisualizationResponseModel extends ResponseModel {
  id: DocumentId
}

export class ForkVisualization implements Interactor {
  visualizationGateway: VisualizationGateway;

  constructor({ visualizationGateway }) {
    this.visualizationGateway = visualizationGateway;
  }

  async execute(requestModel: ForkVisualizationRequestModel) {
    const { visualization, owner } = requestModel;

    if (!owner) {
      throw new Error(i18n('errorNoOwner'))
    }

    const { id } = await this.visualizationGateway.createVisualization({
      owner,
      id: generateId(),
      title: visualization.info.title,
      slug: undefined,
      description: visualization.info.description,
      files: visualization.content.files,
      forkedFrom: visualization.id
    })

    return { id, userName: owner };
  }
}
