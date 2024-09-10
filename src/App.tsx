// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/AuthComponents/ProtectedRoute";

//pages
import Home from "./pages/Home";
import SetlistPage from "./pages/SetlistPage";
import RedirectWindow from "./pages/RedirectWindow";
import UserSettings from "./pages/UserSettings";
import NotFoundPage from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthContextProvider>
          <div className="pages">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/s/:sid" element={<SetlistPage />} />
              <Route path="/authredirect" element={<RedirectWindow />} />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <UserSettings />
                  </ProtectedRoute>
                }
              />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </div>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
