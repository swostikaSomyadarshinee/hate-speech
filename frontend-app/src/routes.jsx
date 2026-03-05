import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Analyzer from "./pages/Analyzer/Analyzer";
import Comparison from "./pages/Comparison/Comparison";
import Insights from "./pages/Insights/Insights";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/analyzer" element={<Analyzer />} />
      <Route path="/comparison" element={<Comparison />} />
      <Route path="/insights" element={<Insights />} />
    </Routes>
  );
}

export default AppRoutes;