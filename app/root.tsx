import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { RaikouProvider } from '@raikou/system';

import appStylesHref from "./app.css?url";
import * as Route from "./+types.root";

import '@raikou/system/styles.css';
import '@stylefusion/react/styles.css';

export const links = () => [{ rel: "stylesheet", href: appStylesHref }];

export default function App({ loaderData }: Route.ComponentProps) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <RaikouProvider>
        <Outlet />
        </RaikouProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
