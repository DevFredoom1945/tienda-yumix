export async function GET() {
  const id = process.env.GOOGLE_CLIENT_ID || "missing";
  // Muestra solo el principio y el final para comparar
  const masked = id.replace(/^(.{8}).+(.{20})$/, "$1...$2");
  return new Response(JSON.stringify({ googleClientId: masked }), {
    headers: { "content-type": "application/json" },
  });
}
