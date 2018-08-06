import { uiRedux } from 'vizhub-ui';
import { combineEpics } from 'redux-observable';
import { saveEpic } from './saveEpic';
import { startBuildEpic } from './startBuildEpic';
import { buildEpic } from './buildEpic';
import { runBuildEpic } from './runBuildEpic';
import { runNonJSEpic } from './runNonJS';
import { forkEpic } from './forkEpic';

const {
  epics: {
    autoSaveEpic,
    promptForNewFileNameEpic,
    promptForRenameEpic,
    confirmDeleteEpic
  }
} = uiRedux;

export const rootEpic = combineEpics(
  startBuildEpic,
  buildEpic,
  runBuildEpic,
  runNonJSEpic,
  autoSaveEpic,
  saveEpic,
  promptForNewFileNameEpic,
  promptForRenameEpic,
  confirmDeleteEpic,
  forkEpic
);
