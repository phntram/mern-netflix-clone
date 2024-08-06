import { useAuthStore } from '../../store/authUser';
import { Navbar } from '../components/Navbar';

export const HomeScreen = () => {

    return (
        <>
            <div className='relative h-screen text-white bg-black'>
                <Navbar />
            </div>
        </>
    );
};
