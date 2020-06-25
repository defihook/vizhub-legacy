import { VisualizationInfo, VISUALIZATION_TYPE } from 'vizhub-entities';
import { DOCUMENT_INFO } from './collectionName';
import { fetchShareDBQuery } from './fetchShareDBQuery';

export const getAllVisualizationInfos = (connection) => async () => {
  const mongoQuery = {
    documentType: VISUALIZATION_TYPE,
  };
  const results = await fetchShareDBQuery(
    DOCUMENT_INFO,
    mongoQuery,
    connection
  );
  return results

    // Guard against oddly shaped documents of mysterious origin
    // that are present in the production database, for example:
    // data: { imagesUpdatedTimestamp: 1593086383 }
    // Possibly these are deleted docs that the image generation
    // service attempted to generate images for in the past.
    .filter(shareDBDoc => shareDBDoc.data && shareDBDoc.data.id)

    .map((shareDBDoc) => new VisualizationInfo(shareDBDoc.data));
};
