import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";

// Helper function to extract and validate the Bearer token
function extractToken(req: NextRequest): string | null {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return null;
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return null;
  }

  return parts[1]; // Return the extracted token
}

// Unified function to handle both GET and POST with token validation
async function handleRequest(req: NextRequest) {
  const token = extractToken(req);
  if (!token || token !== process.env.ISR_TOKEN) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    // Assuming some shared logic here for demonstration
    const data = await req.json();
    if (data !== undefined) {
      if (
        data.operation.contains("create") ||
        data.operation.contains("delete")
      ) {
        revalidatePath(`/${data.collection}/`);
      } else {
        revalidatePath(`/${data.collection}/`);
        revalidatePath(`/${data.collection}/${data.id}`);
      }
    }
    return new Response(JSON.stringify({ revalidated: true }), { status: 200 });
  } catch {
    return new Response("Error revalidation", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  return handleRequest(req);
}

export async function POST(req: NextRequest) {
  return handleRequest(req);
}
