import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'

interface GeekProps {
  host: any
  server: any
}

type FormData = {
  passcode: string
}

const JoinPrivate: React.FC<GeekProps> = ({ host, server }) => {

  const check_joined_user = server.joined_servers.some((joinedServer: {userId: string}) => joinedServer.userId === host.id)
  const check_joined_server = server.joined_servers.some((joinedServer: {indicator: boolean}) => joinedServer.indicator === true)

  const { register, reset, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<FormData>()

  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  async function onAccept(formData: FormData) {
    const userId = host.id
    const serverName = server.name
    const servePasscode = server.passcode
    const passcode = formData.passcode

    if (servePasscode !== passcode) {
      setError('passcode', {
        type: 'manual',
        message: 'Incorrect passcode, try again.',
      })
      return
    }

    await fetch('/api/joinserver/private', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId,
        serverName
      })
    })
    reset()
    closeModal()
  }

  return (
    <>
      <button 
        className={`${check_joined_user && check_joined_server ? 'hidden' : 'block'} flex items-center justify-end w-full max-w-[6rem] px-5 font-light text-sm text-cyber-white hover:underline focus:outline-none`}
        type="button"
        onClick={openModal}
      >
        &gt; Join
      </button>
      <div className={`${check_joined_user && check_joined_server ? 'block' : 'hidden'} flex items-center justify-end w-full max-w-[6rem] px-5 font-light text-sm text-cyber-white text-opacity-30`}>
        &gt; Joined
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="font-pangolin fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center bg-cyber-white bg-opacity-30">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-cyber-black bg-opacity-95 shadow-xl rounded-md">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-cyber-green"
                >
                  <span className="text-cyber-white text-opacity-50">&gt;</span> Join to Private Server
                </Dialog.Title>
                <div className="flex flex-col space-y-2 mt-2">
                  <p className="text-sm text-cyber-white">
                    When you join a private server make sure you already knew your servermates.
                    Private server has Passcode before you enter the server.
                  </p>
                  <div className="text-sm text-cyber-white">
                    Server: <span className="text-cyber-green">{ server.name }</span>
                  </div>
                </div>
                <form onSubmit={handleSubmit(onAccept)} className="flex flex-col space-y-4 mt-4">
                  <div className="flex flex-col w-full space-y-2">
                    <input
                      className="font-light text-sm text-cyber-white text-opacity-80 px-1 py-2 w-full max-w-xs bg-transparent border-b border-cyber-white border-opacity-20 focus:border-cyber-green focus:outline-none"
                      type="password"
                      placeholder=">> Enter passcode"
                      {...register('passcode', {
                        required: true
                      })}
                    />
                    {errors.passcode && <span className="font-light text-xs text-red-500">{errors.passcode.message}</span>}
                  </div>
                  <div className="flex items-center space-x-3">
                    <button 
                      className="font-light text-sm text-cyber-yellow hover:underline focus:outline-none"
                      type="submit"
                    >
                      &gt; Accept
                    </button>
                    <button 
                      className="font-light text-sm text-cyber-white hover:underline focus:outline-none"
                      type="button"
                      onClick={closeModal}
                    >
                      &gt; Decline
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default JoinPrivate