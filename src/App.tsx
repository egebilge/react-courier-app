import QueryProvider from "./lib/query-provider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { OrdersContainer } from "./modules/orders";
import { useEffect } from "react";
import i18n from "./lib/i18n";

function App() {
  useEffect(() => {
    const savedLanguage = localStorage.getItem("@browserLanguage");
    const browserLanguage = savedLanguage || navigator.language.split("-")[0];
    localStorage.setItem("@browserLanguage", browserLanguage);

    i18n.changeLanguage(browserLanguage);
  }, []);

  return (
    <QueryProvider>
      <Router>
        <Routes>
          <Route path="/" element={<OrdersContainer />} />
        </Routes>
      </Router>
    </QueryProvider>
  );
}

export default App;
