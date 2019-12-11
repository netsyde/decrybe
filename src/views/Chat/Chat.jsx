import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { observer, inject } from 'mobx-react';
import useRouter from '../../utils/useRouter';
import { Page } from '../../components';
import {
  ConversationList,
  ConversationDetails,
  ConversationPlaceholder
} from './components';
import Error401 from '../Error401'
import { CustomSnackbar } from '../../components'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    //cursor: 'pointer',
    display: 'flex',
    overflow: 'hidden',
    '@media (max-width: 863px)': {
      '& $conversationList, & $conversationDetails': {
        flexBasis: '100%',
        width: '100%',
        maxWidth: 'none',
        flexShrink: '0',
        transform: 'translateX(0)'
      }
    }
  },
  openConversion: {
    '@media (max-width: 863px)': {
      '& $conversationList, & $conversationDetails': {
        transform: 'translateX(-100%)'
      }
    }
  },
  conversationList: {
    width: 300,
    flexShrink: 0,
    '@media (min-width: 864px)': {
      borderRight: `1px solid ${theme.palette.divider}`
    }
  },
  conversationDetails: {
    flexGrow: 1
  },
  conversationPlaceholder: {
    flexGrow: 1
  }
}));

const Chat = inject('rootStore')(observer(({ rootStore }) => {
  const classes = useStyles(1);
  const router = useRouter();
  const [conversations, setConversations] = useState([]);

  let selectedConversation;

  if (router.match.params.id) {
    selectedConversation = rootStore.user.getConversations.find(
      c => c.uid === router.match.params.id
    );
  }

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("")

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const createSnackbar = (type, message) => {
    setSnackbarMessage(message)
    setSnackbarType(type)
    setOpenSnackbar(true);
  }

  if (rootStore.user.isUserLogin && rootStore.user.isUserReg) {
    return (
      <Page
        className={clsx({
          [classes.root]: true,
          [classes.openConversion]: selectedConversation
        })}
        title="Chat"
      >
        <ConversationList
          className={classes.conversationList}
          conversations={rootStore.user.getConversations}
        />
        {selectedConversation ? (
          <ConversationDetails
            className={classes.conversationDetails}
            conversation={selectedConversation}
            rootStore={rootStore}
          />
        ) : (
          <ConversationPlaceholder rootStore={rootStore} className={classes.conversationPlaceholder} />
        )}
        <CustomSnackbar
          onClose={handleSnackbarClose}
          open={openSnackbar}
          message={snackbarMessage}
          type={snackbarType}
      />
      </Page>
    );
  } else {
    return (
      <Error401 />
    )
  }
}));

export default Chat;
