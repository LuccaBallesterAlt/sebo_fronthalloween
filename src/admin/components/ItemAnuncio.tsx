import { TiDeleteOutline } from "react-icons/ti"
import { FaRegStar } from "react-icons/fa"
import type { AnuncioType } from "../../utils/AnuncioType"
import { useAdminStore } from "../../context/AdminContext"

interface listaAnuncioProps {
  anuncio: AnuncioType;
  anuncios: AnuncioType[];
  setAnuncios: React.Dispatch<React.SetStateAction<AnuncioType[]>>;
}

const apiUrl = import.meta.env.VITE_API_URL

export default function ItemAnuncio({ anuncio, anuncios, setAnuncios }: listaAnuncioProps) {
  const { admin } = useAdminStore()

  async function excluirAnuncio() {
    console.log("Token do admin:", admin?.token);
    console.log("ID do anúncio:", anuncio.id, typeof anuncio.id);
    if (!admin || admin.nivel == 1) {
      alert("Você não tem permissão para excluir anuncioss");
      return;
    }

    if (confirm(`Confirma a exclusão`)) {
      const response = await fetch(`${apiUrl}/anuncios/${anuncio.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${admin.token}`
          },
        },
      )

      if (response.status == 200) {
        const anuncios2 = anuncios.filter(x => x.id != anuncio.id)
        setAnuncios(anuncios2)
        alert("Anuncio excluído com sucesso")
      } else {
        alert("Erro... Anuncio não foi excluído")
      }
    }
  }

  async function alterarDestaque() {

    const response = await fetch(`${apiUrl}/anuncios/destacar/${anuncio.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${admin.token}`
        },
      },
    )

    if (response.status == 200) {
      const anuncios2 = anuncios.map(x => {
        if (x.id == anuncio.id) {
          return { ...x, destaque: !x.destaque }
        }
        return x
      })
      setAnuncios(anuncios2)
    }
  }

  return (
    <tr key={anuncio.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <img src={anuncio.livro.imagem_url} alt={`Foto do ${anuncio.livro.titulo}`}
          style={{ width: 200 }} />
      </th>
      <td className={`px-6 py-4 ${anuncio.destaque ? "font-extrabold" : ""}`}>
        {anuncio.livro.titulo}
      </td>
      <td className={`px-6 py-4 ${anuncio.destaque ? "font-extrabold" : ""}`}>
        {anuncio.livro.descricao}
      </td>
      <td className={`px-6 py-4 ${anuncio.destaque ? "font-extrabold" : ""}`}>
        {anuncio.condicao_detalhada}
      </td>
      <td className={`px-6 py-4 ${anuncio.destaque ? "font-extrabold" : ""}`}>
        {Number(anuncio.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
      </td>
      <td className="px-6 py-4">
        <TiDeleteOutline className="text-3xl text-red-600 inline-block cursor-pointer" title="Excluir"
          onClick={excluirAnuncio} />&nbsp;
        <FaRegStar className="text-3xl text-yellow-600 inline-block cursor-pointer" title="Destacar"
          onClick={alterarDestaque} />
      </td>
    </tr>
  )
}