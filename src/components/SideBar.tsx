import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface GeekProps {
  hostname: any
}

const SideBar: React.FC<GeekProps> = ({ hostname }) => {

  const router = useRouter()

  return (
    <div className="flex flex-col w-full h-full py-5 space-y-5">
      <div className="flex flex-col w-full max-w-xl px-3 space-y-1">
        <h1 className="font-bold text-xl text-cyber-white">&gt; GeekTalk💻</h1>
      </div>
      <div className="flex flex-col w-full space-y-2">
        <div className="flex flex-col w-full px-3 space-y-1">
          <div className="flex items-center mb-3 w-full space-x-1 font-light text-sm text-cyber-white text-opacity-80">
            <span className="text-cyber-green text-xl">&bull;</span>
            <h6>{ hostname.name }</h6>
          </div>
          <Link href="/">
            <a className={`${ router.pathname === '/' ? 'text-cyber-violet' : 'text-cyber-white text-opacity-80' } font-light text-sm hover:underline`}><span className="text-cyber-white text-opacity-50">&gt;</span> Discover Servers</a>
          </Link>
          <Link href="/create-server">
            <a className={`${ router.pathname === '/create-server' ? 'text-cyber-violet' : 'text-cyber-white text-opacity-80' } font-light text-sm hover:underline`}><span className="text-cyber-white text-opacity-50">&gt;</span> Create Server</a>
          </Link>
          <Link href="/settings">
            <a className={`${ router.pathname === '/settings' ? 'text-cyber-violet' : 'text-cyber-white text-opacity-80' } font-light text-sm hover:underline`}><span className="text-cyber-white text-opacity-50">&gt;</span> Settings</a>
          </Link>
          <button
            className="flex w-full font-light text-sm text-cyber-white text-opacity-80 hover:underline"
            onClick={async () => {
              await fetch('/api/auth/signout', {
                method: 'POST',
                headers : { 
                  'Content-Type': 'application/json',
                }
              })
              router.push('/signin')
            }}
          >
            <span className="text-cyber-white text-opacity-50">&gt;</span>&nbsp;Signout
          </button>
        </div>
        <span className="border-b border-cyber-white border-opacity-10" />
      </div>
      <div className="flex flex-col w-full h-full px-3 space-y-2">
        <div className="flex flex-row items-center justify-between w-full">
          <h5 className="font-light text-sm"><span className="text-cyber-white text-opacity-50">$</span> Global Server</h5>
          <Link href="/server">
            <a className="font-light text-xs text-cyber-white hover:underline">&gt; Chat</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SideBar