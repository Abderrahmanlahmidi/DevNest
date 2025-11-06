
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";


export const useQueryQl = (query) => {

    const gqlQuery = gql`${query}`;
    const {data, error, loading} = useQuery(gqlQuery)

    return {data, error, loading}
}


export const useMutationQl = (mutation) => {
    const gqlMutation = gql`${mutation}`;

    const [mutate, { loading, error }] = useMutation(gqlMutation);

    return {mutate, loading, error};
}




