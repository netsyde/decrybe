import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Divider, colors } from '@material-ui/core';
import { Header, Overview } from './components';
import { observer, inject } from 'mobx-react';

import { Page } from '../../components'

import * as nodeInt from '../../modules/nodeInt'
const useStyles = makeStyles(theme => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3)
  },
  tabs: {
    marginTop: theme.spacing(3)
  },
  divider: {
    backgroundColor: colors.grey[300]
  },
  alert: {
    marginTop: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(3)
  }
}));
let data = {
  title:"Develop a PDF Export App",
  author:{
    name:"MR Miseeks",
    avatar:"https://slovnet.ru/wp-content/uploads/2019/04/21-10.png",
    bio:"We build beautiful functional themes for web professionals"
  },
  brief:"\n#### TL;DR\n\nThe primary aim of the product is to convert survery responses into PDF reports, these reports are generated on to what we call templates. This product is designer to work with 3rd party survery providers. The first MVP will integrate with TypeForm, because the's no direct way to convert results to PDF from the form people create in TypeForm and then ask users to fill out.\n\n#### Background information\n\nDesign files are attachedin the files tab.\n\nDevelop the web app screens for our product called \"PDFace\". Please look at the wireframes, system activity workflow and read the section above to understand what we're trying to archive.\n\nThere's not many screens we need designed, but there will be modals and various other system triggered evenets that will need to be considered.\n\nThe project has benn created in Sketch so let me know if there are any problmes opening this project and I'll try to convert into a usable file.\n\nI have attached a chat with our users most used devices.\n\n#### Goals:\n  - Maintainable Code\n  - Easy UX\n  - Readable Code\n  - No Redux\n    ",
  price:"12,500",
  currency:"USD",
  tags:[{text:"React JS",color: ""}],
  members:[
    {
      name:"Ekaterina Tankova",
      avatar:"https://i.pinimg.com/736x/30/a7/af/30a7afa99904ed58eb8d59f49ba36d15.jpg",
      bio:"Front End Developer",
      id: 1
    },
    {name:"Cao Yu",
    avatar:"https://wdb.space/media/2018-2-21/HfEDZ7DQsK.png",
    bio:"UX Designer",
    id: 2
  }]
}

const Task = props => {
  //const { match, history } = props;
  const classes = useStyles(1);
  const { id, tab } = props.match.params;
  const [openAlert, setOpenAlert] = useState(true);
  const [project, setProject] = useState(null);

  //setProject(data);
  useEffect(() => {
    async function getTask () {
      console.log(props.rootStore.user.getUserNetwork)
      let data = await nodeInt.getTaskData(id, props.rootStore.user.getDapp, props.rootStore.user.getUserNetwork)
      console.log(data)
      setProject(data);
    }
    if (props.rootStore.user.isLogin) {
      getTask()
    }
  }, []);

  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  const handleTabsChange = (event, value) => {
    props.history.push(value);
  };

  const tabs = [
    { value: 'overview', label: 'Overview' }
  ];
  
  if (!tab) {
    return <Redirect to={`/tasks/${id}/overview`} />;
  }
  
 
  if (!tabs.find(t => t.value === tab)) {
    return <Redirect to="/errors/error-404" />;
  }
  

  if (!project) {
    return null;
  }
  //console.log(props.task)
  
  return (
    <Page
      className={classes.root}
      title={`Task Details ${id}`}
    >
     <Header project={project} />
     
     <Tabs
        className={classes.tabs}
        onChange={props.handleTabsChange}
        scrollButtons="auto"
        value={tab}
        variant="scrollable"
      >
        {tabs.map(tab => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
          />
        ))}
      </Tabs>
      <Divider className={classes.divider} />
      <div className={classes.content}>
        {tab === 'overview' && <Overview project={project} />}
      </div>
    </Page>
  );
};

@inject("rootStore")
@observer
class TaskDetails extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    if (this.props.rootStore.user.isLogin) {
      return (
        <Task match={this.props.match} history={this.props.history} rootStore={this.props.rootStore} />
      )
    } else {
      return (
        <p>Please Log In</p>
      )
    }
  }
}

export default TaskDetails;
