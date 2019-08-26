import React, {
  useContext,
  useRef,
  useState,
  useCallback,
  useEffect
} from 'react';
import PerfectScrollbar from 'perfect-scrollbar';

import { getVizHeight } from '../../../../accessors';
import { useValue } from '../../../../useValue';
import { Centering } from '../../../styles';
import { VizPageDataContext } from '../../VizPageDataContext';
import { VizContext } from '../../VizContext';
import { useListener } from '../useListener';
import { Wrapper, Scroller, ViewerContent, HorizontalRule } from './styles';
import { VizFrame } from './VizFrame';
import { TitleBar } from './TitleBar';
import { DescriptionSection } from './DescriptionSection';
import { Resizer } from './Resizer';
import { GlobalScrollbarStyle } from './GlobalScrollbarStyle';

export const Viewer = () => {
  const {
    ownerUser,
    forkedFromVisualizationInfo,
    forkedFromVisualizationOwnerUserName
  } = useContext(VizPageDataContext);

  const { viz$ } = useContext(VizContext);
  const viz = useValue(viz$);

  const vizHeight = getVizHeight(viz);

  const scrollerRef = useRef();
  const perfectScrollbarRef = useRef();

  useEffect(() => {
    perfectScrollbarRef.current = new PerfectScrollbar(scrollerRef.current);
    return () => {
      perfectScrollbarRef.current.destroy();
      perfectScrollbarRef.current = undefined;
    };
  }, []);

  const updateScrollbar = useCallback(() => {
    if (perfectScrollbarRef.current) {
      perfectScrollbarRef.current.update();
    }
  }, []);

  useListener('resize', updateScrollbar, window);

  // Breakpoints for responsive layout.
  const [size, setSize] = useState();
  const setWidth = useCallback(
    width => {
      setSize(width < 500 ? 'small' : width < 700 ? 'medium' : 'large');
      updateScrollbar();
    },
    [setSize, updateScrollbar]
  );

  return (
    <Wrapper className="test-viewer">
      <Resizer />
      <GlobalScrollbarStyle />
      <Scroller ref={scrollerRef}>
        <Centering>
          <ViewerContent>
            <VizFrame
              vizHeight={vizHeight}
              scrollerRef={scrollerRef}
              setWidth={setWidth}
            />
            <TitleBar title={viz.info.title} />
            <HorizontalRule />
            <DescriptionSection
              viz={viz}
              ownerUser={ownerUser}
              forkedFromVisualizationInfo={forkedFromVisualizationInfo}
              forkedFromVisualizationOwnerUserName={
                forkedFromVisualizationOwnerUserName
              }
              size={size}
            />
            <HorizontalRule />
          </ViewerContent>
        </Centering>
      </Scroller>
    </Wrapper>
  );
};
