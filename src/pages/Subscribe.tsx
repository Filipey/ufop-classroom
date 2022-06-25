import { gql, useMutation } from "@apollo/client"
import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

const CREATE_SUBSCRIBER_MUTATION = gql`
  mutation CreateSubscriber($name: String!, $email: String!) {
    createSubscriber(data: {name: $name, email: $email}) {
      id
    }
}

`

export function Subscribe() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const [createSubscriber, { loading }] = useMutation(CREATE_SUBSCRIBER_MUTATION)

  async function handleSubscribe(event: FormEvent) {
    event.preventDefault()

    await createSubscriber({
      variables: {
        name,
        email
      }
    })

    navigate('/classroom')
  }

  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
      <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto">
        <div className="max-w-[640px]">
          <img src="src/assets/banner_icea.png" alt="" />

          <h1 className="mt-8 text-[2.5rem] leading-tight">
            Assista suas aulas preferidas em uma <strong className="text-red-800">interface moderna</strong>
          </h1>

          <p className="mt-4 text-gray-200">
            Nessa plataforma você consegue acessar todos os conteúdos disponibilizados pelos professores
            do ICEA, de maneira simples e direta.
          </p>
        </div>

        <div className="p-8 bg-gray-700 border-gray-500 rounded">
          <strong className="text-2xl mb-6 block">Inscreva-se gratuitamente</strong>

          <form action="" className="flex flex-col gap-2 w-full" onSubmit={handleSubscribe}>
            <input
              className="bg-gray-900 rounded px-5 h-14" 
              type="text"
              placeholder="Nome completo"
              onChange={event => {
                setName(event.target.value)
              }}
            />

            <input
              className="bg-gray-900 rounded px-5 h-14"
              type="email"
              placeholder="Email" 
              onChange={event => {
                setEmail(event.target.value)
              }}
            />

            <button 
              type="submit"
              disabled={loading}
              className="mt-4 bg-red-800 uppercase py-4 rounded font-bold text-sm hover:bg-red-700 trasition-colors disabled:opacity-50"
            >
              Garantir minha vaga
            </button>
          </form>
        </div>
      </div>
      
    </div>
  )
}