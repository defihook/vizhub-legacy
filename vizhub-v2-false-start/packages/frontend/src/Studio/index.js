import React from 'react';
import { LoadingScreen } from '../LoadingScreen';
import {
  PreferencesProvider,
  StudioDataProvider,
  URLStateProvider
} from '../contexts';
import { StudioBody } from './StudioBody';

export const Studio = () => (
  <StudioDataProvider fallback={<LoadingScreen />}>
    <URLStateProvider>
      <PreferencesProvider>
        <StudioBody />
      </PreferencesProvider>
    </URLStateProvider>
  </StudioDataProvider>
);
