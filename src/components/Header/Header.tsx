
import './Header.css'; 
import JellyIcon from '../../../src/assets/images/jellyfish.png';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <header className="header">

      <img  id='jellyicon' src={JellyIcon} />
           <Link to="/" className='nav-link'><h1 id='appname'>Jellio</h1></Link> 
      <div className='nav-links'>
      <Link to="/" className='nav-link'>Home</Link>
      <Link to="/createboard" className='nav-link'>Board</Link>
      </div>
   
    </header>
  );
};

export default Header;