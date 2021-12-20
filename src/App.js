import "./App.css";
import Routes from "./App/Routes.js";
import { Layout } from "antd";

function App() {
  const { Header, Footer, Sider, Content } = Layout;

  return (
    // <div className="App">
      <Layout>
        <Routes />
      </Layout>
    // </div>
  );
}

export default App;
