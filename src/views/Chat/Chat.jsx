import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

import useRouter from '../../utils/useRouter';
import { Page } from '../../components';
import {
  ConversationList,
  ConversationDetails,
  ConversationPlaceholder
} from './components';
const uuid = require('uuid/v4');
const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    cursor: 'pointer',
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
    //flexBasis: 300,
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

const Chat = () => {
  const classes = useStyles(1);
  const router = useRouter();
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    let mounted = true;

    const fetchConversations = () => {
      /*
      axios.get('/api/chat/conversations').then(response => {
        if (mounted) {
          setConversations(response.data.conversations);
        }
      });
      */
     let image = "https://www.10000h.ru/wp-content/uploads/2017/04/bill-gates-jpg.jpg"
     let image2 = "https://cdn.cultofmac.com/wp-content/uploads/2015/03/Steve_Jobs_The_Man_in_the_Machine.jpg"
     let conv = [{
       
      id: uuid(),
      otherUser: {
        name: 'Maxim Malikov',
        avatar: image,
        active: true,
        lastActivity: moment()
      },
      messages: [
        {
          id: uuid(),
          sender: {
            authUser: false,
            name: 'Maxim Malikov',
            avatar: image,
            lastActivity: moment()
          },
          content:
            'Hey, nice projects! I really liked the one in react. What\'s your quote on kinda similar project?',
          contentType: 'text',
          created_at: moment().subtract(10, 'hours')
        },
        {
          id: uuid(),
          sender: {
            authUser: true,
            name: 'Shen Zhi',
            avatar: image2
          },
          content:
            'I would need to know more details, but my hourly rate stats at $35/hour. Thanks!',
          contentType: 'text',
          created_at: moment().subtract(2, 'hours')
        },
        {
          id: uuid(),
          sender: {
            authUser: false,
            name: 'Maxim Malikov',
            avatar: image
          },
          content:
            'Well it\'s a really easy one, I\'m sure we can make it half of the price.',
          contentType: 'text',
          created_at: moment().subtract(5, 'minutes')
        },
        {
          id: uuid(),
          sender: {
            authUser: true,
            name: 'Shen Zhi',
            avatar: image2
          },
          content:
            'Then why don\'t you make it if it\'s that easy? Sorry I\'m not interetes, have fantastic day Max!',
          contentType: 'text',
          created_at: moment().subtract(3, 'minutes')
        },
        {
          id: uuid(),
          sender: {
            authUser: false,
            name: 'Maxim Malikov',
            avatar: image
          },
          content: 'Last offer, $25 per hour',
          contentType: 'text',
          created_at: moment().subtract(1, 'minute')
        },
        {
          id: uuid(),
          sender: {
            authUser: false,
            name: 'Maxim Malikov',
            avatar: image
          },
          content: 'https://s3.wi-fi.ru/cp3o/NURmWX9Do5RS7dW99Yzsokep?response-content-type=image/jpeg',
          contentType: 'image',
          created_at: moment().subtract(1, 'minute')
        }
      ],
      unread: 0,
      created_at: moment().subtract(1, 'minute')
    },
    {
      id: uuid(),
      otherUser: {
        name: 'Ekaterina May',
        avatar: 'https://im0-tub-ru.yandex.net/i?id=d053571029d61dd582b71448113c2d6b&n=13&exp=1',
        active: true,
        lastActivity: moment()
      },
      messages: [
        {
          id: uuid(),
          sender: {
            authUser: true,
            name: 'Shen Zhi',
            avatar: 'https://clickchain.ru/wp-content/uploads/2018/12/1x-1.jpg'
          },
          content: 'Hey, would you like to collaborate?',
          contentType: 'text',
          created_at: moment().subtract(6, 'minutes')
        },
        {
          id: uuid(),
          sender: {
            authUser: false,
            name: 'Ekaterina May',
            avatar: 'https://im0-tub-ru.yandex.net/i?id=d053571029d61dd582b71448113c2d6b&n=13&exp=1'
          },
          content: 'I don\'t think that\'s ideal',
          contentType: 'text',
          created_at: moment().subtract(5, 'minutes')
        }
      ],
      unread: 3,
      created_at: moment().subtract(26, 'minutes')
    },
  ]
    setConversations(conv);
  }
    fetchConversations();

    return () => {
      mounted = false;
    };
  }, []);

  let selectedConversation;

  if (router.match.params.id) {
    selectedConversation = conversations.find(
      c => c.id === router.match.params.id
    );
  }

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
        conversations={conversations}
      />
      {selectedConversation ? (
        <ConversationDetails
          className={classes.conversationDetails}
          conversation={selectedConversation}
        />
      ) : (
        <ConversationPlaceholder className={classes.conversationPlaceholder} />
      )}
    </Page>
  );
};

export default Chat;
