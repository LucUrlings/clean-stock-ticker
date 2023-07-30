import { createNextApiHandler } from "@trpc/server/adapters/next";
import { createContext } from "~/server/api/context";
import { AppRouter, appRouter } from "~/server/api/routers/_app";

// export API handler
export default createNextApiHandler<AppRouter>({
  router: appRouter,
  /**
   * @link https://trpc.io/docs/context
   */
  createContext,
  /**
   * @link https://trpc.io/docs/error-handling
   */
  onError({ error }) {
    if (error.code === "INTERNAL_SERVER_ERROR") {
      // send to bug reporting
      console.error("Something went wrong", error);
    }
  },
  /**
   * Enable query batching
   */
  batching: {
    enabled: true,
  },
});
