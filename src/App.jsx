import { Route, Routes } from "react-router";
import "./App.css";
import DashboardLayout from "./layouts/DashboardLayout";
import DummyHome from "./pages/app/DummyHome";
import DummyLogin from "./pages/authentication/DummyLogin";
import AuthLayout from "./layouts/AuthLayout";
import { BiWrench } from "react-icons/bi";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-screen flex justify-center items-center bg-gray-50 px-6 py-12">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
        {/* Icon Section */}
        <div className="mb-6">
          <div className="flex justify-center items-center bg-blue-100 p-4 rounded-full">
            <BiWrench size={40} className="text-blue-600" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-4">
          We're Under Maintenance
        </h1>

        {/* Subheading */}
       <p className="text-sm sm:text-base text-gray-600 mb-6">
  We're making things even better for you! 🚧 <br />
  Hang tight – we'll be back online shortly. Thanks for your understanding and patience!
</p>


        {/* Estimated Time */}
        {/* <div className="mb-6">
          <span className="text-xs bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full">
            Estimated back: 3:00 PM (UTC)
          </span>
        </div> */}

        {/* Optional: Retry Button */}
        {/* <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Try Again
        </button> */}

        {/* Footer */}
        <p className="mt-8 text-xs text-gray-400">© 2025 RightAway. All rights reserved.</p>
      </div>
    </div>
        }
      />

      <Route path="app" element={<DashboardLayout />}>
        <Route path="dashboard" element={<DummyHome />} />
      </Route>

      <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<DummyLogin />} />
      </Route>

      <Route
        path="*"
        element={<div className="text-7xl">Page Not Found</div>}
      />
    </Routes>
  );
}

export default App;
