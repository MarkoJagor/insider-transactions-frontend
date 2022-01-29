import { ProSidebar, Menu, MenuItem, SidebarFooter, SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';
import logo from '../images/fiLogo.png'

const SideNavComponent = () => {
    const today = new Date();

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
