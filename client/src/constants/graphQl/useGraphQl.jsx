import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";



// Queries
export const useQueryQl = (query) => {

    const gqlQuery = gql`${query}`;
    const {data, error, loading, refetch} = useQuery(gqlQuery)

    return {data, error, loading, refetch}
}

export const useUserQueryQl = (query, userId) => {
    const gqlQuery = gql`${query}`;

    const {data, error, loading, refetch} = useQuery(gqlQuery, {
        variables: {userId},
    });

    return {data, error, loading, refetch};
};

export const useOneElement = (query, variables) => {
  const gqlQuery = gql`${query}`;


  const { data, loading, error, refetch } = useQuery(gqlQuery, {
    variables,
    skip: !variables,
  });

  const key = data ? Object.keys(data)[0] : null;
  return { elementData: key ? data[key] : null, loading, error, refetch };
};

// Mutations
export const useMutationQl = (mutation) => {
    const gqlMutation = gql`${mutation}`;

    const [mutate, { loading, error }] = useMutation(gqlMutation);

    return {mutate, loading, error};
}


// Delete Mutation
export const useDeleteMutationQl = (mutation, variableName = "id") => {
    const gqlMutation = gql`${mutation}`;

    const [deleteMutation, { loading, error }] = useMutation(gqlMutation);

    const handleDelete = async (id) => {
        try {
            const { data } = await deleteMutation({
                variables: { [variableName]: id },
            });

            if (data) {
                console.log("Deleted successfully:", data);
            } else {
                console.log("Not found or already deleted.");
            }
        } catch (e) {
            console.error("Error during delete:", e);
        }
    };

    return { handleDelete, loading, error };
};

// Update Mutation
export const useUpdateMutationQl = (mutation) => {
  const gqlMutation = gql`${mutation}`;

  const [updateMutation, { loading, error }] = useMutation(gqlMutation);


  const handleUpdate = async (variables) => {
      console.log("Variables sent:", variables);
    try {
      const { data } = await updateMutation({ variables });

      if (data) {
        console.log("Updated successfully:", data);
        return data;
      } else {
        console.log("No data returned from update.");
        return null;
      }
    } catch (e) {
      console.error("Error during update:", e);
      throw e;
    }
  };

  return { handleUpdate, loading, error };

};






