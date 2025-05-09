import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Form from "./components/form/Form.jsx";
import Info from "./components/main/Info.jsx";
import Login from "./components/form/Login.jsx";
import Register from "./components/form/Register.jsx";
import UserDashbord from "./components/user/UserDashbord.jsx";
import HousePost from "./components/form/HousePost.jsx";
import Owner from "./components/form/Owner.jsx";
import OwnerDashboard from "./components/Owner/OwnerDashboard.jsx";
import EditProperty from "./components/Owner/EditProperty.jsx";
import { AuthProvider } from "./components/AuthContext.jsx";
import OwnerLogin from "./components/form/OwnerLogin.jsx";
import { OwnerAuthProvider } from "./components/OwnerContextAuth.jsx";
//import Loading from "./components/Loading";
import { DashProvider } from "./components/ShowDashContext.jsx";
import PanoramicViewer from "./components/main/Panoramic.jsx";
import StripeCheckout from "./components/Stripe/StripeCheckout.jsx";
import PropertyForm from "./components/form/PropertyForm.jsx";

function App() {
  return (
    <BrowserRouter>
      {/* Wrapping the entire app with both context providers */}
      <AuthProvider>
        <OwnerAuthProvider>
          <DashProvider>
            <Routes>
              {/* User routes */}

              <Route path="/" element={<Home />} />
              <Route path="/reserve/:id" element={<Form />} />
              <Route path="/info/:id/:type" element={<Info />} />
              <Route path="/reserve/property/:id" element={<PropertyForm />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/user/dashbord" element={<UserDashbord />} />
              <Route path="/user/panoramic/:id" element={<PanoramicViewer />} />
              <Route path="/user/payement" element={<StripeCheckout />} />

              {/* Owner routes */}
              <Route path="/owner/Login" element={<OwnerLogin />} />
              <Route path="/owner/SignUp" element={<Owner />} />
              <Route path="/owner/dash/posthome" element={<HousePost />} />
              <Route path="/owner/dash" element={<OwnerDashboard />} />
              <Route path="/owner/dash/edit/:id" element={<EditProperty />} />
            </Routes>
          </DashProvider>
        </OwnerAuthProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
