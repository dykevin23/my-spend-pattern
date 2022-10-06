import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/UI/Layout";
import Charts from "./pages/Charts";
import Form from "./pages/Form";
import Home from "./pages/Home";
import List from "./pages/List";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/form" element={<Form />} />
          <Route path="/charts" element={<Charts />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
