import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "../styles.css";
import { NavBar } from "#/components/sharedComponents/NavBar";
import { Footer } from "#/components/sharedComponents/Footer";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <TanStackDevtools
        config={{
          position: "bottom-right",
        }}
        plugins={[
          { name: "TanStack Router", render: <TanStackRouterDevtoolsPanel /> },
          { name: "TanStack Query", render: <ReactQueryDevtools /> },
        ]}
      />
    </div>
  );
}
