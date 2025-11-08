import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "./constants/apolloClient";
import { ToastProvider } from "./components/toast";

function App() {
  return (
    <div>
      <ApolloProvider client={client}>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </ApolloProvider>
    </div>
  );
}

export default App;
