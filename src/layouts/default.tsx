import React from 'react'
import SideBar from '~/components/SideBar'

const Layout: React.FC = ({ children }) => {
  return (
    <div className="font-firacode flex flex-row items-center justify-center w-full h-screen cursor-default bg-cyber-black text-cyber-green">
      <div className="flex flex-col w-full max-w-xs h-full overflow-y-auto">
        <SideBar />
      </div>
      <div className="flex flex-col w-full h-full border-l border-cyber-white border-opacity-10">
        { children }
      </div>
    </div>
  )
}

export default Layout