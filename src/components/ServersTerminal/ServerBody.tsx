import React from 'react'
import useSWR from 'swr'
import JoinPublic from './JoinServer/Public'
import JoinPrivate from './JoinServer/Private'

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

  return (
    <div className="flex flex-col w-full h-full overflow-y-auto bg-cyber-dim">
      {server_data.map((server: any, i: any) => (
        <div className="flex flex-row justify-between w-full border-b border-cyber-white border-opacity-10" key={i}>
          <div className={`${(server.status === 'public' || server.status === 'Public' || server.status === 'PUBLIC') ? `text-cyber-yellow` : `text-cyber-white`} flex w-full text-base text-opacity-80 px-3 py-5`}>
            <span className="text-cyber-white text-opacity-50">$</span>&nbsp;{ server.name }
          </div>
          {(server.status === 'public' || server.status === 'Public' || server.status === 'PUBLIC') && (
            <JoinPublic server={server} />
          )}
          {(server.status === 'private' || server.status === 'Private' || server.status === 'PRIVATE') && (
            <JoinPrivate server={server} />
          )}
        </div>
      ))}
    </div>
  )
}

export default ServerBody