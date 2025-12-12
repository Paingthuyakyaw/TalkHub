import { createFileRoute, redirect } from "@tanstack/react-router";
import LoginComponent from "../../features/auth/login";
import { useBoundStore } from "../../store/client/use-store";

export const Route = createFileRoute("/(auth)/login")({
  validateSearch: (search) => ({
    redirect: (search.redirect as string) || "/",
  }),
  beforeLoad: ({ search }) => {
    if (useBoundStore.getState().token) {
      throw redirect({ to: search.redirect });
    }
  },
  component: LoginComponent,
});

// function RouteComponent() {
//   return (
//     <div>
//       <LoginComponent />
//     </div>
//   );
// }
