// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/AuthComponents/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//pages
import Home from "./pages/Home";
import SetlistPage from "./pages/SetlistPage";
import RedirectWindow from "./pages/RedirectWindow";
import UserSettings from "./pages/UserSettings";
import UserHistory from "./pages/UserHistory";
import NotFoundPage from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={ queryClient }>
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
                <Route
                  path="/history"
                  element={
                    <ProtectedRoute>
                      <UserHistory />
                    </ProtectedRoute>
                  }
                />
                <Route path='*' element={<NotFoundPage />} />
              </Routes>
            </div>
          </AuthContextProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
