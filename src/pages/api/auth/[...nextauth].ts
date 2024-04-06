import Auth from "@auth/core";
import Credentials from "@auth/core/providers/credentials";
import { AuthHandler } from "@auth/core/handlers"; // Import the AuthHandler function

const request = new Request("https://example.com");
const response = await AuthHandler(request, {
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize({ request }: { request: Request }) { // Add type declaration for 'request'
        const response = await fetch(request);
        if (!response.ok) return null;
        return (await response.json()) ?? null;
      },
    }),
  ],
  secret: "...",
  trustHost: true,
});
