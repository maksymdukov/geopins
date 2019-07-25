import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import Context from "../../context";
import { Typography } from "@material-ui/core";
import format from "date-fns/format";
import AccessTime from "@material-ui/icons/AccessTime";
import FaceIcon from "@material-ui/icons/Face";
import CreateComment from "../Comment/CreateComment";
import Comments from "../Comment/Comments";

const PinContent = ({ classes }) => {
    const {
        state: {
            currentPin: { title, content, author, createdAt, comments }
        }
    } = useContext(Context);
    return (
        <div className={classes.root}>
            <Typography
                component="h2"
                variant="h4"
                color="primary"
                gutterBottom
            >
                {title}
            </Typography>
            <Typography
                component="h3"
                variant="h6"
                gutterBottom
                color="inherit"
                className={classes.text}
            >
                <FaceIcon className={classes.icon} /> {author.name}
            </Typography>
            <Typography
                className={classes.text}
                variant="subtitle2"
                color="inherit"
                gutterBottom
            >
                <AccessTime className={classes.icon} />
                {format(Number(createdAt), "MMM Do, YYYY")}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                {content}
            </Typography>

            {/* Pin comments */}
            <CreateComment/>
            <Comments comments={comments}/>
        </div>
    );
};

const styles = theme => ({
    root: {
        padding: "1em 0.5em",
        textAlign: "center",
        width: "100%"
    },
    icon: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    text: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
});

export default withStyles(styles)(PinContent);
