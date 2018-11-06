import { DocumentInfo } from './documentInfo';
import { DocumentId } from './documentId';
import { VISUALIZATION_TYPE } from './documentTypes';

export class VisualizationInfo extends DocumentInfo {

  // The visualization that this visualization was forked from.
  forkedFrom: DocumentId | undefined;

  height: number;

  // The Unix timestamp at which the thumbnail and preview
  // images for this visualization were last updated.
  // A value of undefined means there were never any images generated.
  imagesUpdatedTimestamp: number | undefined;

  constructor(data) {
    super({
      documentType: VISUALIZATION_TYPE,
      id: data.id,
      owner: data.owner,
      title: data.title,
      slug: data.slug,
      description: data.description,
      createdTimestamp: data.createdTimestamp,
      lastUpdatedTimestamp: data.lastUpdatedTimestamp
    });

    this.forkedFrom = data.forkedFrom;
    this.height = data.height;
    this.imagesUpdatedTimestamp = data.imagesUpdatedTimestamp;
  }
}
