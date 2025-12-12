import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSocketStore } from "./store/client/socket.tsx";
import { useBoundStore } from "./store/client/use-store.tsx";

const query = new QueryClient();

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultPreloadStaleTime: 0,
  context: {
    queryClient: query,
    auth: undefined!,
  },
});

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const { user } = useBoundStore();
  const connectSocket = useSocketStore((state) => state.connectSocket);
  const disconnect = useSocketStore((state) => state.disconnectSocket);

  // external
  useEffect(() => {
    if (user.id) {
      connectSocket(user.id);
    }

    return () => {
      disconnect();
    };
  }, [user.id]);

  return <RouterProvider router={router} />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={query}>
      <InnerApp />
    </QueryClientProvider>
  </StrictMode>
);
