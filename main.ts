import type { Route } from "@std/http/unstable-route";
import { route } from "@std/http/unstable-route";
import { serveDir } from "@std/http/file-server";
import { parse } from "@std/jsonc";

export default {
  fetch(request) {
    return router(request);
  },
} satisfies Deno.ServeDefaultExport;

export const routes: Route[] = [
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/*" }),
    handler(request) {
      return serveDir(request.clone(), {
        fsRoot: "./static",
        showIndex: true,
      });
    },
  },
];

export function defaultHandler(_request: Request) {
  return new Response("Not found", { status: 404 });
}

export const router = route(routes, defaultHandler);
