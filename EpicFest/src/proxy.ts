import createProxyMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createProxyMiddleware(routing);

export function proxy(request: import("next/server").NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|studio|svgs|images|fonts|maps|merch).*)",
  ],
};
