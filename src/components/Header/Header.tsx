
import './Header.css';
import JellyIcon from '../../../src/assets/images/jelly96-right.png';
import { Link, useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import JellyFish from '../../../src/assets/images/jellyfishImage.png'
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import AccountMenu from '../AccountMenu/AccountMenu';
import CreateMenu from '../CreateMenu/CreateMenu';
import { boardColors } from '../../styles/colors';

interface HeaderProps {
  backgroundColor?: string;
}
const Header: React.FC<HeaderProps> = ({backgroundColor="default"}) => {

  const headerStyle = {
    background: boardColors[backgroundColor]?.header || "linear-gradient(180deg, #018f94, #00335a)"
  };

  const { user } = useAuth();
  const [isAccountMenuVisible, setIsAccountMenuVisible] = useState(false);
  const [isCreateMenuVisisble, setIsCreateMenuVisible] = useState(false);
  const navigate = useNavigate();

  const toggleOverlay = () => {
    setIsAccountMenuVisible(prevState => !prevState);
  }
  const toggleCreateOverlay = () => {
    setIsCreateMenuVisible(prevState => !prevState);
  }
  const getStarted = () => {
    navigate('/signup');
  }

  return (
    <header className="header" style={headerStyle}>
      <div className='headerLeft'>
        <img id='jellyicon' src={JellyIcon} style={{ width: 90, height: 'auto' }} />
        <Link to="/" className='nav-link'>
          <h1 id='appname'>Jellio</h1>
        </Link>
        <div className='nav-links'>
          <Link to="/" className='nav-link'>Home</Link>
          <Link to="/workspaces" className='nav-link'>Workspaces</Link>
          {
            user ? (
              <div className='createHeaderContainer'>
              <button className='createInHeader' onClick={toggleCreateOverlay}>Create</button>
              <div className='createWrapper'>
                {isCreateMenuVisisble && <CreateMenu closeCreateOverlay={toggleCreateOverlay} />}
              </div>
            </div>
            ) : (
              <div className='createHeaderContainer'>
              <button className='createInHeader' onClick={getStarted}>Get started</button>
            </div>
            )
          }
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
              {isAccountMenuVisible && <AccountMenu closeOverlay={toggleOverlay} />}
            </>
          )
        }
      </div>
    </header>
  );
};

export default Header;