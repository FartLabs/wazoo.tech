import { GA4Report } from "@kitsonk/ga4";

export function useGoogleAnalytics(
  measurementId: string,
  fn: Deno.ServeHandler<Deno.Addr>
) {
  return async function (
    request: Request,
    info: Deno.ServeHandlerInfo<Deno.Addr>
  ) {
    let response: Response;
    try {
      response = await fn(request, info);
    } finally {
      const report = new GA4Report({
        measurementId,
        conn: info as Deno.ServeHandlerInfo<Deno.NetAddr>,
        request,
        response: response!,
      });
      await report.send();
    }

    return response;
  };
}
