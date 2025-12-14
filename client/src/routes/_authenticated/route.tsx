import { createFileRoute, redirect } from "@tanstack/react-router";
import MainLayout from "../../layout/main-layout";
import { useBoundStore } from "../../store/client/use-store";
import { fetchVerfiy } from "../../api";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location }) => {
    if (!useBoundStore.getState().token) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
    try {
      const data = await fetchVerfiy(useBoundStore.getState().token);
      useBoundStore.getState().setUser(data.data);
    } catch (err) {
      localStorage.removeItem("token");
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
