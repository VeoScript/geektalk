import React from 'react'

const ServerBody: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-full overflow-y-auto bg-cyber-dim">
      <div className="flex flex-row justify-between w-full">
        <div className="flex w-full text-cyber-violet text-lg px-3 py-5 border-b border-cyber-white border-opacity-10">
          <span className="text-cyber-white text-opacity-50">$</span>&nbsp;Server Name
        </div>
        <button 
          className="font-bold text-base px-5 py-3 w-full max-w-[8rem] border border-cyber-black text-cyber-black bg-cyber-violet focus:outline-none"
          type="submit"
        >
          Join
        </button>
      </div>
    </div>
  )
}

export default ServerBody