import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import PrivateRoute from "./Routes/PrivateRoute";
import { SignBoard } from "./components/SignBoard";
import { CanvasExample } from "./components/canvasExample";

function App() {
  // return <CanvasExample />;
  // return <SignBoard />;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route exact path="/home" element={<PrivateRoute />}>
          <Route exact path="/home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
