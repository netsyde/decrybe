import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TaskCard from './components';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    content: {
        flexGrow: 1,
        //padding: 40
        //overflow: 'auto',
    },
    appBarSpacer: theme.mixins.toolbar,
    container: {
        padding: theme.spacing(5),
        //display: 'flex',
        //gridTemplateColumns: 'repeat(12, 1fr)',
        //justifyContent: "center"

    },
    task: {
        display: "flex",
        justifyContent: "center",
        marginBottom: 20
    }
}))

let randText = [
    "Edward day almost active him friend thirty piqued. People as period twenty my extent as. To sorry world an at do spoil along."
]

const Tasks = () => {
    const classes = useStyles();
    let arrayCard = [];
    for (let i = 0; i <= 100; i++) {
        let card = (<Grid item item xs={12} sm={6} md={4} lg={3} key={i}>
            <TaskCard price={100-i} key={i} creator="Alexabnder" date="2019, 1 October"name="Country hearted be" image={`https://picsum.photos/${i}/354`} features={randText[0]}></TaskCard>
        </Grid>)
        arrayCard.push(card)
    }
    return (
        <div className={classes.content}>
            <Grid container direction="row" className={classes.container}>                   
                {arrayCard}
            </Grid>
        </div>
    )
}

export default Tasks;