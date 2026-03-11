import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match only internationalized routes
  matcher: ["/", "/(th|en|cn)/:path*"],
};
