import React from 'react'

const ServerHeader: React.FC = () => {
  return (
    <div className="flex flex-row items-center justify-between w-full px-5 py-5 border-b border-cyber-dim">
      <h5 className="font-normal text-lg"><span className="text-cyber-white text-opacity-30">&gt;</span> Discover Servers</h5>
      <input
        className="font-light text-sm px-3 py-2 w-full max-w-xs bg-cyber-black border border-cyber-white border-opacity-20 focus:border-cyber-green focus:outline-none"
        type="text"
        placeholder="Search server name"
      />
    </div>
  )
}

export default ServerHeader