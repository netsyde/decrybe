import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TaskCard from "../../components/tasks/taskCard"
import { flexbox } from '@material-ui/system';

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

function Main (props) {
    const classes = useStyles();
    return (
        <div className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Grid container justify="center" className={classes.container}>
                <Grid item xs={12} sm={6} md={4} lg={3} className={classes.task}>
                    <TaskCard price="1.5" creator="Alexabnder" date="2019, 1 October"name="Country hearted be" image="https://picsum.photos/536/354" features="Him rendered may attended concerns jennings reserved now. Sympathize did now preference unpleasing mrs few. Mrs for hour game room want are fond dare. For detract charmed add talking age. Shy resolution instrument unreserved man few."></TaskCard>
                </Grid>  
                <Grid item xs={12} sm={6} md={4} lg={3} className={classes.task}>
                    <TaskCard price="15" creator="Pizdamir" date="2019, 8 September"name="No gave mr eyes." image="https://picsum.photos/id/169/536/353" features="He do subjects prepared bachelor juvenile ye oh."></TaskCard>
                </Grid>  
                <Grid item xs={12} sm={6} md={4} lg={3} className={classes.task}>   
                    <TaskCard price="26.8" creator="Kunus" date="2019, 11 October" name="Abroad wisdom waited" image="https://picsum.photos/id/165/532/532" features="Evening do forming observe spirits is in. Country hearted be of justice sending. On so they as with room cold ye."></TaskCard>
                </Grid>  
                <Grid item xs={12} sm={6} md={4} lg={3} className={classes.task}>     
                    <TaskCard price="35" creator="MariO" date="2019, 29 August"name="Up arrived no painful between" image="https://picsum.photos/id/164/532/532" features="Be call four my went mean. Celebrated if remarkably especially an. Going eat set she books found met aware. "></TaskCard>
                </Grid>  
                <Grid item xs={12} sm={6} md={4} lg={3} className={classes.task}>     
                    <TaskCard price="1.5" creator="Valera" date="2019, 6 November" name="Offices hearted minutes effects" image="https://picsum.photos/id/161/532/532" features="Alteration literature to or an sympathize mr imprudence. Of is ferrars subject as enjoyed or tedious cottage. Procuring as in resembled by in agreeable."></TaskCard>
                </Grid>  
                <Grid item xs={12} sm={6} md={4} lg={3} className={classes.task}>     
                    <TaskCard price="156" creator="Altmanea" date="2019, 1 September" name="Letter wooded direct " image="https://picsum.photos/id/160/532/532" features="Next long no gave mr eyes."></TaskCard>
                </Grid>  
                <Grid item xs={12} sm={6} md={4} lg={3} className={classes.task}>      
                    <TaskCard price="0.4" creator="Perdolio" date="2019, 10 October" name="They sigh were not find are rent" image="https://picsum.photos/id/159/532/532" features="Not its herself forming charmed amiable. Him why feebly expect future now."></TaskCard>
                </Grid>  
                <Grid item xs={12} sm={6} md={4} lg={3} className={classes.task}>      
                    <TaskCard price="69" creator="Sgoldik" date="2019, 12 October" name="Merely to county it" image="https://picsum.photos/id/158/532/532" features="Ten the hastened steepest feelings pleasant few surprise property. An brother he do colonel against minutes uncivil. Can how elinor warmly mrs basket marked. Led raising expense yet demesne weather musical. Me mr what park next busy ever."></TaskCard>
                </Grid> 
                <Grid item xs={12} sm={6} md={4} lg={3} className={classes.task}> 
                    <TaskCard price="1000" creator="Alexabnder" date="2019, 1 October"name="Country hearted be" image="https://picsum.photos/536/354" features="Him rendered may attended concerns jennings reserved now. Sympathize did now preference unpleasing mrs few. Mrs for hour game room want are fond dare. For detract charmed add talking age. Shy resolution instrument unreserved man few."></TaskCard>
                </Grid>  
                <Grid item xs={12} sm={6} md={4} lg={3} className={classes.task}>  
                    <TaskCard price="887" creator="Pizdamir" date="2019, 8 September"name="No gave mr eyes." image="https://picsum.photos/id/169/536/353" features="He do subjects prepared bachelor juvenile ye oh."></TaskCard>
                </Grid>  
                <Grid item xs={12} sm={6} md={4} lg={3} className={classes.task}>    
                    <TaskCard price="1188" creator="Kunus" date="2019, 11 October" name="Abroad wisdom waited" image="https://picsum.photos/id/165/532/532" features="Evening do forming observe spirits is in. Country hearted be of justice sending. On so they as with room cold ye."></TaskCard>
                </Grid>  
                <Grid item xs={12} sm={6} md={4} lg={3} className={classes.task}>      
                    <TaskCard price="1.5" creator="MariO" date="2019, 29 August"name="Up arrived no painful between" image="https://picsum.photos/id/164/532/532" features="Be call four my went mean. Celebrated if remarkably especially an. Going eat set she books found met aware. "></TaskCard>
                </Grid>  
                <Grid item xs={12} sm={6} md={4} lg={3} className={classes.task}>      
                    <TaskCard price="16" creator="Valera" date="2019, 6 November" name="Offices hearted minutes effects" image="https://picsum.photos/id/161/532/532" features="Alteration literature to or an sympathize mr imprudence. Of is ferrars subject as enjoyed or tedious cottage. Procuring as in resembled by in agreeable."></TaskCard>
                </Grid>  
                <Grid item xs={12} sm={6} md={4} lg={3} className={classes.task}>      
                    <TaskCard price="1.25" creator="Altmanea" date="2019, 1 September" name="Letter wooded direct " image="https://picsum.photos/id/160/532/532" features="Next long no gave mr eyes."></TaskCard>
                </Grid>  
                <Grid item xs={12} sm={6} md={4} lg={3} className={classes.task}>      
                    <TaskCard price="1" creator="Perdolio" date="2019, 10 October" name="They sigh were not find are rent" image="https://picsum.photos/id/159/532/532" features="Not its herself forming charmed amiable. Him why feebly expect future now."></TaskCard>
                </Grid>  
                <Grid item xs={12} sm={6} md={4} lg={3} className={classes.task}>     
                    <TaskCard price="55" creator="Sgoldik" date="2019, 12 October" name="Merely to county it" image="https://picsum.photos/id/158/532/532" features="Ten the hastened steepest feelings pleasant few surprise property. An brother he do colonel against minutes uncivil. Can how elinor warmly mrs basket marked. Led raising expense yet demesne weather musical. Me mr what park next busy ever."></TaskCard>
                </Grid> 
            </Grid>
        </div>
    )
}

export default class General extends React.Component {
    render() {
        return (
            <Main/>
        )
    }
}
