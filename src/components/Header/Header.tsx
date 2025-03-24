
import './Header.css';
import JellyIcon from '../../../src/assets/images/jelly96-right.png';
import { Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import JellyFish from '../../../src/assets/images/jellyfishImage.png'
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import AccountMenu from '../AccountMenu/AccountMenu';
const Header = () => {

  const { user } = useAuth();
  const [isAccountMenuVisible, setIsAccountMenuVisible] = useState(false);

  const toggleOverlay = () => {
    setIsAccountMenuVisible(prevState => !prevState);
  }

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
          <Link to="/login" className='nav-link'>Login</Link>
          <Link to="/signup" className='nav-link'>Sign up</Link>
        </div>
      </div>
      <div className='headerRight'>
        {
          !user ? (
            <Link to="/login">
              <button className='profileButton'><CgProfile size={35} />
              </button>
            </Link>
          ) : (
            <>
              <button className='profileButton' onClick={toggleOverlay}>
                <img src={user.profilePic ?? JellyFish} id='jellyProfile' />
              </button>
              {isAccountMenuVisible && <AccountMenu closeOverlay={toggleOverlay}  /> }
            </>
          )
        }
      </div>
    </header>
  );
};

export default Header;