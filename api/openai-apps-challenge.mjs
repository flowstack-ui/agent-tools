export const OPENAI_APPS_CHALLENGE = "8vS6CvnClz_MhA2A_ICdsvG6kKV3NLcCbYINbTE371k";

export default function openaiAppsChallenge(request, response) {
  response.setHeader("Allow", "GET, HEAD");
  response.setHeader("Cache-Control", "no-store");
  response.setHeader("Content-Type", "text/plain; charset=utf-8");
  response.setHeader("X-Content-Type-Options", "nosniff");

  if (!["GET", "HEAD"].includes(request.method)) {
    response.statusCode = 405;
    response.end("Method not allowed");
    return;
  }

  response.statusCode = 200;
  response.end(request.method === "HEAD" ? undefined : OPENAI_APPS_CHALLENGE);
}
