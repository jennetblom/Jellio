
import './Header.css';
import JellyIcon from '../../../src/assets/images/jellyfish.png';
import { Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import JellyFish from '../../../src/assets/images/jellyfishImage.png'
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {user} = useAuth();
  
  return (
    <header className="header">
      <div className='headerLeft'>
        <img id='jellyicon' src={JellyIcon} />
        <Link to="/" className='nav-link'><h1 id='appname'>Jellio</h1></Link>
        <div className='nav-links'>
          <Link to="/" className='nav-link'>Home</Link>
          <Link to="/createboard" className='nav-link'>Board</Link>
          <Link to="/login" className='nav-link'>Dragable</Link>
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
            <button className='profileButton'><img src={user?.photoURL ?? JellyFish} id='jellyProfile' />
            </button>
            </Link> 
          )
        }


      </div>

    </header>
  );
};

export default Header;