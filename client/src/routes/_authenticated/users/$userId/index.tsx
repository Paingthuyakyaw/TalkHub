import { createFileRoute } from "@tanstack/react-router";
import { messageQueryOptions } from "../../../../store/server/message/query";
import ErrorComponent from "../../../../features/error/error";
import UserComponent from "../../../../features/users";
import { getUserByIdOptions } from "../../../../store/server/user/query";

export const Route = createFileRoute("/_authenticated/users/$userId/")({
  loader: async ({ context, params: { userId } }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(messageQueryOptions(userId)),
      context.queryClient.ensureQueryData(getUserByIdOptions(userId)),
    ]);
  },
  errorComponent: ErrorComponent,
  component: UserComponent,
});
