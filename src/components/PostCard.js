import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles({
    root: {
        maxWidth: 320,
        boxShadow: "5px 3px 10px 3px rgba(9,9,9,0.16)"
    },
    content: {
        position: "relative",
        paddingTop: "20px"
    },
    avatar: {
        position: "absolute",
        top: "-20px"
    },
    footer: {
        display: "flex",
        justifyContent: "space-between",
        padding: "0 15px"
    },
    chip: {
        position: "absolute",
        top: "10px",
        right: "20px",
        color: "white",
        textTransform: "uppercase",
        backgroundColor: "#8D91C7",
        padding: "0 5px"
    }
});

function convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
}

function PostCard( post) {
    const classes = useStyles();
    console.log(post);

    return (
        <Card className={classes.root} >
            <CardActionArea>
                <Chip size="small" label={post.post.status} className={classes.chip}/>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="180"
                    image={[post.post.petImage]}
                    title="Contemplative Reptile"
                />
                {/*<img src={[post.post.petImage]} />*/}

                <CardContent className={classes.content}>
                    <Avatar
                        className={classes.avatar}
                        src="https://t4.ftcdn.net/jpg/01/22/26/41/240_F_122264106_LT3eZSVPB3AJSvj0cEkmrG2FMntQHaPS.jpg"
                    />
                    <Typography gutterBottom variant="h5" component="h2">
                        {post.post.species+" " +post.post.status}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Autor: {post.post.user.firstName}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.footer}>
                <Button size="small" color="primary">
                    Detalii
                </Button>
                <Typography>{convertDate(post.post.createdDate)}</Typography>
            </CardActions>
        </Card>
    );
}

export default PostCard
