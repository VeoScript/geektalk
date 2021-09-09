import React from 'react'

const ChatBody: React.FC = () => {
  return (
    <div className="relative w-full h-full overflow-y-auto overflow-x-hidden bg-cyber-dim">
      <div className="absolute bottom-3 left-3 flex flex-col w-full">
        <div className="flex flex-row items-center w-full space-x-2">
          <span className="font-normal text-cyber-white text-opacity-30">{`>`}</span>
          <span className="font-light text-sm text-cyber-white">little_boy <span className="text-cyber-white">:</span></span>
          <span className="font-light text-sm text-cyber-green">can you teach me how to hack?</span>
        </div>
        <div className="flex flex-row items-center w-full space-x-2">
          <span className="font-normal text-cyber-white text-opacity-30">{`>`}</span>
          <span className="font-light text-sm text-cyber-violet">unknown_hacker <span className="text-cyber-white">:</span></span>
          <span className="font-light text-sm text-cyber-green">sure why not</span>
        </div>
      </div>
    </div>
  )
}

export default ChatBody