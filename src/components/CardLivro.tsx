import { Link } from "react-router-dom"
import type { AnuncioType } from "../utils/AnuncioType"

export function CardLivro({data}: {data: AnuncioType}) {
    return (
        <div className="sebo-book-card">
            <img className="sebo-book-cover" src={data.livro.imagem_url} alt={data.livro.titulo} />
            <div className="sebo-book-info">
                <h3 className="sebo-book-title">{data.livro.titulo}</h3>
                <p className="sebo-book-volume">R$ {Number(data.preco).toLocaleString("pt-br", {
                    minimumFractionDigits: 2
                })}</p>
                <p className="sebo-book-date">Ano: {data.livro.ano_publicacao}</p>
            </div>
        </div>
    )
}