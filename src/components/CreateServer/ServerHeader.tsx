import React from 'react'

const CreateServerHeader: React.FC = () => {
  return (
    <div className="flex flex-row items-center justify-between w-full px-5 py-2 border-b border-cyber-dim">
      <h5 className="font-normal text-base"><span className="text-cyber-white text-opacity-50">&gt;</span> My Servers &rarr; Create Server</h5>
      <input
        className="font-light text-sm px-1 py-3 w-full max-w-xs bg-cyber-black border-b border-cyber-white border-opacity-20 focus:border-cyber-green focus:outline-none"
        type="text"
        placeholder=">> Search server name"
      />
    </div>
  )
}

export default CreateServerHeader