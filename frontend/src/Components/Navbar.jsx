import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../Store/Slices/usersApiSlice'
import { logout } from '../Store/Slices/authSlice'

const Navbar = () => {
    const user = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className='nav-wrapper bg-slate-700 p-3 flex items-center'>
            <h3 className='text-2xl text-white mr-5'>Mern Auth</h3>
            <nav className='navbar'>
                <Link to='/' className='text-white mr-4'>Home</Link>
                {user.userInfo ? (
                    <>
                        <Link to='/profile' className='text-white mr-4'>Profile</Link>
                        <button onClick={logoutHandler} className='text-white mr-4' type='button'>Logout</button>
                        <span className='text-yellow-400'>{user?.userInfo?.name}</span>
                    </>
                ) : (
                    <>
                        <Link to='/login' className='text-white mr-4'>Login</Link>
                        <Link to='/register' className='text-white'>Register</Link>
                    </>
                )}
            </nav>
        </div>
    )
}

export default Navbar