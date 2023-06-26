import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./main.css";
import VehiclePage from "./pages/Vehicle.tsx";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/vehicle/:id" element={<VehiclePage />} />

                <Route path="*" element={<h1>Page not found</h1>} />
            </Routes>
        </Router>
    </React.StrictMode>
);
