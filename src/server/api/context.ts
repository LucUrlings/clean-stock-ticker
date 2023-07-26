import * as trpc from "@trpc/server";
import {
  CreateHTTPContextOptions,
  createHTTPServer,
} from "@trpc/server/adapters/standalone";
import {
  applyWSSHandler,
  CreateWSSContextFnOptions,
} from "@trpc/server/adapters/ws";

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = (
  opts: CreateHTTPContextOptions | CreateWSSContextFnOptions
) => {
  return {};
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
