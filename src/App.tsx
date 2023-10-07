import Home from "./pages/home/Home.tsx";
import { Routes, Route, Outlet } from "react-router-dom";
import Users from "./pages/users/Users.tsx";
import Products from "./pages/products/Products.tsx";
import Navbar from "./components/navbar/Navbar.tsx";
import Footer from "./components/footer/Footer.tsx";
import Menu from "./components/menu/Menu.tsx";
import Login from "./pages/login/Login.tsx";
import "./styles/global.scss";
import User from "./pages/user/User";
import Product from "./pages/product/Product.tsx";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import PrivateRoute from "./utils/PrivateRoute";
import ProfilePage from "./pages/profile/ProfilePage";
import { CartProvider } from "react-use-cart";
import Cart from "./components/Cart/Cart.tsx";
import Sales from "./pages/sales/Sales.tsx";
import Loss from "./pages/loss/loss.tsx";
import Expenses from "./pages/expenses/expenses.tsx";

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
