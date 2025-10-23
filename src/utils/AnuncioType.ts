import type { LivroType } from "./LivroType"
import type { PropostaType } from "./PropostaType"

export type AnuncioType = {
    id: number
    preco: number
    condicao_detalhada: string |null
    disponivel: boolean
    data_criacao: Date
    destaque: boolean
    id_livro: number
    livro: LivroType
    proposta: PropostaType[] | null

}