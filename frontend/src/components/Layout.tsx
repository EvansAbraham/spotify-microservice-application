import NavBar from './NavBar';
import Player from './Player';
import SideBar from './SideBar';
import type { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

const Layout= ({children}: LayoutProps) => {
  return (
    <div className="h-screen">
        <div className="h-[90%] flex">
            <SideBar/>
            <div className='w-full m-2 px-6 pt-4 rounded bg-[#212121] overflow-auto lg:w-[75%] lg:ml-0'>
                <NavBar/>
                {children}
            </div>
        </div>
        <Player/>
    </div>
  )
}

export default Layout