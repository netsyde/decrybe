import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Divider, colors } from '@material-ui/core';
import { Header, Overview } from './components';

import { Page } from '../../components'
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

const TaskDetails = props => {
  const { match, history } = props;
  const classes = useStyles(1);
  const { id, tab } = match.params;
  const [openAlert, setOpenAlert] = useState(true);
  const [project, setProject] = useState(null);

  let data = {
    title:"Develop a PDF Export App",
    author:{
      name:"Emilee Simchenko",
      avatar:"/images/avatars/avatar_9.png",
      bio:"We build beautiful functional themes for web professionals"
    },
    brief:"\n#### TL;DR\n\nThe primary aim of the product is to convert survery responses into PDF reports, these reports are generated on to what we call templates. This product is designer to work with 3rd party survery providers. The first MVP will integrate with TypeForm, because the's no direct way to convert results to PDF from the form people create in TypeForm and then ask users to fill out.\n\n#### Background information\n\nDesign files are attachedin the files tab.\n\nDevelop the web app screens for our product called \"PDFace\". Please look at the wireframes, system activity workflow and read the section above to understand what we're trying to archive.\n\nThere's not many screens we need designed, but there will be modals and various other system triggered evenets that will need to be considered.\n\nThe project has benn created in Sketch so let me know if there are any problmes opening this project and I'll try to convert into a usable file.\n\nI have attached a chat with our users most used devices.\n\n#### Goals:\n  - Maintainable Code\n  - Easy UX\n  - Readable Code\n  - No Redux\n    ",
    price:"12,500",
    currency:"USD",
    tags:[{text:"React JS",color: ""}],
    members:[
      {
        name:"Ekaterina Tankova",
        avatar:"/images/avatars/avatar_2.png",
        bio:"Front End Developer",
        id: 1
      },
      {name:"Cao Yu",
      avatar:"/images/avatars/avatar_3.png",
      bio:"UX Designer",
      id: 2
    }]
  }
  //setProject(data);


  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  const handleTabsChange = (event, value) => {
    history.push(value);
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
  

  if (!data) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Project Details"
    >
     <Header project={data} />
     
     <Tabs
        className={classes.tabs}
        onChange={handleTabsChange}
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
        {tab === 'overview' && <Overview project={data} />}
        </div>
    </Page>
  );
};

TaskDetails.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default TaskDetails;
