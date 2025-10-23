import './AdminDashboard.css'
import { useEffect, useState } from "react"
import { VictoryPie, VictoryTheme } from "victory"

const apiUrl = import.meta.env.VITE_API_URL

type GraficoLivroAnuncioType = {
  titulo: string
  numAnuncios: number
}

type GraficoClienteType = {
  cidade: string
  num: number
}

type GeralDadosType = {
  usuarios: number
  anuncios: number
  propostas: number
}

export default function AdminDashboard() {
  const [livrosAnuncio, setLivrosAnuncio] = useState<GraficoLivroAnuncioType[]>([])
  const [clientesCidade, setClientesCidade] = useState<GraficoClienteType[]>([])
  const [dados, setDados] = useState<GeralDadosType>({} as GeralDadosType)

  useEffect(() => {
    async function getDadosGerais() {
      try {
        const response = await fetch(`${apiUrl}/dashboards/gerais`)
        const dados = await response.json()
        setDados(dados)
      } catch (error) {
        console.error("Erro ao buscar dados gerais:", error)
      }
    }

async function getDadosGraficoLivros() {
  try {
    const response = await fetch(`${apiUrl}/dashboards/livrosComAnuncios`);
    const dados = await response.json();
    console.log("📘 Dados Livros:", dados);
    setLivrosAnuncio(dados);
  } catch (error) {
    console.error("Erro ao buscar gráfico de livros:", error);
  }
}

async function getDadosGraficoClientes() {
  try {
    const response = await fetch(`${apiUrl}/dashboards/clientesCidade`);
    const dados = await response.json();
    console.log("🏙️ Dados Clientes:", dados);
    setClientesCidade(dados);
  } catch (error) {
    console.error("Erro ao buscar gráfico de clientes:", error);
  }
}


    getDadosGerais()
    getDadosGraficoLivros()
    getDadosGraficoClientes()
  }, [])

  const listaLivrosAnuncio = livrosAnuncio.map(item => ({ x: item.titulo, y: item.numAnuncios }))
  const listaClientesCidade = clientesCidade.map(item => ({ x: item.cidade, y: item.num }))

  return (
    <div className="container mt-24">
      <h2 className="text-3xl mb-4 font-bold">Visão Geral do Sistema</h2>

      <div className="w-2/3 flex justify-between mx-auto mb-5">
        <div className="border-blue-600 border rounded p-6 w-1/3 me-3">
          <span className="bg-blue-100 text-blue-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-blue-900 dark:text-blue-300">
            {dados.usuarios}
          </span>
          <p className="font-bold mt-2 text-center">Nº Clientes</p>
        </div>
        <div className="border-red-600 border rounded p-6 w-1/3 me-3">
          <span className="bg-red-100 text-red-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-red-900 dark:text-red-300">
            {dados.anuncios}
          </span>
          <p className="font-bold mt-2 text-center">Nº Livros</p>
        </div>
        <div className="border-green-600 border rounded p-6 w-1/3">
          <span className="bg-green-100 text-green-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-green-900 dark:text-green-300">
            {dados.propostas}
          </span>
          <p className="font-bold mt-2 text-center">Nº Propostas</p>
        </div>
      </div>

      <div className="div-graficos flex flex-wrap justify-center gap-10">
        <div>
          <h3 className="text-center font-bold mb-2">Livros por Anúncio</h3>
          <VictoryPie
            data={listaLivrosAnuncio}
            width={400}
            height={400}
            innerRadius={50}
            labelRadius={80}
            theme={VictoryTheme.material}
            style={{
              labels: { fontSize: 12, fill: "#fff", fontWeight: "bold" }
            }}
          />
        </div>

        <div>
          <h3 className="text-center font-bold mb-2">Clientes por Cidade</h3>
          <VictoryPie
            data={listaClientesCidade}
            width={400}
            height={400}
            innerRadius={50}
            labelRadius={80}
            theme={VictoryTheme.material}
            style={{
              labels: { fontSize: 12, fill: "#fff", fontWeight: "bold" }
            }}
          />
        </div>
      </div>
    </div>
  )
}
