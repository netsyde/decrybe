import React, { useState, useRef, useEffect } from 'react';
import { observer } from 'mobx-react';
import clsx from 'clsx';
import {
  Editor,
  EditorState,
  RichUtils,
  Modifier,
  getDefaultKeyBinding,
  convertToRaw,
  convertFromRaw
} from 'draft-js';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Divider } from '@material-ui/core';

import { EditorToolbar } from './components';
import { blockRenderMap } from './utils';

import { mdToDraftjs, draftjsToMd } from 'draftjs-md-converter';
import { setTimeout } from 'timers';

const useStyles = makeStyles(theme => ({
  root: {},
  editorContainer: {
    padding: theme.spacing(2),
    minHeight: 400,
    '& .public-DraftEditorPlaceholder-root': {
      ...theme.typography.body2
    },
    '& .public-DraftEditorPlaceholder-hasFocus': {
      display: 'none'
    },
    '& .public-DraftEditor-content': {
      '& p': {
        ...theme.typography.body1
      },
      '& h1': {
        ...theme.typography.h1
      },
      '& h2': {
        ...theme.typography.h2
      },
      '& h3': {
        ...theme.typography.h3
      },
      '& h4': {
        ...theme.typography.h4
      },
      '& h5': {
        ...theme.typography.h5
      },
      '& h6': {
        ...theme.typography.h6
      },
      '& blockquote': {
        ...theme.typography.subtitle1
      },
      '& ul': {
        ...theme.typography.body1,
        marginLeft: theme.spacing(4)
      },
      '& ol': {
        ...theme.typography.body1,
        marginLeft: theme.spacing(4)
      },
      '& pre': {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2
      }
    }
  },
  textAlignLeft: {
    textAlign: 'left'
  },
  textAlignCenter: {
    textAlign: 'center'
  },
  textAlignRight: {
    textAlign: 'right'
  },
  textAlignJustify: {
    textAlign: 'justify'
  }
}));

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

const RichEditor = observer((props) => {
  const { className, store, rootStore, ...rest } = props;

  const classes = useStyles(1);

  const editorRef = useRef(null);

  const [editorState, setEditorState] = useState(
    //EditorState.createWithContent(convertFromRaw(mdToDraftjs(store.getDescription)))
    EditorState.createEmpty()
  );

  useEffect(() => {
    if (store.getDescription.length > 0) {
      console.log('DEBUG: Editor ready')
      setEditorState(EditorState.createWithContent(convertFromRaw(mdToDraftjs(store.getDescription))))
    } else {
      console.log('DEBUG: Waiting editor')
      setTimeout(() => {
        setEditorState(EditorState.createWithContent(convertFromRaw(mdToDraftjs(store.getDescription))))
      }, 1000);
    }
  }, [])

  const handleContainerClick = () => {
    editorRef.current.focus();
  };
  const handleToolbarToggle = (type, value) => {
    if (type === 'blockType') {
      if (['left', 'center', 'right', 'justify'].includes(value)) {
        const newContentState = Modifier.setBlockData(
          editorState.getCurrentContent(),
          editorState.getSelection(),
          { 'text-align': value }
        );

        const newEditorState = EditorState.push(
          editorState,
          newContentState,
          'change-block-data'
        );

        setEditorState(newEditorState);
        return;
      }

      setEditorState(RichUtils.toggleBlockType(editorState, value));
    } else {
      setEditorState(RichUtils.toggleInlineStyle(editorState, value));
    }
  };

  const handleEditorChange = editorState => {
    let markdown = draftjsToMd(
      convertToRaw(editorState.getCurrentContent())
    )

    //console.log(JSON.stringify(markdown))

    store.setDescription(markdown)
    setEditorState(editorState);
  };

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      handleEditorChange(newState);
      return true;
    }

    return false;
  };

  const mapKeyToEditorCommand = event => {
    if (event.keyCode === 9) {
      const newEditorState = RichUtils.onTab(event, editorState, 4);

      if (newEditorState !== editorState) {
        handleEditorChange(newEditorState);
      }

      return;
    }

    return getDefaultKeyBinding(event);
  };

  function blockStyleFn(contentBlock) {
    const textAlign = contentBlock.getData().get('text-align');

    if (textAlign) {
      const className = `textAlign${capitalize(textAlign)}`;

      return classes[className];
    }

    return '';
  }
  return (
    <Paper
      {...rest}
      className={clsx(classes.root, className)}
    >
      <EditorToolbar
        editorState={editorState}
        onToggle={handleToolbarToggle}
      />
      <Divider />
      <div
        className={classes.editorContainer}
        onClick={handleContainerClick}
      >
        <Editor
          blockRenderMap={blockRenderMap}
          blockStyleFn={blockStyleFn}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
          onChange={handleEditorChange}
          placeholder={props.placeholder}
          ref={editorRef}
          spellCheck
        />
      </div>
    </Paper>
  );
});

export default RichEditor;
