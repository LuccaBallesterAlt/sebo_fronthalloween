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
    <div className="sebo-detalhes-container">
      <div className="sebo-detalhes-card">
        <img className="sebo-detalhes-image"
          src={anuncio?.livro.imagem_url} alt="Foto do Livro" />
        <div className="sebo-detalhes-content">
          <h1 className="sebo-detalhes-title">
            {anuncio?.livro.titulo}
          </h1>
          
          <div className="sebo-detalhes-info">
            <div className="sebo-detalhes-info-item">
              <span className="sebo-detalhes-info-label">Autor:</span>
              <span>{autor ? autor.nome : "Autor desconhecido"}</span>
            </div>
            <div className="sebo-detalhes-info-item">
              <span className="sebo-detalhes-info-label">Ano:</span>
              <span>{anuncio?.livro.ano_publicacao}</span>
            </div>
          </div>
          
          <div className="sebo-detalhes-price">
            R$ {Number(anuncio?.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
          </div>
          
          <p className="sebo-detalhes-description">
            {anuncio?.livro?.descricao}
          </p>
          
          {usuario.id ? (
            <div className="sebo-detalhes-proposta-section">
              <h3 className="sebo-detalhes-proposta-title">
                🙂 Você pode fazer uma Proposta para este livro!
              </h3>
              <form onSubmit={handleSubmit(enviaProposta)} className="sebo-detalhes-form">
                <input 
                  type="text" 
                  className="sebo-detalhes-input" 
                  value={`${usuario.nome} (${usuario.email})`} 
                  disabled 
                  readOnly 
                />
                <textarea 
                  className="sebo-detalhes-textarea"
                  placeholder="Descreva a sua proposta"
                  required
                  {...register("descricao")}
                />
                <button type="submit" className="sebo-detalhes-button">
                  Enviar Proposta
                </button>
              </form>
            </div>
          ) : (
            <div className="sebo-detalhes-login-prompt">
              <h2>😎 Gostou? Identifique-se e faça uma Proposta!</h2>
            </div>
          )}
          
          <div className="sebo-detalhes-propostas-list">
            <h4 className="sebo-detalhes-propostas-title">Propostas enviadas:</h4>
            {propostas.length === 0 ? (
              <p className="sebo-detalhes-empty-propostas">Nenhuma proposta ainda.</p>
            ) : (
              <div>
                {propostas.map((p) => (
                  <div key={p.usuarioId} className="sebo-detalhes-proposta-item">
                    <div className="sebo-detalhes-proposta-user">{p.usuario.nome}</div>
                    <div className="sebo-detalhes-proposta-desc">{p.descricao}</div>
                    {p.resposta && (
                      <div className="sebo-detalhes-proposta-resposta">
                        <div className="sebo-detalhes-proposta-resposta-text">
                          Resposta: {p.resposta}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}