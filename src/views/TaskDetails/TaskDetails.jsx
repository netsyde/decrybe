import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Divider, colors } from '@material-ui/core';
import { Header, Overview, Editor } from './components';
import { observer, inject } from 'mobx-react';

import { Page } from '../../components'
import Error401 from '../Error401'
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

const Task = observer((props) => {
  const classes = useStyles(1);
  const { id, tab } = props.match.params;
  const [openAlert, setOpenAlert] = useState(true);
  const [project, setProject] = useState(false);
  async function getTask () {
    let data = await props.rootStore.tasks.getTaskData(id)
    if (data) {
      
      setProject(data);
      props.rootStore.taskEdit.setTitle(data.title)
      props.rootStore.taskEdit.setPrice(data.price)
      props.rootStore.taskEdit.setCategory(data.category.id)
      props.rootStore.taskEdit.setEndDateFromBlockchain(data.expireTime)
      props.rootStore.taskEdit.setCreateDate(data.createTime)
      props.rootStore.taskEdit.setBriefDescription(data.brief)
      let tags = []
      for (let i = 0; i < data.tags.length; i++) {
        tags.push(data.tags[i].name)
      }
      props.rootStore.taskEdit.setTags(tags) // dont work
      props.rootStore.taskEdit.setDescription(data.description) // dont work
      props.rootStore.taskEdit.setCurrency(data.currency)
      props.rootStore.taskEdit.setAuthor(data.author.address)
      props.rootStore.taskEdit.setStatus(data.status)
      props.rootStore.taskEdit.setMembers(data.members)
      props.rootStore.taskEdit.setFreelancer(data.freelancer)
    }
  }

  async function updateTask () {
    let data = await props.rootStore.tasks.getTaskData(id)
    if (data) {
      setProject(data);
    }
  }
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (props.rootStore.user.isLogin) {
        getTask()
      }
    }

    return () => {
      mounted = false;
    };
  }, []);

  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  const handleTabsChange = (event, value) => {
    props.history.push(value);
  };

  const tabs = [
    { value: 'overview', label: 'Overview' },
  ];
  
  if (!tab) {
    return <Redirect to={`/tasks/${id}/overview`} />;
  }
  
 
  if (!tabs.find(t => t.value == tab || "edit" === tab)) {
    console.log(tab)
    return <Redirect to="/404" />;
  }
  

  if (!project) {
    return null;
  }

  console.log(project.status)
  
  if (project) {
    return (
      <Page
        className={classes.root}
        title={`Task | ${project.title}`}
      >
      <Header project={project} rootStore={props.rootStore}/>
      
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
          {((props.rootStore.user.getUserAddress == project.author.address) && (project.status == "Featured")) ?
          (
            <Tab
              key={'edit'}
              label={'Edit'}
              value={'edit'}
            />
          )
            : null
          }
        </Tabs>
        <Divider className={classes.divider} />
        <div className={classes.content}>
          {tab === 'overview' && <Overview project={project} />}
          {((props.rootStore.user.getUserAddress == project.author.address) && (project.status == "Featured")) ? (tab === 'edit' && <Editor project={project} updateTask={updateTask} history={props.history} rootStore={props.rootStore} id={id}/>) : null}
        </div>
      </Page>
    );
  }
});

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
        <Error401 />
      )
    }
  }
}

export default TaskDetails;
