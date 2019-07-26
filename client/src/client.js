import { useEffect, useState } from "react";
import { GraphQLClient } from "graphql-request";

const BASE_URL =
    process.env.NODE_ENV === "production"
        ? "https://geo-pins-max.herokuapp.com/graphql"
        : "http://localhost:4000/graphql";

export const useClient = () => {
    const [idToken, setIdToken] = useState("");
    console.log(idToken);
    useEffect(() => {
        const idToken = window.gapi.auth2
            .getAuthInstance()
            .currentUser.get()
            .getAuthResponse().id_token;
        setIdToken(idToken);
    }, []);
    return new GraphQLClient(BASE_URL, {
        headers: {
            authorization: idToken
        }
    });
};

export const getClient = () => {
    const idToken = window.gapi.auth2
        .getAuthInstance()
        .currentUser.get()
        .getAuthResponse().id_token;
    return new GraphQLClient(BASE_URL, {
        headers: {
            authorization: idToken
        }
    });
};
