import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../Store/Slices/usersApiSlice';
import { setCredentials } from '../Store/Slices/authSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector(state => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate('/')
        } catch (error) {
            console.log(error?.data?.message || error.error)
        }
    }

    return (
        <div className='login-wrapper'>
            <div className='container mx-auto'>
                <div className='form-wrapper border border-1 border-blue-500 p-5 rounded-lg'>
                    <h2 className='text-2xl font-bold mb-4'>Login Now</h2>
                    <div className='form-group mb-4 w-2/4'>
                        <input onChange={e => setEmail(e.target.value)} className='border border-1 border-yellow-500 p-3 w-full' type='text' placeholder='Enter your email' />
                    </div>
                    <div className='form-group mb-4 w-2/4'>
                        <input onChange={e => setPassword(e.target.value)} className='border border-1 border-yellow-500 p-3 w-full' type='text' placeholder='Enter your password' />
                    </div>

                    <button type='button' onClick={submitHandler} className='text-white bg-red-500 p-3 rounded-md flex'>
                        {isLoading && <svg className="animate-spin h-5 w-5 mr-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"></svg>}
                        Login
                    </button>
                    <p className='mt-4'>Don't have an account <Link to='/register'>Register here</Link> </p>
                </div>
            </div>
        </div>
    )
}

export default Login
