/**
 * This is the client-side entrypoint for your tRPC API. It is used to create the `api` object which
 * contains the Next.js App-wrapper, as well as your type-safe React Query hooks.
 *
 * We also create a few inference helpers for input and output types.
 */
import { httpLink, loggerLink, splitLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import superjson from "superjson";
import { AppRouter } from "~/server/routers/_app";
import { NextPageContext } from "next";
import { createWSClient, wsLink } from "@trpc/client/links/wsLink";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const { APP_URL, WS_URL } = publicRuntimeConfig;

function getEndingLink(ctx: NextPageContext | undefined) {
  const client = createWSClient({
    url: WS_URL,
  });

  return splitLink({
    condition(op) {
      return op.type === "subscription";
    },
    true: wsLink<AppRouter>({
      client,
    }),
    false: httpLink({
      url: `${APP_URL}/api/trpc`,
    }),
  });
}

// /**
//  * A set of strongly-typed React hooks from your `AppRouter` type signature with `createReactQueryHooks`.
//  * @link https://trpc.io/docs/react#3-create-trpc-hooks
//  */
// export const trpc = createTRPCReact<AppRouter>();

/** A set of type-safe react-query hooks for your tRPC API. */
export const api = createTRPCNext<AppRouter>({
  config({ ctx }) {
    return {
      /**
       * Links used to determine request flow from client to server.
       *
       * @see https://trpc.io/docs/links
       */
      links: [
        loggerLink({
          enabled: (opts) =>
            (process.env.NODE_ENV === "development" &&
              typeof window !== "undefined") ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        getEndingLink(ctx),
      ],
      /**
       * Transformer used for data de-serialization from the server.
       *
       * @see https://trpc.io/docs/data-transformers
       */
      transformer: superjson,
      /**
       * @link https://tanstack.com/query/v4/docs/react/reference/QueryClient
       */
      queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * Whether tRPC should await queries when server rendering pages.
   *
   * @see https://trpc.io/docs/nextjs#ssr-boolean-default-false
   */
  ssr: true,
});

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;
