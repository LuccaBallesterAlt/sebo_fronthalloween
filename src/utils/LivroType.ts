import type { AutorType } from "./AutorType"
import type { CategoriaType } from "./CategoriaType"
import type { EditoraType } from "./EditoraType"

export type LivroType = {
    id: number
    titulo: string
    subtitulo: string | null
    ano_publicacao: number
    numero_paginas: number
    edicao: number
    condicao: string | null
    descricao: string |null
    id_autor: number
    id_editora: number
    imagem_url: string

    autor: AutorType
    categoria: CategoriaType[] | null
    editora: EditoraType | null
} 