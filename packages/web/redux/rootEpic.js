import {
  actionTypes as uiActionTypes,
  actionCreators as uiActionCreators,
  selectors as uiSelectors
} from 'vizhub-ui';

import  { bundle } from 'datavis-tech-presenters';

import { combineEpics } from 'redux-observable';
import { from } from 'rxjs';
import { debounceTime, delay, mapTo, map, switchMap } from 'rxjs/operators';

import { START_BUILD, BUILD_FINISHED } from './actionTypes';
import { startBuild, buildFinished } from './actionCreators';

const { CHANGE_FILE_TEXT } = uiActionTypes;
const { runFiles } = uiActionCreators;
const { getFiles } = uiSelectors;

const startBuildEpic = action$ =>
  action$.ofType(CHANGE_FILE_TEXT).pipe(
    debounceTime(500),
    mapTo(startBuild())
  );

const buildEpic = (action$, state$) =>
  action$.ofType(START_BUILD).pipe(
    switchMap(() => from(bundle(getFiles(state$.value)))),
    map(buildFinished)
  );

const runBuildEpic = action$ =>
  action$.ofType(BUILD_FINISHED).pipe(
    mapTo(runFiles())
  );

export const rootEpic = combineEpics(
  startBuildEpic,
  buildEpic,
  runBuildEpic
);
