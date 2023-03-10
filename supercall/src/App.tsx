import { Component } from "solid-js";
import { HopeProvider, NotificationsProvider } from "@hope-ui/solid";
import { hopeConfig } from "./scripts/hopeConfig";
import Layout from "./components/layout/Layout";
import Pages from "./pages/Pages";

const App: Component = () => {
  return (
    <HopeProvider config={hopeConfig}>
      <NotificationsProvider placement={"top"}>
        <Layout>
          <Pages />
        </Layout>
      </NotificationsProvider>
    </HopeProvider>
  );
};

export default App;
