import { Navigate } from "react-router-dom";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import {LoadingPage} from "../components/loadingPage.jsx";

const ME_QUERY = gql`
  query Me {
    me {
      id
      email
    }
  }
`;

export function PrivateRoute({ children }) {
    const { data, loading, error } = useQuery(ME_QUERY, {
        fetchPolicy: "network-only",
    });



    if (loading) return <LoadingPage name={"Dashboard"} />;

    if (!data?.me) {
        return <Navigate to="/ATh7QDtfdodYQxXezXeRmKEoqDP9Qot1TFt/login" replace />;
    }

    return children;
}