import type { LivroCategoriaType } from "./LivroCategoriaType"

export type CategoriaType = {
    id: number
    nome_categoria: string
    livro_categoria: LivroCategoriaType | null
}