import React from 'react'

const CreateServerBody: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-full overflow-y-auto bg-cyber-dim">
      <div className="flex flex-row justify-between w-full">
        <div className="flex w-full text-cyber-violet text-lg px-3 py-5 border-b border-cyber-white border-opacity-10">
          <span className="text-cyber-white text-opacity-50">$</span>&nbsp;My Server Name
        </div>
      </div>
    </div>
  )
}

export default CreateServerBody