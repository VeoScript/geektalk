import React from 'react'

const SideBar: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-full px-3 py-5 space-y-5">
      <div className="flex flex-col w-full max-w-xl space-y-1">
        <h1 className="font-bold text-xl text-cyber-white">GeekTalk💻</h1>
        <p className="font-light text-xs text-cyber-white text-opacity-80">Try to ask some questions, maybe we have an answers for that.</p>
      </div>
      <div className="flex flex-col w-full h-full space-y-2">
        <div className="flex flex-row items-center justify-between w-full">
          <h5 className="font-light text-sm"><span className="text-cyber-white">$</span> Global Server</h5>
          <button className="font-light text-sm text-cyber-white hover:underline">{`Chat >`}</button>
        </div>
        <div className="flex flex-row items-center justify-between w-full">
          <h5 className="font-light text-sm"><span className="text-cyber-white">$</span> Hacking Site</h5>
          <button className="font-light text-sm text-cyber-white hover:underline">{`Chat >`}</button>
        </div>
        <div className="flex flex-row items-center justify-between w-full">
          <h5 className="font-light text-sm"><span className="text-cyber-white">$</span> Religious Group</h5>
          <button className="font-light text-sm text-cyber-white hover:underline">{`Chat >`}</button>
        </div>
      </div>
    </div>
  )
}

export default SideBar