import React from 'react';
import { VisualizationPreview } from '../../components/atoms/visualizationPreview';

export const BodyAuthenticated = ({onFromScratchClick, templates}) => {
  const fromScratchClick = e => {
    e.preventDefault();
    onFromScratchClick();
  };

  return false//process.env.NODE_ENV === 'development'
    ? (
      <a className='button test-from-scratch-button' href='#scratch' onClick={fromScratchClick}>
        Start from scratch
      </a>
    )
    : (
      <React.Fragment>
        <div>
          Create a visualization by forking one of these starter templates.
        </div>
        <div style={{ marginTop: '1.25rem' }} >
          <a className='button' href='https://vizhub.com/curran/86a75dc8bdbe4965ba353a79d4bd44c8'>
            Hello World
          </a>
          {
            templates.map(info =>
              <VisualizationPreview key={info.id} info={info} userName='curran'/>
            )
          }
        </div>
      </React.Fragment>
    );
};

export const BodyNotAuthenticated = () => (
  <div>You must first log in to create a visualization.</div>
);
