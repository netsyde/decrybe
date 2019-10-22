import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    margin: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  media: {
    height: 140,
  },
  titleHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  price: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 8,
    margin: 0
  },
  wavesLogo: {
    paddingLeft: 7,
    width: 20
  }
});

const TaskCard = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.image}
          title={props.name}
        />
        <CardContent>
          
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
          
          <Typography variant="body2" color="textSecondary" component="p">
            {props.features}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.titleHeader}>
        <div>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </div>
        <Typography className={classes.price} gutterBottom variant="h6" component="h3">
        {props.price} <img className={classes.wavesLogo} src='./img/waves-ico.svg' />
          </Typography>
      </CardActions>
    </Card>
  );
}

export default TaskCard;