import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/UI/Layout";
import AccountBook from "./pages/accountBook";
import Charts from "./pages/Charts";
import Form from "./pages/Form";
import Home from "./pages/Home";
import List from "./pages/List";

const Routers = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/accountBook/*" element={<AccountBook />} />
          <Route path="/list" element={<List />} />
          <Route path="/form" element={<Form />} />
          <Route path="/charts" element={<Charts />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Routers;
