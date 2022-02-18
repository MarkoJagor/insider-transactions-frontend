import { useContext, useEffect } from 'react';
import { ProSidebar, Menu, MenuItem, SidebarFooter, SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';
import logo from '../images/fiLogo.png'
import AccountContext from '../context/AccountContext';
import AccountService from '../services/AccountService';

const SideNavComponent = () => {
    const today = new Date();
    const navigate = useNavigate()
    const { userId, setUsername, setUserId, setWasLoggedOut } = useContext(AccountContext)

    useEffect(() => {
        const currentUser = AccountService.getCurrentUser();
        if (currentUser) {
            setUsername(currentUser.username)
            setUserId(currentUser.id)
        }
    }, [])

    const logout = async () => {
        setUsername('');
        setUserId('');
        AccountService.logout();
        navigate("/login");
        setWasLoggedOut(true)
    }

    return (
        <nav style={{ top: 0, height: '100vh', position: 'sticky' }} >
            <ProSidebar>
                <SidebarHeader>
                    <div style={{ textAlign: 'center' }}>
                        <div>
                            {<img src={logo} alt="logo" style={{ height: '100px', width: '100px', paddingTop: '10px' }} />}
                        </div>
                        TEHINGUTE REGISTER
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <Menu iconShape="square">
                        <MenuItem icon={<i className='pi pi-briefcase'></i>}>
                            Tehingute register
                            <Link to="/" />
                        </MenuItem>
                        {
                            userId && <MenuItem icon={<i className='pi pi-eye'></i>}>
                                <Link to="/">Jälgimisnimekiri</Link>
                            </MenuItem>
                        }
                        <MenuItem icon={<i className='pi pi-sign-in'></i>}>
                            {
                                userId ? (<span onClick={logout}>Logi välja</span>)
                                    :
                                    (<Link to="/login" >Logi sisse</Link>)
                            }
                        </MenuItem>
                    </Menu>
                </SidebarContent>
                <SidebarFooter>
                    <div style={{ textAlign: 'center' }}>
                        <p>COPYRIGHT &copy; {today.getFullYear()}</p>
                        <p>Marko Jagor</p>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </nav>
    );
};

export default SideNavComponent;
