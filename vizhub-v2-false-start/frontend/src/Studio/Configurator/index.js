import React, { useContext } from 'react';
import { URLStateContext } from '../../urlState';
import { ArrowBackSVG } from '../../icons';
import {
  Wrapper,
  File,
  Item,
  ItemIcon,
  Header,
  HeaderIcon,
  HeaderTitle,
  Widget,
  WidgetTitle,
  WidgetValue
} from './styles';
import { CheckBoxSVG } from '../../icons';
import { useCodeMirrorDynamicImport } from '../Editor/CodeMirror/useCodeMirrorDynamicImport';
import { Section } from './Section';
import { usePreloadFont } from './usePreloadFont';
import { Menu } from './Menu';

const files = ['index.html', 'index.js', 'styles.css'];

const themeOptions = [
  { title: 'Ubuntu', id: 'ubuntu' },
  { title: 'One Dark', id: 'oneDark' }
];

const fontOptions = ['Ubuntu Mono', 'Fira Code', 'Deja Vu Sans Mono'];

const ligaturesOptions = [
  { title: 'None', id: 'none' },
  { title: 'Arrows', id: 'arrows' },
  { title: 'All', id: 'all' }
];

export const Configurator = ({
  colorTheme,
  setColorTheme,
  preloadFontFamily,
  font,
  setFont,
  ligatures,
  setLigatures
}) => {
  const { file: activeFile, selectFile, toggleConfigurator } = useContext(
    URLStateContext
  );

  // Preload code font and CodeMirror JS,
  // so the user doesn't need to wait for these to load when they open a file.
  usePreloadFont(preloadFontFamily);
  useCodeMirrorDynamicImport();

  return (
    <Wrapper>
      <Header onClick={toggleConfigurator}>
        <HeaderIcon>
          <ArrowBackSVG fill={'white'} />
        </HeaderIcon>
        <HeaderTitle>Configurator</HeaderTitle>
      </Header>

      <Section title="State" id="state">
        <Widget>
          <WidgetTitle>Color</WidgetTitle>
          <WidgetValue fill="#e66465" />
        </Widget>
        <Widget isLast={true}>
          <WidgetTitle>Color</WidgetTitle>
          <WidgetValue fill="#e66465" />
        </Widget>
      </Section>

      <Section title="Files" id="files">
        {files.map(file => (
          <File
            key={file}
            onClick={selectFile(file)}
            isActive={file === activeFile}
          >
            {file}
          </File>
        ))}
      </Section>

      <Section title="Settings" id="settings">
        <Item>Auto-resize</Item>
        <Item>Height</Item>
        <Item>Background color</Item>
        <Item>Privacy</Item>
        <Item>Collaborators</Item>
      </Section>

      <Section title="Preferences" id="preferences">
        <Menu
          title="Color Theme"
          options={themeOptions}
          activeOption={colorTheme}
          setActiveOption={setColorTheme}
        />
        <Menu
          title="Font"
          options={fontOptions}
          activeOption={font}
          setActiveOption={setFont}
        />
        <Menu
          title="Ligatures"
          options={ligaturesOptions}
          activeOption={ligatures}
          setActiveOption={setLigatures}
        />
        <Item>Font Size</Item>
        <Item>
          <ItemIcon>
            <CheckBoxSVG checked={true} />
          </ItemIcon>
          Grayscale
        </Item>
        <Item>
          <ItemIcon>
            <CheckBoxSVG checked={true} />
          </ItemIcon>
          Auto run
        </Item>
        <Item>
          <ItemIcon>
            <CheckBoxSVG checked={true} />
          </ItemIcon>
          Auto format
        </Item>
        <Item>
          <ItemIcon>
            <CheckBoxSVG checked={true} />
          </ItemIcon>
          Vim mode
        </Item>
      </Section>
    </Wrapper>
  );
};
