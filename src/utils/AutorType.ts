import type { LivroType } from "./LivroType";

export type AutorType = {
    id: number
    nome: string
    nacionalidade: string | null
    biografia: string | null
    livros: LivroType[] | null
}