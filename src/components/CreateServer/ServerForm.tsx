import React from 'react'
import { useForm } from 'react-hook-form'
import useSWR from 'swr'

type GeekProps = {
  host: any
}

interface FormData {
  server_status: string
  server_passcode?: string
  server_name: string
}

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init)
  return res.json()
}

const CreateServerForm: React.FC<GeekProps> = ({ host }) => {

  const { data: servers, mutate } = useSWR('/api/server/get/servers', fetcher, {
    refreshInterval: 1000
  })

  const { register, handleSubmit, setError, setValue, reset, clearErrors, formState: { errors, isSubmitting } } = useForm<FormData>()

  const [serverStatus, setServerStatus] = React.useState(false)

  function onPublic() {
    setServerStatus(false)
  }

  function onPrivate() {
    setServerStatus(true)
  }

  function changeStatus(e: any) {
    setValue('server_status', (e.target.value), {
      shouldValidate: true,
      shouldDirty: true
    })
    if (e.target.value === '') {
      onPublic()
    } else {
      if (e.target.value === 'Private' || e.target.value === 'PRIVATE' || e.target.value === 'private' || e.target.value === 'Public' || e.target.value === 'PUBLIC' || e.target.value === 'public') {
        if (e.target.value === 'Private' || e.target.value === 'private' || e.target.value === 'PRIVATE') {
          onPrivate()
        } else {
          onPublic()
        }
        clearErrors('server_status')
      } else {
        setError('server_status', {
          type: 'manual',
          message: 'Invalid server status, type Public or Private only.',
        })
      }
    }
  }

  async function handleCreate(formData: FormData) {
    const user_id = host.id
    const server_status = formData.server_status
    const server_passcode =  formData.server_passcode
    const server_name = formData.server_name
    const check_server = servers.find((server: { name: string }) => server.name === server_name)

    if (check_server) {
      setError('server_name', {
        type: 'manual',
        message: 'Server name already exist.',
      })
      return
    }

    if (server_status === 'public' || server_status === 'Public' || server_status === 'PUBLIC' || server_status === 'private' || server_status === 'Private' || server_status === 'PRIVATE') {
      // promise to create a server
      await fetch('/api/server/post/create_server', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id,
          server_status,
          server_passcode,
          server_name
        })
      })

      if (server_status === 'public' || server_status === 'Public' || server_status === 'PUBLIC') {
        // promise to auto join to public server after created the server
        await fetch('/api/joinserver/public', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: user_id,
            serverName: server_name
          })
        })
      }
  
      if (server_status === 'private' || server_status === 'Private' || server_status === 'PRIVATE') {
        // promise to auto join to private server after created the server
        await fetch('/api/joinserver/private', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: user_id,
            serverName: server_name
          })
        })
      }
    
      reset()
      onPublic()
      mutate(`/api/server/get/created_servers/${host.id}`)
    } else {
      setError('server_status', {
        type: 'manual',
        message: 'Invalid server status, type Public or Private only.',
      })
    }
  } 

  return (
    <div className="flex flex-col w-full py-5 px-3 bg-cyber-dim border-b border-cyber-white border-opacity-10">
      <form onSubmit={handleSubmit(handleCreate)} className="flex flex-col w-full">
        <div className="flex flex-col w-full">
          <div className="flex flex-row items-center">
            <div className="flex items-center">
              <span className="text-cyber-white text-opacity-50">&gt;</span>&nbsp;Server Name&nbsp;
              <span className="text-cyber-white text-opacity-50"> : </span>&nbsp;
            </div>
            {!isSubmitting && (
              <div className="form-control">
                <input
                  className="font-light text-cyber-white bg-cyber-dim focus:outline-none"
                  type="text"
                  placeholder="Type here..."
                  {...register("server_name", {
                    required: true
                  })}
                />
              </div>
            )}
            {isSubmitting && (
              <div className="font-light text-cyber-white bg-cyber-dim focus:outline-none">
                Creating...
              </div>
            )}
          </div>
          {errors.server_name && <p className="font-light text-xs text-red-500">{errors.server_name.message || 'Server name cannot be empty.'}</p>}
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-row items-center">
            <div className="flex items-center">
              <span className="text-cyber-white text-opacity-50">&gt;</span>&nbsp;Server Status&nbsp;
              <span className="text-cyber-white text-opacity-50"> : </span>&nbsp;
            </div>
            {!isSubmitting && (
              <div className="form-control">
                <input
                  className="font-light text-cyber-white bg-cyber-dim focus:outline-none"
                  type="text"
                  placeholder="Type Public or Private..."
                  {...register("server_status", {
                    required: true
                  })}
                  onChange={changeStatus}
                />
              </div>
            )}
            {isSubmitting && (
              <div className="font-light text-cyber-white bg-cyber-dim focus:outline-none">
                Processing...
              </div>
            )}
          </div>
          {errors.server_status && <p className="font-light text-xs text-red-500">{errors.server_status.message || 'Server status cannot be empty.'}</p>}
        </div>
        {serverStatus && (
          <div className="flex flex-col w-full">
            <div className="flex flex-row items-center">
              <div className="flex items-center">
                <span className="text-cyber-white text-opacity-50">&gt;</span>&nbsp;Server Passcode&nbsp;
                <span className="text-cyber-white text-opacity-50"> : </span>&nbsp;
              </div>
              <div className="form-control">
                <input
                  className="font-light text-cyber-white bg-cyber-dim focus:outline-none"
                  type="password"
                  placeholder="Enter passcode"
                  {...register("server_passcode", {
                    required: true
                  })}
                />
              </div>
            </div>
            {errors.server_passcode && <p className="font-light text-xs text-red-500">{errors.server_passcode.message || 'Server passcode cannot be empty.'}</p>}
          </div>
        )}
        <div className="flex flex-row items-center justify-end w-full mt-3 space-x-3">
          <button 
            className="flex items-center justify-end font-light text-sm text-cyber-white hover:underline focus:outline-none"
            type="submit"
          >
            <span className="text-cyber-white text-opacity-50">&gt;</span>&nbsp;Create
          </button>
          <button 
            className="flex items-center justify-end font-light text-sm text-red-500 hover:underline focus:outline-none"
            type="button"
            onClick={() => reset()}
          >
            <span className="text-cyber-white text-opacity-50">&gt;</span>&nbsp;Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateServerForm