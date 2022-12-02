import App from "App";
import SpendDetail from "components/biz/spendCare/SpendDetail";
import SpendList from "components/biz/spendCare/SpendList";
import Home from "pages/home";
import SpendCare from "pages/spendCare";
import Income from "pages/spendCare/Income";
import Spend from "pages/spendCare/Spend";

const { createBrowserRouter } = require("react-router-dom");

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "spendCare",
        element: <SpendCare />,
        children: [
          {
            path: "",
            element: <Spend />,
          },
          {
            path: "income",
            element: <Income />,
          },
          {
            path: "spendList/:month/:payMethod",
            element: <SpendList />,
            children: [{ path: ":id", element: <SpendDetail /> }],
          },
        ],
      },
    ],
  },
]);

export default router;
