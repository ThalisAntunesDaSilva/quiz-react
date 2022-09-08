import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Questions from "./pages/questions/index";
import Home from "./pages/home/index";
import Results from "./pages/results/index";
import Historic from "./pages/historic/index";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/questions" element={<Questions />} />
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="/historic" element={<Historic />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
