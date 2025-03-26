import React from 'react'
import './AccountMenu.css'
import { useAuth } from '../../context/AuthContext';
import JellyFish from '../../../src/assets/images/jellyfishImage.png'
import { useNavigate } from 'react-router-dom';



interface AccountMenuProps {
    closeOverlay: () => void;

}


const AccountMenu: React.FC<AccountMenuProps> = ({ closeOverlay }) => {

    const { user, logout, setUser } = useAuth();
    const navigate = useNavigate();
    const handleClose = () => {
        closeOverlay();
    }
    const handleLogout = async () => {
        try {
          await logout();
          setUser(null);
          navigate("/login");
        } catch (error) {
          console.error("Logout failed", error);
        }
      };
    return (
        <div className="accountOverlay" onClick={handleClose}>
            <div className='accountContent'>
                <p>Account</p>
                <div className='placeInRightPlace'>
                    <img src={user?.profilePic ?? JellyFish} className='accountMenuPic' />
                    <div>
                        <p>{user?.username}</p>
                        <p>{user?.email}</p>
                    </div>
                </div>
                <hr ></hr>
                <div className='logOut' onClick={handleLogout}>
                    <p>Log out</p>
                </div>
            </div>
        </div>
    )
}

export default AccountMenu