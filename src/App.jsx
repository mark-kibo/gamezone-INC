
import { Routes, Route, Outlet } from "react-router-dom";
import Users from "./pages/users/Users.jsx";
import Products from "./pages/products/Products.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import Footer from "./components/footer/Footer.jsx";
import Menu from "./components/menu/Menu.jsx";
import Login from "./pages/login/Login.jsx";
import "./styles/global.scss";
import User from "./pages/user/User.jsx";
import Product from "./pages/product/Product.jsx";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import PrivateRoute from "./utils/PrivateRoute.jsx";
import ProfilePage from "./pages/profile/ProfilePage.jsx";
import { CartProvider } from "react-use-cart";

import Sales from "./pages/sales/Sales.jsx";
import Loss from "./pages/loss/Loss.jsx";
import Expenses from "./pages/expenses/expenses.jsx";
import Cart from "./components/Cart/Cart copy.jsx";
import Home from "./pages/home/home copy.jsx";

const queryClient = new QueryClient();

function App() {
  const Layout = () => {
    return (
      <div className="main">
        
        <Navbar />
        
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <QueryClientProvider client={queryClient}>
              
              <Outlet />
              
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
            <Route path="loss" element={<Loss />}/>
            <Route path="expenses" element={<Expenses/>}/>
          </Route>
      </Route>
      <Route path="/login" element={<Login/>}/>
    </Routes>
  )
}

export default App;
