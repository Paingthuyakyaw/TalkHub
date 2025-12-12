import { createFileRoute, redirect } from "@tanstack/react-router";
import MainLayout from "../../layout/main-layout";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ context, location }) => {
    console.log(context.auth.isAuth, "isAuth");

    if (!context.auth.isAuth) {
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
