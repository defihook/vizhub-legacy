import {
  UserId,
  DocumentId,
  File
} from 'datavis-tech-entities';

import {
  CreateVisualizationRequestModel,
  CreateVisualizationResponseModel,
  GetVisualizationRequestModel,
  GetVisualizationResponseModel,
  SaveVisualizationRequestModel,
  SaveVisualizationResponseModel
} from '../interactors';

export interface VisualizationGateway {
  createVisualization(options: {
    owner: UserId,
    id: DocumentId,
    title: string,
    slug: string | undefined,
    description: string,
    files: File[]
  }): Promise<CreateVisualizationResponseModel>;

  getVisualization(request: GetVisualizationRequestModel):
    Promise<GetVisualizationResponseModel>;

  saveVisualization(request: SaveVisualizationRequestModel):
    Promise<SaveVisualizationResponseModel>;
}
