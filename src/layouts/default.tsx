import React from 'react'
import SideBar from '~/components/SideBar'

interface GeekProps {
  host: any
  joined_servers: any
}

const Layout: React.FC<GeekProps> = ({ children, host, joined_servers }) => {
  return (
    <div className="font-pangolin flex flex-row items-center justify-center w-full h-screen cursor-default bg-cyber-black text-cyber-green">
      <div className="flex flex-col w-full max-w-xs h-full overflow-y-auto">
        <SideBar host={host} joined_servers={joined_servers} />
      </div>
      <div className="flex flex-col w-full h-full border-l border-cyber-white border-opacity-10">
        { children }
      </div>
    </div>
  )
}

export default Layout