import React from 'react'

const ChatParticipants: React.FC = () => {
  return (
    <div className="flex flex-col w-full space-y-2 overflow-hidden">
      <div className="flex w-full px-3 py-5 border-b border-cyber-white border-opacity-10">
        <h5 className="font-light text-xs text-cyber-white text-opacity-50">Server Participants</h5>
      </div>
      <div className="flex flex-col w-full px-3 overflow-y-auto space-y-2">
        <div className="flex flex-row items-center w-full space-x-2">
          <div className="font-light text-xs text-cyber-white text-opacity-50">
            &gt; <span className="text-cyber-white text-opacity-50">unknown_hacker</span>
          </div>
        </div>
        <div className="flex flex-row items-center w-full space-x-2">
          <div className="font-light text-xs text-cyber-white text-opacity-50">
            &gt; <span className="text-cyber-white text-opacity-50">little_boy</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatParticipants