import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useState, useEffect } from "react"
import type { LivroType } from "../utils/LivroType"
import { useAdminStore } from "../context/AdminContext"

const apiUrl = import.meta.env.VITE_API_URL

type Inputs = {
  id_livro: number
  preco: number
  condicao_detalhada: string
  disponivel: boolean
  destaque: boolean
  adminId: number
}

export default function AdminNovoAnuncio() {
  const [livros, setLivros] = useState<LivroType[]>([])
  const { admin } = useAdminStore()

  const { register, handleSubmit, reset, setFocus } = useForm<Inputs>()

  useEffect(() => {
    async function getLivros() {
      const response = await fetch(`${apiUrl}/livros`)
      const dados = await response.json()
      setLivros(dados)
      setFocus("id_livro")
    }
    getLivros()
  }, [])

  async function incluirAnuncio(data: Inputs) {
    const novoAnuncio: Inputs = {
      ...data,
      id_livro: Number(data.id_livro),
      preco: Number(data.preco),
      adminId: admin.id
    }

    const response = await fetch(`${apiUrl}/anuncios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${admin.token}`
      },
      body: JSON.stringify(novoAnuncio)
    })

    if (response.status === 201) {
      toast.success("Anúncio cadastrado com sucesso!")
      reset()
    } else {
      toast.error("Erro ao cadastrar anúncio...")
    }
  }

  return (
    <>
      <h1 className="mb-4 mt-24 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
        Inclusão de Anúncios de Livros
      </h1>

      <form className="max-w-xl mx-auto bg-amber-700 p-12 rounded-4xl" onSubmit={handleSubmit(incluirAnuncio)}>
        {/* Select de livros */}
        <div className="mb-3 bg">
          <label htmlFor="id_livro" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Livro
          </label>
          <select
            id="id_livro"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            {...register("id_livro")}
            required
          >
            {livros.map((l) => (
              <option key={l.id} value={l.id}>
                {l.titulo}
              </option>
            ))}
          </select>
        </div>

        {/* Preço */}
        <div className="mb-3">
          <label htmlFor="preco" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Preço R$
          </label>
          <input
            type="number"
            id="preco"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            {...register("preco")}
            required
          />
        </div>

        {/* Condição detalhada */}
        <div className="mb-3">
          <label htmlFor="condicao_detalhada" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Condição do Livro
          </label>
          <textarea
            id="condicao_detalhada"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            {...register("condicao_detalhada")}
            required
          ></textarea>
        </div>

        {/* Checkbox de disponibilidade e destaque */}
        <div className="mb-3 flex gap-6">
          <label className="flex items-center gap-2 text-gray-900 dark:text-white">
            <input type="checkbox" {...register("disponivel")} />
            Disponível
          </label>
          <label className="flex items-center gap-2 text-gray-900 dark:text-white">
            <input type="checkbox" {...register("destaque")} />
            Destaque
          </label>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Incluir
        </button>
      </form>
    </>
  )
}
