import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import SignupPage from "./pages/SignUp/SignupPage";
import { Footer } from './components/Footer.jsx';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authUser';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';
import { WatchPage } from './pages/Details/WatchPage.jsx';
import { SearchPage } from './pages/Search/SearchPage.jsx';
import { SearchHistoryPage } from './pages/Search/SearchHistoryPage.jsx';
import { NotFoundPage } from './pages/NotFound/NotFoundPage.jsx';

function App() {
	const { user, isCheckingAuth, authCheck } = useAuthStore();

	useEffect(() => {
		authCheck();
	}, [authCheck]);

	if (isCheckingAuth) {
		<div className='h-screen'>
			<div className='flex justify-center items-center bg-black h-full'>
				<Loader className='animate-spin text-red-600 size-10' />
			</div>
		</div>;
	}
	return (
		<>
			{/* <h1 className="text-3xl font-extrabold text-red-600">Hello world!</h1> */}
			<Router>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/login" element={!user ? <LoginPage /> : <Navigate to={"/"} />} />
					<Route path="/signup" element={!user ? <SignupPage /> : <Navigate to={"/"} />} />
					<Route path="/watch/:id" element={user ? <WatchPage /> : <Navigate to={"/login"} />} />
					<Route path='/search' element={user ? <SearchPage /> : <Navigate to={"/login"} />} />
					<Route path='/history' element={user ? <SearchHistoryPage /> : <Navigate to={"/login"} />} />
					<Route path='/*' element={<NotFoundPage />} />
				</Routes>
			</Router>

			<Footer />

			<Toaster />
		</>
	);
}

export default App;
