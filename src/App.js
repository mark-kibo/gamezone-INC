import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";
import Home from "./pages/home/home";
import List from "./pages/list/list";
import New from "./pages/new/new";
import Single from "./pages/single/single";
import { FiSettings } from "react-icons/fi"
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useState } from "react";
function App() {
  const activeMenu=useState(false)
  return (
    <div>
      {/* <Routes>
        <Route path="/">
          <Route index element={<Home/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="users">
              <Route index element={<List/>}/>
              <Route path=":userid" element={<Single/>}/>
              <Route path="new" element={<New/>}/>
          </Route>
          <Route path="products">
              <Route index element={<List/>}/>
              <Route path=":productid" element={<Single/>}/>
              <Route path="newproduct" element={<New/>}/>
          </Route>
        </Route>
      </Routes> */}
      
      <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4" style={{zIndex: "1000"}}>
          <TooltipComponent content="settings" position="Top">
              <button type="button" className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"
              style={{
                background:"blue",
                borderRadius:"50%"
              }}>
                <FiSettings/>
              </button>
          </TooltipComponent>

        </div>
        {
          activeMenu ? (
            <div className="w-72  fixed sidebar dark:bg-secondary-dark-bg bg-white">
              sidebar
            </div>
          ): (
            <div className="w-0 dark:bg-secondary-dark-bg">
              sidebar
            </div>
          )
        }
        <div className={
          `dark:bg-main-bg bg-main-bg min-h-screen w-full
          ${activeMenu} ? md:l-72 
          :  flex-2`
        }>
            <div className="fixed md-static bg-main-bg dark:bg-main-bg navbar w-full">
              navbar
            </div>
        </div>
        <div>
          <Routes>
            <Route path="/" element="ecommerce"/>
            <Route path="/ecommerce" element="ecommerce"/>
            <Route path="/orders" element="orders"/>
            <Route path="/employees" element="customers"/>
            <Route path="/customers" element="enployees"/>
          </Routes>
        </div>

      </div>
    </div>
  );
}

export default App;
