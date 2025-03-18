
import './Header.css';
import JellyIcon from '../../../src/assets/images/jelly96-right.png';
import { Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import JellyFish from '../../../src/assets/images/jellyfishImage.png'
import { useAuth } from '../../context/AuthContext';
const Header = () => {

  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className='headerLeft'>
        <img id='jellyicon' src={JellyIcon} style={{ width: 110, height: 'auto' }} />
        <Link to="/" className='nav-link'>
          <h1 id='appname'>Jellio</h1>

        </Link>
        <div className='nav-links'>
          <Link to="/" className='nav-link'>Home</Link>
          <Link to="/workspaces" className='nav-link'>Workspaces</Link>
  {/*         <Link to="/jelliogarden" className='nav-link'>Jellio Garden</Link> */}
          <Link to="/login" className='nav-link'>Login</Link>
        </div>
      </div>
      <div className='headerRight'>
        {
          !user ? (
            <Link to="/login">
              <button className='profileButton'><CgProfile size={30} />
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button className='profileButton' onClick={() => logout()}><img src={user?.photoURL ?? JellyFish} id='jellyProfile' />
              </button>
            </Link>
          )
        }
      </div>
    </header>
  );
};

export default Header;