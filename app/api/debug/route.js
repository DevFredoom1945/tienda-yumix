export async function GET() {
  const id  = process.env.GOOGLE_CLIENT_ID || "missing";
  const url = process.env.NEXTAUTH_URL || "missing";

  const masked =
    typeof id === "string"
      ? id.replace(/^(.{8}).+(.{20})$/, "$1...$2")
      : "missing";

  return new Response(JSON.stringify({ googleClientId: masked, nextauthUrl: url }), {
    headers: { "content-type": "application/json" },
  });
}
