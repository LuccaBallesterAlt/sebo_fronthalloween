import { CardLivro } from "./components/CardLivro";
import type { AnuncioType } from "./utils/AnuncioType";
import { useEffect, useState } from "react";
import { useUsuarioStore } from "./context/UsuarioContext"

const apiUrl = import.meta.env.VITE_API_URL

export default function App() {
  const [ anuncios, setAnuncios] = useState<AnuncioType[]>([])
  const [filtro, setFiltro] = useState<string>("")
  const { logaUsuario } = useUsuarioStore()  

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${apiUrl}/anuncios/destaques`)
      const dados = await response.json()
      console.log(dados)
      setAnuncios(dados)
    }
    buscaDados()

    async function buscaCliente(id: string) {
      const response = await fetch(`${apiUrl}/usuarios/${id}`)
      const dados = await response.json()
      logaUsuario(dados)
    }
    if (localStorage.getItem("clienteKey")) {
      const idUsuario = localStorage.getItem("clienteKey")
      buscaCliente(idUsuario as string)
    }    
  }, [])
  
  const anunciosFiltrados: AnuncioType[] = anuncios.filter(anuncio =>
    anuncio.livro.titulo.toLowerCase().includes(filtro.toLowerCase())
  )
  
    const listaAnuncios = anunciosFiltrados.map( anuncio => (
      <CardLivro data={ anuncio } key={anuncio.id} />
    ))

  return (
    <div className="sebo-main">
      {/* Header */}
      <header className="sebo-header">
        <div className="sebo-search">
          <input
            type="text"
            placeholder="Digite título, autor ou gênero"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </div>
      </header>

      {/* Hero Section */}
      <section className="sebo-hero">
        <div className="sebo-hero-overlay">
          <h2>DESTAQUE DO SEBO</h2>
          <h1>LIVROS RAROS</h1>
          <p>Descubra edições especiais e livros raros em nosso sebo online. Encontre tesouros literários únicos!</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="sebo-content">
        <div className="sebo-content-header">
          <h2>Últimas Adições</h2>
        </div>
        
        <div className="sebo-grid">
          {listaAnuncios}
        </div>
      </div>
    </div>
  );
}
