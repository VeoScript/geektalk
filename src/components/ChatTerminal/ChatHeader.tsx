import React from 'react'

const ChatHeader: React.FC = () => {
  return (
    <div className="flex flex-row items-center justify-between w-full px-5 py-5 border-b border-cyber-dim">
      <h5 className="font-normal text-sm"><span className="text-cyber-white text-opacity-30">&gt;</span> Server Name</h5>
      <button className="font-light text-xs text-red-500 hover:underline">
        <span className="text-cyber-white text-opacity-50">&gt;</span> Leave
      </button>
    </div>
  )
}

export default ChatHeader