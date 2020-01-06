import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { observer, inject } from 'mobx-react';
import { Page } from '../../components';
import { DisputeComments, DisputeDetails } from './components';
import { Redirect } from 'react-router-dom';
import * as nodeInt from '../../modules/nodeInt'
import Error401 from '../Error401'
const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'flex',
    overflow: 'hidden',
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    '@media (max-width: 780px)': {
      '& $emailFolders, & $emailList, & $emailDetails': {
        flexBasis: '100%',
        width: '100%',
        maxWidth: 'none',
        flexShrink: '0',
        transition: 'transform .5s ease',
        transform: 'translateX(0)'
      }
    }
  },
  openFolder: {
    '@media (max-width: 780px)': {
      '& $emailFolders, & $emailList, & $emailDetails': {
        transform: 'translateX(-100%)'
      }
    }
  },
  emailFolders: {
    flexBasis: 280,
    flexShrink: 0,
    flexGrow: 0,
    borderLeft: `1px solid ${theme.palette.divider}`
  },
  emailList: {
    flexGrow: 1
  },
  emailDetails: {
    flexGrow: 1
  }
}));

const DisputeContainer = observer((props) => {
  const classes = useStyles();
  const [openFolder, setOpenFolder] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [dispute, setDispute] = useState({});

  const { id, tab } = props.match.params;

  useEffect(() => {
    console.log(id)
    let mounted = true;
    const fetchDispute = async () => {
      let disputeData = await nodeInt.getDisputeData(props.rootStore.user.getStorage, id)
      console.log(disputeData)
      setDispute(disputeData)
    };
    
    if (props.rootStore.user.isLogin) {
      if (mounted) {
        fetchDispute();
      }
    }

  return () => {
    mounted = false;
  };
}, [props.rootStore.user.getStorage]);

const tabs = [
  { value: 'overview', label: 'Overview' },
];

if (!tab) {
  return <Redirect to={`/disputes/${id}/overview`} />;
}


if (!tabs.find(t => t.value == tab)) {
  console.log(tab)
  return <Redirect to="/404" />;
}

  return (
    <Page
      className={clsx({
        [classes.root]: true,
        [classes.openFolder]: openFolder
      })}
      title="Dispute"
    >
        <DisputeDetails
          className={classes.emailDetails}
          dispute={dispute}
          rootStore={props.rootStore}
        />
        <DisputeComments
          className={classes.emailFolders}
          comments={dispute.comments ? dispute.comments : []}
          rootStore={props.rootStore}
          dispute={dispute}
        />
    </Page>
  );
});

@inject("rootStore")
@observer
class Dispute extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    if (this.props.rootStore.user.isLogin) {
      return (
      <DisputeContainer match={this.props.match} history={this.props.history} rootStore={this.props.rootStore} />
      )
    } else {
      return (
       <Error401 />
      )
    }
  }
}

export default Dispute;
