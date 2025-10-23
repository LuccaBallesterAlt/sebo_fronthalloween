import type { AnuncioType } from "./AnuncioType"
import type { UsuarioType } from "./UsuarioType"

export type PropostaType = {
  id: number
  usuarioId: string       // id do usuário que fez a proposta
  usuario: UsuarioType
  anuncioId: number       // id do anúncio do livro
  anuncio: AnuncioType
  descricao: string
  resposta: string | null
  createdAt: string       // ou Date se preferir manipular datas
  updatedAt: string | null
}