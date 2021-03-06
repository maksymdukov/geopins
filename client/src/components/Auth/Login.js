import React, { useContext } from "react";
import { GraphQLClient } from "graphql-request";
import { GoogleLogin } from "react-google-login";
import { withStyles } from "@material-ui/core/styles";
import Context from "../../context";
import Typography from "@material-ui/core/Typography";
import { ME_QUERY } from "../../graphql/queries";

const Login = ({ classes }) => {
    const { dispatch } = useContext(Context);
    const onSuccess = async googleUser => {
        try {
            const idToken = googleUser.getAuthResponse().id_token;
            const url =
                process.env.NODE_ENV === "production"
                    ? "https://geo-pins-max.herokuapp.com/graphql"
                    : "http://localhost:4000/graphql";
            const client = new GraphQLClient(url, {
                headers: { authorization: idToken }
            });
            const { me } = await client.request(ME_QUERY);
            dispatch({ type: "LOGIN_USER", payload: me });
            dispatch({
                type: "IS_LOGGED_IN",
                payload: googleUser.isSignedIn()
            });
        } catch (error) {
            onFailure(error);
            dispatch({ type: "IS_LOGGED_IN", payload: false });
        }
    };

    const onFailure = err => {
        console.error("Error logging in ", err);
    };

    return (
        <div className={classes.root}>
            <Typography
                component="h1"
                variant="h3"
                gutterBottom
                noWrap
                style={{ color: "rgb(66,133,244)" }}
            >
                Welcome
            </Typography>
            <GoogleLogin
                clientId="381459483753-qk0j1p6mv5ljkiug8rit2173k0075fku.apps.googleusercontent.com"
                onSuccess={onSuccess}
                onFailure={onFailure}
                isSignedIn={true}
                theme="dark"
                buttonText="Login with Google"
            />
        </div>
    );
};

const styles = {
    root: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center"
    }
};

export default withStyles(styles)(Login);
