import "./App.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home/Home.js";
import Navbar from "./components/Navbar/Navbar.js";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import AuthForm from "./pages/AuthForm/AuthForm";
import AddProd from "./pages/AddProd/AddProd";
import GetProd from "./pages/GetProd/GetProd";
import UserProfile from "./pages/UserProfile/UserProfile.js";

function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/AuthForm" element={<AuthForm />} />
          <Route path="/addprod" element={<AddProd />} />
          <Route path="/getprod" element={<GetProd />} />

          {/* <Route path="/chkpass" element={<ChkPassword />} /> */}
        </Routes>
        <Footer />
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
