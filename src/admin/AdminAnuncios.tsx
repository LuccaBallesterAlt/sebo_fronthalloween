import { useEffect, useState } from "react"

import ItemAnuncio from './components/ItemAnuncio'
import type { AnuncioType } from "../utils/AnuncioType"
import { Link } from "react-router-dom"

const apiUrl = import.meta.env.VITE_API_URL

export default function AdminAnuncios() {
const [anuncios, setAnuncios] = useState<AnuncioType[]>([])

  useEffect(() => {
    async function getAnuncios() {
      const response = await fetch(`${apiUrl}/anuncios`)
      const dados = await response.json()
      setAnuncios(dados)
    }
    getAnuncios()
  }, [])

  const listaAnuncios = anuncios.map(anuncio => (
    <ItemAnuncio key={anuncio.id} anuncio={anuncio} anuncios={anuncios} setAnuncios={setAnuncios} />
  ))

  return (
    <div className='m-4 mt-24'>
      <div className='flex justify-between'>
        <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          Cadastro de Anuncios de Livros
        </h1>
        <Link to="/admin/anuncios/novo" 
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Novo Anuncio
        </Link>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                imagem do livro
              </th>
              <th scope="col" className="px-6 py-3">
                Título do Livro
              </th>
              <th scope="col" className="px-6 py-3">
                Descrição
              </th>
              <th scope="col" className="px-6 py-3">
                Estado
              </th>
              <th scope="col" className="px-6 py-3">
                Preço
              </th>
              <th scope="col" className="px-6 py-3">
                *
              </th>
            </tr>
          </thead>
          <tbody>
            {listaAnuncios}
          </tbody>
        </table>
      </div>
    </div>
  )
}