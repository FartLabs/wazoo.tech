import { serveDir } from "@std/http/file-server";

export default {
  fetch: (request) =>
    serveDir(request, {
      fsRoot: Deno.args[0] ?? "./static",
      showIndex: true,
    }),
} satisfies Deno.ServeDefaultExport;
