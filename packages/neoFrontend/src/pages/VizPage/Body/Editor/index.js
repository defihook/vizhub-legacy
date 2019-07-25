import React, { useContext } from 'react';
import { URLStateContext } from '../../URLStateContext';
import { expandEditor } from '../../mobileMods';
import { Sidebar } from './styles';
import { Section } from './Section';
import { FilesSection } from './FilesSection';
import { CodeEditor } from './CodeEditor';

export const Editor = () => {
  const { showEditor } = useContext(URLStateContext);

  return (
    <>
      {showEditor ? (
        <Sidebar expand={expandEditor(showEditor)}>
          <Section title="visual editor" id="visual" />
          <FilesSection />
        </Sidebar>
      ) : null}
      <CodeEditor />
    </>
  );
};
