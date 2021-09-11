import React from 'react'

const CreateServerForm: React.FC = () => {
  return (
    <div className="flex flex-row items-center justify-between w-full py-5 px-3 bg-cyber-dim border-b border-cyber-white border-opacity-10">
      <div className="flex flex-row items-center w-full font-light text-base">
        <span className="text-cyber-white text-opacity-50">&gt;</span>&nbsp;Server Name&nbsp;
        <span className="text-cyber-white text-opacity-50"> : </span>&nbsp;
        <input type="text" name="server_name" placeholder="Type here..." className="font-light text-cyber-white bg-cyber-dim focus:outline-none" />
      </div>
      <div className="flex flex-row items-center justify-end w-full space-x-3">
        <button 
          className="flex items-center justify-end font-light text-sm text-cyber-white hover:underline focus:outline-none"
          type="submit"
        >
          <span className="text-cyber-white text-opacity-50">&gt;</span>&nbsp;Create
        </button>
        <button 
          className="flex items-center justify-end font-light text-sm text-red-500 hover:underline focus:outline-none"
          type="submit"
        >
          <span className="text-cyber-white text-opacity-50">&gt;</span>&nbsp;Cancel
        </button>
      </div>
    </div>
  )
}

export default CreateServerForm