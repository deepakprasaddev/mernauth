import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../Store/Slices/usersApiSlice';
import { setCredentials } from '../Store/Slices/authSlice';


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();

    const { userInfo } = useSelector(state => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match')
        } else {
            try {
                const res = await register({ name, email, password }).unwrap();
                dispatch(setCredentials({ ...res }));
                navigate('/')
            } catch (error) {
                console.log("Register ", error)
            }
        }
    }

    return (
        <div className='register-wrapper'>
            <div className='container mx-auto'>
                <div className='form-wrapper border border-1 border-blue-500 p-5 rounded-lg'>
                    <h2 className='text-2xl font-bold mb-4'>Register Now</h2>
                    <div className='form-group mb-4 w-2/4'>
                        <input onChange={e => setName(e.target.value)} className='border border-1 border-yellow-500 p-3 w-full' type='text' placeholder='Enter your Name' />
                    </div>
                    <div className='form-group mb-4 w-2/4'>
                        <input onChange={e => setEmail(e.target.value)} className='border border-1 border-yellow-500 p-3 w-full' type='text' placeholder='Enter your email' />
                    </div>
                    <div className='form-group mb-4 w-2/4'>
                        <input onChange={e => setPassword(e.target.value)} className='border border-1 border-yellow-500 p-3 w-full' type='text' placeholder='Enter your password' />
                    </div>
                    <div className='form-group mb-4 w-2/4'>
                        <input onChange={e => setConfirmPassword(e.target.value)} className='border border-1 border-yellow-500 p-3 w-full' type='text' placeholder='Confirm your password' />
                    </div>
                    <button onClick={submitHandler} type='button' className='text-white bg-red-500 p-3 rounded-md'>
                        {isLoading && <svg className="animate-spin h-5 w-5 mr-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"></svg>}
                        Register
                    </button>
                    <p className='mt-4'>Already have an account <Link to='/login'>Login here</Link> </p>
                </div>
            </div>
        </div>
    )
}

export default Register
