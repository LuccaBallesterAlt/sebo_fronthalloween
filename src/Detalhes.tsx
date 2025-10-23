import type { AnuncioType } from "./utils/AnuncioType"
import type { PropostaType } from "./utils/PropostaType"
import type { AutorType } from "./utils/AutorType"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useUsuarioStore } from "./context/UsuarioContext"
import { useForm } from "react-hook-form"
import { toast } from 'sonner'

const apiUrl = import.meta.env.VITE_API_URL

type Inputs = {
  descricao: string
}

export default function Detalhes() {
  const params = useParams()
  const [anuncio, setAnuncio] = useState<AnuncioType>()
  const [propostas, setPropostas] = useState<PropostaType[]>([])
  const [autor, setAutor] = useState<AutorType | null>(null)
  const { usuario } = useUsuarioStore()

  const { register, handleSubmit, reset } = useForm<Inputs>()

  useEffect(() => {
    async function buscaAnuncio() {
      const response = await fetch(`${apiUrl}/anuncios/${params.anuncioId}`)
      const dados = await response.json()
      setAnuncio(dados)
      // Busca o autor após receber o anúncio
      if (dados.livro?.id_autor) {
        const respAutor = await fetch(`${apiUrl}/autores/${dados.livro.id_autor}`)
        const dadosAutor = await respAutor.json()
        setAutor(dadosAutor)
      }
    }
    async function buscaPropostas() {
      const response = await fetch(`${apiUrl}/propostas?anuncioId=${params.anuncioId}`)
      const dados = await response.json()
      setPropostas(dados)
    }
    buscaAnuncio()
    buscaPropostas()
  }, [params.anuncioId])

  async function enviaProposta(data: Inputs) {
    const response = await fetch(`${apiUrl}/propostas`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        usuarioId: usuario.id,
        anuncioId: Number(params.anuncioId),
        descricao: data.descricao
})
    })

    if (response.status === 201) {
      toast.success("Obrigado. Sua proposta foi enviada. Aguarde retorno")
      reset()
      // Atualiza lista de propostas após envio
      const novasPropostas = await fetch(`${apiUrl}/propostas?anuncioId=${params.anuncioId}`)
      setPropostas(await novasPropostas.json())
    } else {
      toast.error("Erro... Não foi possível enviar sua proposta")
    }
  }

  return (
    <>
      <section className="flex mt-6 mx-auto flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-5xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img className="object-cover w-full rounded-t-lg h-96 md:h-2/4 md:w-2/4 md:rounded-none md:rounded-s-lg"
          src={anuncio?.livro.imagem_url} alt="Foto do Livro" />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {anuncio?.livro.titulo}
          </h5>
          <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
            Autor: {autor ? autor.nome : "Autor desconhecido"}
          </h5>
          <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
            Preço R$: {Number(anuncio?.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {anuncio?.livro?.descricao}
          </p>
          {usuario.id ?
            <>
              <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                🙂Você pode fazer uma Proposta para este livro!
              </h3>
              <form onSubmit={handleSubmit(enviaProposta)}>
                <input type="text" className="mb-2 mt-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={`${usuario.nome} (${usuario.email})`} disabled readOnly />
                <textarea id="message" className="mb-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Descreva a sua proposta"
                  required
                  {...register("descricao")}>
                </textarea>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Enviar Proposta</button>
              </form>
            </>
            :
            <h2 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
              😎Gostou? Identifique-se e faça uma Proposta!
            </h2>
          }
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Propostas enviadas:</h4>
            {propostas.length === 0 && <p className="text-gray-500">Nenhuma proposta ainda.</p>}
            <ul>
              {propostas.map((p) => (
                <li key={p.usuarioId} className="mb-2 border-b border-gray-200 dark:border-white pb-2">
                  <span className="font-bold text-gray-400">{p.usuario.nome}</span>: {p.descricao}
                  {p.resposta && (
                    <div className="text-green-700 dark:text-green-400 mt-1">Resposta: {p.resposta}</div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}