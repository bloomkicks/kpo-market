import { BrowserRouter, Routes, Route } from "react-router-dom";
import CataloguePage from "./pages/CataloguePage";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<CataloguePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
