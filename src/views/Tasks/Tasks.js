import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TaskCard from './components';
import * as nodeInt from '../../modules/nodeInt'

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    content: {
        flexGrow: 1,
    },
    appBarSpacer: theme.mixins.toolbar,
    container: {
        padding: theme.spacing(5),
    },
    task: {
        display: "flex",
        justifyContent: "center",
        marginBottom: 20
    }
}))

const TaskGrid = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.content}>
            <Grid container direction="row" className={classes.container}>          
                {props.cards}
            </Grid>
        </div>
    )
}

class Tasks extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            cards: []
        }
    }
    async componentDidMount() {
        let tasks = await nodeInt.getAllTasks("3NBngsNecsVX8HzVFTyEQSVGbL9Xia8hBb4", "https://testnodes.wavesnodes.com")
    
        let arrayCard = []
        for(let i = 0; i < tasks.length; i++) {  
            let taskData = await nodeInt.getTaskData(tasks[i], "3NBngsNecsVX8HzVFTyEQSVGbL9Xia8hBb4", "https://testnodes.wavesnodes.com")
            if (taskData) {
                let card = (
                    <Grid item item xs={12} sm={6} md={4} lg={3} key={i}>
                        <TaskCard 
                            price={taskData.price}
                            key={taskData.uuid}
                            creator={taskData.author}
                            date={taskData.createTime}
                            name={taskData.title}
                            image={taskData.image || `https://picsum.photos/${i}/354`}
                            features={taskData.description}>
                        </TaskCard>
                    </Grid>  
                )
                arrayCard.push(card)
            }            
        }

        this.setState({cards: arrayCard})
    }
    render () {
        return (
            <TaskGrid cards={this.state.cards}/>
        )
    }
}
export default Tasks;