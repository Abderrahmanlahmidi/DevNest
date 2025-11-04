import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "./constants/apolloClient";



function App() {
  return (
    <div>
      <ApolloProvider client={client} >
        <RouterProvider router={router} />
      </ApolloProvider>
    </div>
  );
}

export default App;
