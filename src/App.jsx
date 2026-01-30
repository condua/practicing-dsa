import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Dsa from "./components/Dsa";
import TSLearningSystem from "./components/Typescript";
import VsatHome from "./components/vsat/VsatHome";

import "./index.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dsa />} />
        <Route path="/typescript" element={<TSLearningSystem />} />
        <Route path="/vsat" element={<VsatHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
