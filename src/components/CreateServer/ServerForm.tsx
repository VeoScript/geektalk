import React from 'react'
import { useForm } from 'react-hook-form'
import useSWR from 'swr'

type GeekProps = {
  host: any
}

interface FormData {
  server_status: string
  server_passcode: string
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

  const { register, handleSubmit, setError, reset, clearErrors, formState: { errors, isSubmitting } } = useForm<FormData>()

  const [serverStatus, setServerStatus] = React.useState(false)

  function onPublic() {
    setServerStatus(false)
  }

  function onPrivate() {
    setServerStatus(true)
  }

  function changeStatus(e: any) {
    if (e.target.value === '') {
      clearErrors('server_name')
    }
    if (e.target.value === 'Private' || e.target.value === 'PRIVATE' || e.target.value === 'private' || e.target.value === 'Public' || e.target.value === 'PUBLIC' || e.target.value === 'public') {
      if (e.target.value === 'Private' || e.target.value === 'private' || e.target.value === 'PRIVATE') {
        onPrivate()
      } else {
        onPublic()
      }
      clearErrors('server_name')
    } else {
      setError('server_name', {
        type: 'manual',
        message: 'Invalid server status, type Public or Private only.',
      })
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
    reset()
    onPublic()
    mutate(`/api/server/get/created_servers/${host.id}`)
  }

  return (
    <div className="flex flex-col w-full py-5 px-3 bg-cyber-dim border-b border-cyber-white border-opacity-10">
      <form onSubmit={handleSubmit(handleCreate)} className="flex flex-col items-center justify-between w-full">
        {/* -- server status text-input -- */}
        <div className="flex flex-row items-center w-full font-light text-base">
          <span className="text-cyber-white text-opacity-50">&gt;</span>&nbsp;Server Status&nbsp;
          <span className="text-cyber-white text-opacity-50"> : </span>&nbsp;
          {!isSubmitting && (
            <input
              className="font-light text-cyber-white bg-cyber-dim focus:outline-none"
              type="text"
              placeholder="Type Public or Private..."
              {...register("server_status", {
                required: true
              })}
              onChange={changeStatus}
            />
          )}
          {isSubmitting && (
            <div className="font-light text-cyber-white bg-cyber-dim focus:outline-none">
              Wait...
            </div>
          )}
        </div>
        {/* -- server passcode text-input -- */}
        {serverStatus && (
          <div className="flex flex-row items-center w-full font-light text-base">
            <span className="text-cyber-white text-opacity-50">&gt;</span>&nbsp;Passcode&nbsp;
            <span className="text-cyber-white text-opacity-50"> : </span>&nbsp;
            {!isSubmitting && (
              <input
                className="font-light text-cyber-white bg-cyber-dim focus:outline-none"
                type="password"
                placeholder="Enter passcode"
                {...register("server_passcode", {
                  required: true
                })}
              />
            )}
            {isSubmitting && (
              <div className="font-light text-cyber-white bg-cyber-dim focus:outline-none">
                Wait...
              </div>
            )}
          </div>
        )}
        {/* -- server name text-input -- */}
        <div className="flex flex-row items-center w-full font-light text-base">
          <span className="text-cyber-white text-opacity-50">&gt;</span>&nbsp;Enter Server Name&nbsp;
          <span className="text-cyber-white text-opacity-50"> : </span>&nbsp;
          {!isSubmitting && (
            <input
              className="font-light text-cyber-white bg-cyber-dim focus:outline-none"
              type="text"
              placeholder="Type here..."
              {...register("server_name", {
                required: true
              })}
            />
          )}
          {isSubmitting && (
            <div className="font-light text-cyber-white bg-cyber-dim focus:outline-none">
              Creating...
            </div>
          )}
        </div>
        <div className="flex flex-row items-center justify-end w-full space-x-3">
          <button 
            className="flex items-center justify-end font-light text-sm text-cyber-white hover:underline focus:outline-none"
            type="submit"
          >
            Create
          </button>
          <button 
            className="flex items-center justify-end font-light text-sm text-red-500 hover:underline focus:outline-none"
            type="button"
            onClick={() => reset()}
          >
            Cancel
          </button>
        </div>
      </form>
      <div className="flex w-full">
        {errors.server_name && <p className="mt-3 font-light text-xs text-red-500">{errors.server_name.message}</p>}
      </div>
    </div>
  )
}

export default CreateServerForm