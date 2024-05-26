import './navbar.css'
import { Link } from 'react-router-dom'

function Navbar(){
    // let keyToRemove = ['token', "student"]
    // for(key of keyToRemove){
    //     localStorage.removeItem(key);
    // }
    
    // const localRemove = () => {
    //     localStorage.removeItem('token', 'student')
    // }
    return(
        <div className="container">
                <div className='row'>
                <div className="col-md-12">
                    <ul className='d-flex justify-content-center mt-4'>
                        <li className='mx-4'>
                            <Link className='navbar_item' to="/subject">Subject</Link>
                        </li>
                        <li className='mx-4'>
                            <Link className='navbar_item' to="/group">Group</Link>
                        </li>
                        <li className='mx-4'>
                            <Link className='navbar_item' to="/teacher">Teacher</Link>
                        </li>
                        <li className='mx-4'>
                            <Link className='navbar_item' to="/cost">Cost</Link>
                        </li>
                        <li className='mx-4'>
                            <Link className='navbar_item' to="/">
                                <i className="bi bi-escape" onClick={()=>localStorage.clear()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-escape" viewBox="0 0 16 16">
                                        <path d="M8.538 1.02a.5.5 0 1 0-.076.998 6 6 0 1 1-6.445 6.444.5.5 0 0 0-.997.076A7 7 0 1 0 8.538 1.02Z"/>
                                        <path d="M7.096 7.828a.5.5 0 0 0 .707-.707L2.707 2.025h2.768a.5.5 0 1 0 0-1H1.5a.5.5 0 0 0-.5.5V5.5a.5.5 0 0 0 1 0V2.732l5.096 5.096Z"/>
                                    </svg>
                                </i>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Navbar