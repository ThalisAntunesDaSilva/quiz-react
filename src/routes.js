import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Questions from "./pages/questions/index";
import Home from "./pages/home/index";


function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/questions" element={<Questions />} />
        <Route path="/" element={<Home />} />
      
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
