import type { LivroType } from "./LivroType"

export type EditoraType = {
    id: number
    nome_editora: string
    cidade: string | null
    livros: LivroType[] | null
}