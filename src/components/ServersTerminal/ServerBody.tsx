import React from 'react'
import useSWR from 'swr'

interface GeekProps {
  servers: any
}

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init)
  return res.json()
}

const ServerBody: React.FC<GeekProps> = ({ servers }) => {

  const { data: server_data } = useSWR('/api/server/get/servers', fetcher, {
    refreshInterval: 1000,
    fallbackData: servers
  })

  console.log(server_data)

  return (
    <div className="flex flex-col w-full h-full overflow-y-auto bg-cyber-dim">
      {server_data.map((server: any, i: any) => (
        <div className="flex flex-row justify-between w-full border-b border-cyber-white border-opacity-10" key={i}>
          <div className="flex w-full text-cyber-violet text-base px-3 py-5">
            <span className="text-cyber-white text-opacity-50">$</span>&nbsp;{ server.name }
          </div>
          <button 
            className="flex items-center justify-end w-full max-w-xs px-5 font-light text-sm text-cyber-white hover:underline focus:outline-none"
            type="submit"
          >
            &gt; Join
          </button>
        </div>
      ))}
    </div>
  )
}

export default ServerBody