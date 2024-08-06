import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import SignupPage from "./pages/SignUp/SignupPage";
import { Footer } from './pages/components/Footer';

function App() {

  return (
    <>
      {/* <h1 className="text-3xl font-extrabold text-red-600">Hello world!</h1> */}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Router>

      <Footer />
    </>
  );
}

export default App;
