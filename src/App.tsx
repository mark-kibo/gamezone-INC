import Home from "./pages/home/Home";
import { Routes, Route, Outlet } from "react-router-dom";
import Users from "./pages/users/Users";
import Products from "./pages/products/Products";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";
import "./styles/global.scss";
import User from "./pages/user/User";
import Product from "./pages/product/Product";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import PrivateRoute from "./utils/PrivateRoute";
import ProfilePage from "./pages/profile/ProfilePage";
import { CartProvider } from "react-use-cart";
import Cart from "./components/Cart/Cart";
import Sales from "./pages/sales/Sales";


const queryClient = new QueryClient();

function App() {
  const Layout = () => {
    return (
      <div className="main">
        <CartProvider>
        <Navbar />
        </CartProvider>
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <QueryClientProvider client={queryClient}>
              <CartProvider>
              <Outlet />
              </CartProvider>
            </QueryClientProvider>
            
          </div>
        </div>
        <Footer />
      </div>
    );
  };

 
  return (
      <Routes>
        <Route element={<PrivateRoute/>}>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path='users' element={<Users/>}/>
            <Route path='products' element={<Products/>}/>
            <Route path='users/:id' element={<User/>}/>
            <Route path='profile/:id' element={<ProfilePage/>}/>
            <Route path='products/:id' element={<Product/>}/>
            <Route path='cart' element={<Cart/>}/>
            <Route path="sales" element={<Sales/>}/>
          </Route>
      </Route>
      <Route path="/login" element={<Login/>}/>
    </Routes>
  )
}

export default App;
