import React, {
  useMemo,
  useContext,
  useEffect,
  useRef,
  useCallback
} from 'react';
import { VizContext } from '../../../../../VizContext';
import { getVizFile, getVizFileIndex } from '../../../../../../../accessors';
import { useValue } from '../../../../../../../useValue';
import { Wrapper } from './styles';
import { RealtimeModulesContext } from '../../../../../RealtimeModulesContext';
import { generateFileChangeOp } from '../generateFileChangeOp';

export const CodeAreaTextarea = ({ activeFile }) => {
  const { viz$, submitVizContentOp, vizContentOp$ } = useContext(VizContext);

  const fileIndex = useValue(
    viz$,
    useCallback(getVizFileIndex(activeFile), [activeFile])
  );

  const path = useMemo(() => ['files', fileIndex, 'text'], [fileIndex]);

  const allowEditing = submitVizContentOp ? true : false;
  const realtimeModules = useContext(RealtimeModulesContext);

  const onTextChange = useCallback(
    event => {
      const newText = event.target.value;
      const oldText = getVizFile(fileIndex)(viz$.getValue()).text;
      submitVizContentOp(
        generateFileChangeOp(fileIndex, oldText, newText, realtimeModules)
      );
    },
    [viz$, fileIndex, submitVizContentOp, realtimeModules]
  );

  const ref = useRef();

  // TODO submit presence
  // onSelect={updateSelection}
  //const updateSelection = () => {
  //  const { selectionStart, selectionEnd } = ref.current;
  //  console.log({selectionStart, selectionEnd});
  //};

  useEffect(() => {
    if (!realtimeModules) {
      return;
    }
    const { json0 } = realtimeModules;
    const textarea = ref.current;

    // Initialize text.
    textarea.value = getVizFile(fileIndex)(viz$.getValue()).text;

    // Subscribe to changes.
    const subscription = vizContentOp$.subscribe(
      ({ previousContent, nextContent, op, originatedLocally }) => {
        if (!originatedLocally) {
          op.forEach(c => {
            if (json0.canOpAffectPath(c, path)) {
              const i = c.p[c.p.length - 1];
              if (c.si) {
                textarea.setRangeText(c.si, i, i);
              } else if (c.sd) {
                textarea.setRangeText('', i, i + c.sd.length);
              }
            }
          });
        }
      }
    );
    return () => {
      subscription.unsubscribe();
    };
  }, [viz$, ref, vizContentOp$, realtimeModules, path, fileIndex]);

  // Manual test for cursor transform.
  useEffect(() => {
    if (!submitVizContentOp) {
      return;
    }
    document.addEventListener('keydown', e => {
      if (e.altKey && e.code === 'KeyD') {
        setInterval(() => {
          submitVizContentOp({ si: 'e', p: ['files', fileIndex, 'text', 5] });
        }, 1000);
      }
    });
  }, [submitVizContentOp, fileIndex]);

  return (
    <Wrapper
      className="test-codearea-textarea"
      ref={ref}
      onChange={onTextChange}
      readOnly={!allowEditing}
    />
  );
};
