export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    // Proteger todo excepto /auth, /api, /_next, /images, favicon.ico, robots.txt
    "/((?!auth|api|_next|images|favicon.ico|robots.txt).*)",
  ],
};