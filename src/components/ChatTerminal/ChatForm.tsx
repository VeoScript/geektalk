import React from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

interface FormData {
  message_box: string
}

const ChatForm: React.FC = () => {

  const router = useRouter()

  const defaultValues = {
    message_box: ''
  }

  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({ defaultValues })

  React.useEffect(() => {
    register('message_box', { required: true })
  }, [register])

  async function sendMessage(form_data: FormData) {
    const message_box = form_data.message_box
    const chat_input = document.getElementById('chatbox')

    if(chat_input == null || message_box === ''){
      return
    }

    console.log(message_box)
    chat_input.innerHTML= ''
    reset()
  }

  function handleKeyPress(e: any) {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(sendMessage)()
    }
  }

  return (
    <div className="flex w-full">
      <form onSubmit={handleSubmit(sendMessage)} className="flex flex-row items-center w-full bg-cyber-black">
        <div
          contentEditable
          id="chatbox"
          className={`${ isSubmitting ? 'hidden' : 'block' } w-full h-full max-h-[5rem] px-5 py-5 overflow-y-auto whitespace-pre-wrap text-sm cursor-text focus:outline-none font-light`}
          placeholder=">> Message here..."
          onInput={(e: any) => setValue('message_box', e.currentTarget.textContent, { shouldValidate: true })}
          onKeyPress={handleKeyPress}
        />
        <span className={`${ isSubmitting ? 'block' : 'hidden' } w-full text-xs cursor-default text-gray-400`}>Sending...</span>
        <div className="flex flex-row items-center justify-end px-5 space-x-3">
          {isSubmitting
            ?
            <LoadingButton />
            :
            <button type="submit" className="flex flex-row justify-end w-full text-cyber-green transition ease-in-out duration-300 hover:scale-95">
              <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M24 0l-6 22-8.129-7.239 7.802-8.234-10.458 7.227-7.215-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z"/>
              </svg>
            </button>
          }
        </div>
      </form>
    </div>
  )
}

function LoadingButton() {
  return (
    <div className="flex">
      <svg width="38px" height="38px" viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" color="#00FE00">
        <g fill="none" fill-Rule="evenodd" transform="translate(1 1)" stroke-Width="2">
          <circle cx="22" cy="22" r="6">
            <animate attributeName="r" begin="1.5s" dur="3s" values="6;22" calcMode="linear" repeatCount="indefinite"></animate>
            <animate attributeName="stroke-opacity" begin="1.5s" dur="3s" values="1;0" calcMode="linear" repeatCount="indefinite"></animate>
            <animate attributeName="stroke-width" begin="1.5s" dur="3s" values="2;0" calcMode="linear" repeatCount="indefinite"></animate>
          </circle>
          <circle cx="22" cy="22" r="6">
            <animate attributeName="r" begin="3s" dur="3s" values="6;22" calcMode="linear" repeatCount="indefinite"></animate>
            <animate attributeName="stroke-opacity" begin="3s" dur="3s" values="1;0" calcMode="linear" repeatCount="indefinite"></animate>
            <animate attributeName="stroke-width" begin="3s" dur="3s" values="2;0" calcMode="linear" repeatCount="indefinite"></animate>
          </circle>
          <circle cx="22" cy="22" r="8">
            <animate attributeName="r" begin="0s" dur="1.5s" values="6;1;2;3;4;5;6" calcMode="linear" repeatCount="indefinite"></animate>
          </circle>
        </g>
      </svg>
    </div>
  )
}

export default ChatForm