import React from 'react'

const Layout: React.FC = ({ children }) => {
  return (
    <div className="font-firacode flex flex-row items-center justify-center w-full h-screen bg-cyber-black text-cyber-green">
      { children }
    </div>
  )
}

export default Layout