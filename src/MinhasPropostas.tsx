import { useEffect, useState } from "react";
import { useUsuarioStore } from "./context/UsuarioContext";
import type { PropostaType } from "./utils/PropostaType";

const apiUrl = import.meta.env.VITE_API_URL

export default function Propostas() {
    const [propostas, setPropostas] = useState<PropostaType[]>([])
    const { usuario } = useUsuarioStore()

    useEffect(() => {
        async function buscaDados() {
            const response = await fetch(`${apiUrl}/propostas/${usuario.id}`)
            const dados = await response.json()
            setPropostas(dados)
        }
        buscaDados()
    }, [])

    // para retornar apenas a data do campo no banco de dados
    // 2024-10-10T22:46:27.227Z => 10/10/2024
    function dataDMA(data: string) {
        const ano = data.substring(0, 4)
        const mes = data.substring(5, 7)
        const dia = data.substring(8, 10)
        return dia + "/" + mes + "/" + ano
    }

    const propostasCards = propostas.map(proposta => (
        <div key={proposta.id} className="sebo-proposta-card">
            <div className="sebo-proposta-header">
                <img src={proposta.anuncio.livro.imagem_url} alt={proposta.anuncio.livro.titulo} className="sebo-proposta-image" />
                <div className="sebo-proposta-info">
                    <h3 className="sebo-proposta-titulo">{proposta.anuncio.livro.titulo}</h3>
                    <p className="sebo-proposta-preco">R$ {Number(proposta.anuncio.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}</p>
                    <p className="sebo-proposta-condicao">{proposta.anuncio.condicao_detalhada}</p>
                </div>
                <div className={`sebo-proposta-status ${proposta.resposta ? 'respondida' : 'pendente'}`}>
                    {proposta.resposta ? 'Respondida' : 'Pendente'}
                </div>
            </div>
            
            <div className="sebo-proposta-content">
                <div className="sebo-proposta-descricao">
                    <h4>Minha Proposta:</h4>
                    <p>{proposta.descricao}</p>
                    <span className="sebo-proposta-data">Enviado em: {dataDMA(proposta.createdAt)}</span>
                </div>
                
                {proposta.resposta && (
                    <div className="sebo-proposta-resposta">
                        <h4>Resposta do Vendedor:</h4>
                        <p>{proposta.resposta}</p>
                        <span className="sebo-proposta-data">Respondido em: {dataDMA(proposta.updatedAt as string)}</span>
                    </div>
                )}
            </div>
        </div>
    ))

    return (
        <div className="sebo-main">
            {/* Hero Section */}
            <section className="sebo-hero">
                <div className="sebo-hero-overlay">
                    <h2>MINHAS PROPOSTAS</h2>
                    <h1>ACOMPANHE SEUS INTERESSES</h1>
                    <p>Acompanhe o status das suas propostas e negocie com os vendedores!</p>
                </div>
            </section>

            {/* Main Content */}
            <div className="sebo-content">
                <div className="sebo-content-header">
                    <h2>Suas Propostas</h2>
                </div>
                
                {propostas.length === 0 ? (
                    <div className="sebo-empty-state">
                        <h3>Você ainda não fez propostas</h3>
                        <p>Explore os livros disponíveis e faça sua primeira proposta!</p>
                    </div>
                ) : (
                    <div className="sebo-propostas-grid">
                        {propostasCards}
                    </div>
                )}
            </div>
        </div>
    )
}