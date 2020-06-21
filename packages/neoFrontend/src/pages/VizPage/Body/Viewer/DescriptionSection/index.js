import React, { useMemo, useContext } from 'react';
import { format } from 'd3-format';
import { toDate } from 'vizhub-entities';
import { VizPageDataContext } from '../../../VizPageDataContext';
import {
  showCreatedDate,
  showVideoThumbnail,
} from '../../../../../featureFlags';
import {
  Wrapper,
  Left,
  Right,
  Authorship,
  AuthorshipMeta,
  Video,
  VideoThumbnail,
  Description,
  VizLink,
} from './styles';
import { Author } from '../../../../../Author';
import { responsiveYouTube } from './responsiveYouTube';
import { renderMarkdown } from './renderMarkdown';

const formatTimestamp = (timestamp) =>
  toDate(timestamp).toLocaleString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

const formatForksCount = format(',');

export const DescriptionSection = ({
  vizInfo,
  ownerUser,
  forkedFromVisualizationInfo,
  forkedFromVisualizationOwnerUserName,
  size,
}) => {
  const created = useMemo(() => formatTimestamp(vizInfo.createdTimestamp), [
    vizInfo.createdTimestamp,
  ]);

  // Forks count is only present in the initial payload from the API.
  // The field is not present in the ShareDB document,
  // so we need to access it like this.
  const vizPageData = useContext(VizPageDataContext);
  const forksCount = vizPageData.visualization.info.forksCount;

  const forksCountFormatted = useMemo(() => formatForksCount(forksCount), [
    forksCount,
  ]);

  const lastUpdated = useMemo(
    () => formatTimestamp(vizInfo.lastUpdatedTimestamp),
    [vizInfo.lastUpdatedTimestamp]
  );

  const description = vizInfo.description;
  const descriptionHTML = useMemo(
    () => responsiveYouTube(renderMarkdown(description)),
    [description]
  );

  return (
    <Wrapper size={size}>
      <Left>
        <Authorship size={size}>
          <Author ownerUser={ownerUser} />
          <AuthorshipMeta size={size}>
            <div>Last Edited {lastUpdated}</div>
            {forkedFromVisualizationInfo ? (
              <div>
                Forked from{' '}
                <VizLink
                  to={`/${forkedFromVisualizationOwnerUserName}/${forkedFromVisualizationInfo.id}`}
                >
                  {forkedFromVisualizationInfo.title}
                </VizLink>
                {showCreatedDate ? <> {created}</> : null}
              </div>
            ) : null}
            <div>
              {forksCountFormatted} fork{forksCount === 1 ? '' : 's'}
            </div>
          </AuthorshipMeta>
        </Authorship>
        <Description
          className="viz-viewer-description"
          size={size}
          dangerouslySetInnerHTML={{ __html: descriptionHTML }}
        />
      </Left>
      {showVideoThumbnail ? (
        <Right size={size}>
          <Video>
            <VideoThumbnail />
            Video title
          </Video>
        </Right>
      ) : null}
    </Wrapper>
  );
};
