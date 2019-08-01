import { useReducer, useEffect, useCallback, useContext } from 'react';
import { RealtimeModulesContext } from '../RealtimeModulesContext';
import { useVizContentDoc } from './useVizContentDoc';
import { generateFileChangeOp } from './generateFileChangeOp';
import { reducer } from './reducer';

export const useViz = initialViz => {
  const realtimeModules = useContext(RealtimeModulesContext);

  const vizContentDoc = useVizContentDoc(realtimeModules, initialViz.id);

  const onFileChange = name => newText => {
    const files = vizContentDoc.data.files;
    const op = generateFileChangeOp(files, name, newText, realtimeModules);
    vizContentDoc.submitOp(op);
  };

  // Display initial viz until realtime connection has been established.
  const [viz, dispatch] = useReducer(reducer, initialViz);

  const dispatchContentChange = useCallback(() => {
    dispatch({ type: 'contentChange', content: vizContentDoc.data });
  }, [dispatch, vizContentDoc]);

  useEffect(() => {
    if (!vizContentDoc) {
      return;
    }

    // Handle the case that the initial viz and the
    // vizContentDoc content are different.
    dispatchContentChange();

    // Update on each change.
    vizContentDoc.on('op', dispatchContentChange);

    return () => {
      console.log('unsubscribing from ops');
      vizContentDoc.off('op', dispatchContentChange);
    };
  }, [vizContentDoc, dispatchContentChange]);


  return { viz, onFileChange, vizContentDoc };
};
