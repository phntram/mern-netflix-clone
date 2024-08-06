import { useAuthStore } from '../../store/authUser';

export const HomeScreen = () => {
    const { logout } = useAuthStore();
    return (
        <>
            <div>HomeScreen</div>
            <button onClick={logout}>Logout</button>
        </>
    );
};
