import React from 'react'

const ServerBody: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-full overflow-y-auto bg-cyber-dim">
      <div className="flex flex-row justify-between w-full border-b border-cyber-white border-opacity-10">
        <div className="flex w-full text-cyber-violet text-base px-3 py-5">
          <span className="text-cyber-white text-opacity-50">$</span>&nbsp;Server Name
        </div>
        <button 
          className="flex items-center justify-end w-full max-w-xs px-5 font-light text-sm text-cyber-white hover:underline focus:outline-none"
          type="submit"
        >
          &gt; Join
        </button>
      </div>
    </div>
  )
}

export default ServerBody