import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useBoundStore } from "./store/client/use-store.tsx";

const query = new QueryClient();

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultPreloadStaleTime: 0,
  context: {
    queryClient: query,
    auth: undefined!,
  },
});

// const data = createRootRouteWithContext;

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={query}>
      <RouterProvider
        router={router}
        context={{ auth: useBoundStore.getState().token }}
      />
    </QueryClientProvider>
  </StrictMode>
);
