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

export function PublicRoute({ children }) {
    const { data, loading } = useQuery(ME_QUERY, {
        fetchPolicy: "network-only",
    });

    if (loading) return <LoadingPage name={"Page"} />;


    if (data?.me) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}
