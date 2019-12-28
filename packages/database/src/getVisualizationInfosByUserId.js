import { i18n } from 'vizhub-i18n';
import { VisualizationInfo, VISUALIZATION_TYPE } from 'vizhub-entities';
import { DOCUMENT_INFO } from './collectionName';
import { fetchShareDBQuery } from './fetchShareDBQuery';

export const getVisualizationInfosByUserId = connection => async (
  owner,
  authenticatedUser
) => {
  const mongoQuery = { owner, documentType: VISUALIZATION_TYPE };

  // Show private visualizations if profile owner is currently authenticated.
  if (owner !== authenticatedUser) {
    mongoQuery.privacy = { $ne: 'private' };
  }

  const results = await fetchShareDBQuery(
    DOCUMENT_INFO,
    mongoQuery,
    connection
  );
  // TODO sort by most recently edited, like in home page
  // TODO pagination for profile page, like in home page
  return results
    .map(shareDBDoc => new VisualizationInfo(shareDBDoc.data))
    .reverse(); // Show most recent first
};
