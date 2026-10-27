import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { CataloguePage } from "@/pages/CataloguePage";
import { ProductPage } from "@/pages/ProductPage";
import { CartPage } from "@/pages/CartPage";
import { OrderPage } from "@/pages/OrderPage";
import { ProfilePage } from "@/pages/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<CataloguePage />} />
          <Route path="product">
            <Route path=":productId" element={<ProductPage />} />
          </Route>
          <Route path="profile" element={<ProfilePage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="order" element={<OrderPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
