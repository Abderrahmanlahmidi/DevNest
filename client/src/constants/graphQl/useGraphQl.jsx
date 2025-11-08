import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import { useToast } from "../../components/toast";

// !- Queries
export const useQueryQl = (query) => {
  const { toast } = useToast();
  const gqlQuery = gql`
    ${query}
  `;
  const { data, error, loading, refetch } = useQuery(gqlQuery);

  // Show error toast if query fails
  if (error && !loading) {
    toast.error("Failed to fetch data. Please try again.");
  }

  return { data, error, loading, refetch };
};

export const useUserQueryQl = (query, userId) => {
  const { toast } = useToast();
  const gqlQuery = gql`
    ${query}
  `;

  const { data, error, loading } = useQuery(gqlQuery, {
    variables: { userId },
  });

  // Show error toast if query fails
  if (error && !loading) {
    toast.error("Failed to load user data.");
  }

  return { data, error, loading };
};

export const useOneElement = (query, variables) => {
  const { toast } = useToast();
  const gqlQuery = gql`
    ${query}
  `;

  const { data, loading, error } = useQuery(gqlQuery, {
    variables,
    skip: !variables?.id,
  });

  // Show error toast if query fails
  if (error && !loading) {
    toast.error("Failed to load item details.");
  }

  const key = data ? Object.keys(data)[0] : null;
  return { elementData: key ? data[key] : null, loading, error };
};

// !- Mutations
export const useMutationQl = (mutation) => {
  const { toast } = useToast();
  const gqlMutation = gql`
    ${mutation}
  `;

  const [mutate, { loading, error }] = useMutation(gqlMutation);

  // Show error toast if mutation setup fails
  if (error) {
    toast.error("Mutation setup failed.");
  }

  return { mutate, loading, error };
};

// !- Delete Mutation
export const useDeleteMutationQl = (mutation, variableName = "id") => {
  const { toast } = useToast();
  const gqlMutation = gql`
    ${mutation}
  `;

  const [deleteMutation, { loading, error }] = useMutation(gqlMutation);

  const handleDelete = async (id) => {
    try {
      const { data } = await deleteMutation({
        variables: { [variableName]: id },
      });

      if (data) {
        toast.success("Item deleted successfully!");
        return data;
      } else {
        toast.warning("Item not found or already deleted.");
        return null;
      }
    } catch (e) {
      toast.error(`Delete failed: ${e.message}`);
      throw e;
    }
  };

  return { handleDelete, loading, error };
};

// !- Update Mutation
export const useUpdateMutationQl = (mutation) => {
  const { toast } = useToast();
  const gqlMutation = gql`
    ${mutation}
  `;

  const [updateMutation, { loading, error }] = useMutation(gqlMutation);

  const handleUpdate = async (variables) => {
    try {
      const { data } = await updateMutation({ variables });

      if (data) {
        toast.success("Item updated successfully!");
        return data;
      } else {
        toast.warning("No data returned from update.");
        return null;
      }
    } catch (e) {
      toast.error(`Update failed: ${e.message}`);
      throw e;
    }
  };

  return { handleUpdate, loading, error };
};

// !- Create Mutation
export const useCreateMutationQl = (mutation) => {
  const { toast } = useToast();
  const gqlMutation = gql`
    ${mutation}
  `;

  const [createMutation, { loading, error }] = useMutation(gqlMutation);

  const handleCreate = async (variables) => {
    try {
      const response = await createMutation({ variables });

      if (response?.data) {
        toast.success("Item created successfully!");
        return response.data;
      }

      toast.warning("No data returned from create operation.");
      return null;
    } catch (error) {
      toast.error(`Create failed: ${error.message || "Unknown error"}`);
      return null;
    }
  };

  return { handleCreate, loading, error };
};