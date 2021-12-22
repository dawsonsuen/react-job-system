import React from "react";
import { Layout } from "antd";
import Routes from "./App/Routes";
import TopNav from "./App/TopNav";
import Foot from "./App/Foot";

export default function App() {

  return (
    <Layout>
      <TopNav />
      <Routes />
      <Foot />
    </Layout>
  );
}
