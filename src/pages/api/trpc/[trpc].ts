import { createNextApiHandler } from "@trpc/server/adapters/next";
import { createContext } from '~/server/api/context';
import { appRouter } from "~/server/api/routers/_app";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createContext,
  onError({ error }) {
    if (error.code === "INTERNAL_SERVER_ERROR") {
      // send to bug reporting
      console.error("Something went wrong", error);
    }
  },
});
