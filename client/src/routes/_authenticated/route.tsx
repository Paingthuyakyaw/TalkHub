import { createFileRoute, redirect } from "@tanstack/react-router";
import MainLayout from "../../layout/main-layout";
import { useBoundStore } from "../../store/client/use-store";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ location }) => {
    console.log(useBoundStore.getState().token, "authenticated");

    if (!useBoundStore.getState().token) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <MainLayout />
    </div>
  );
}
