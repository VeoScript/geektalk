import React from 'react'
import useSWR from 'swr'

interface GeekProps {
  host: any
  user_created_servers: any
}

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init)
  return res.json()
}

const CreateServerBody: React.FC<GeekProps> = ({ host, user_created_servers }) => {

  const { data: my_servers } = useSWR(`/api/server/get/created_servers/${host.id}`, fetcher, {
    refreshInterval: 1000,
    fallbackData: user_created_servers
  })

  return (
    <div className="flex flex-col w-full h-full overflow-y-auto bg-cyber-dim">
      {my_servers.map((server: any, i: any) => (
        <div className="flex flex-row justify-between w-full" key={i}>
          <div className="flex w-full text-cyber-yellow text-base px-3 py-5 border-b border-cyber-white border-opacity-10">
            <span className="text-cyber-white text-opacity-50">$</span>&nbsp;{ server.name }
          </div>
        </div>
      ))}
    </div>
  )
}

export default CreateServerBody