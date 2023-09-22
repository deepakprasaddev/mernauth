
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Home = () => {
    const user = useSelector(state => state.auth);

    return (
        <div className='home-wrapper'>
            <div className='container mx-auto'>
                {user.userInfo ? (<>

                    <div className='card shadow bg-slate-200 border border-cyan-400 flex-col p-5 h-48 flex items-center justify-center'>
                        <h2 className='text-3xl text-yellow-400 mb-3'>Welcome {user?.userInfo?.name}</h2>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum delectus illo veniam omnis architecto, aperiam iure hic quia eos similique optio molestiae aut veritatis suscipit ratione cum modi vitae facilis.</p>
                    </div>
                </>) : (<>
                    <div className='card shadow bg-slate-200 border border-cyan-400 flex-col p-5 h-48 flex items-center justify-center'>
                        <h2 className='text-3xl text-yellow-400 mb-3'>MERN AUTHENTICATION</h2>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum delectus illo veniam omnis architecto, aperiam iure hic quia eos similique optio molestiae aut veritatis suscipit ratione cum modi vitae facilis.</p>
                        <div className='flex'>
                            <Link to='/login' className='p-3 bg-blue-400 mt-4 rounded-md text-white font-bold mr-4'>Login</Link>
                            <Link to='/register' className='p-3 bg-blue-400 mt-4 rounded-md text-white font-bold mr-4'>Register</Link>
                        </div>
                    </div>
                </>)}

            </div>
        </div>
    )
}

export default Home