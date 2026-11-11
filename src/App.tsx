import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { CataloguePage } from "@/pages/CataloguePage";
import { ProductPage } from "@/pages/ProductPage";
import { OrderPage } from "@/pages/OrderPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { z } from "zod";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthRoute } from "@/components/AuthRoute";
import { queryClient } from "@/api/query-client";

z.config(z.locales.ru());

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools client={queryClient} />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<CataloguePage />} />
            <Route path="product">
              <Route
                path=":productId"
                element={<ProductPage />}
              />
            </Route>
            <Route element={<AuthRoute />}>
              <Route path="profile" element={<ProfilePage />} />
              <Route path="order" element={<OrderPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
