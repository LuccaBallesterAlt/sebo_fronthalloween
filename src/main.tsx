import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.tsx'
import Login from './Login.tsx'
import Detalhes from './Detalhes.tsx'
import MinhasPropostas from './MinhasPropostas.tsx'
import Layout from './Layout.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AdminLayout from './admin/AdminLayout.tsx'
import AdminDashboard from './admin/AdminDashboard.tsx'
import AdminAnuncios from './admin/AdminAnuncios.tsx'
import AdminLogin from './admin/AdminLogin.tsx'
import CadUsuario from './CadUsuario.tsx'
import AdminNovoAnuncio from './admin/AdminNovoAnuncio.tsx'
import { AdminPropostas } from './admin/AdminPropostas.tsx'
import { AdminClientes } from './admin/AdminClientes.tsx'

const rotas = createBrowserRouter([
    {
    path: "/admin/login",
    element: <AdminLogin />,   // rota do form de login sem o Layout da Área Administrativa
  },
  {
    path: "/admin",
    element: <AdminLayout />,  // layout principal do admin com menus e outlet
    children: [
      { index: true, element: <AdminDashboard /> },          // rota /admin
      { path: "anuncios", element: <AdminAnuncios /> },          // rota /admin/carros
      { path: "anuncios/novo", element: <AdminNovoAnuncio /> },  // ...
      { path: "propostas", element: <AdminPropostas /> },      // rota /admin/carros
      { path: "admin/clientes", element: <AdminClientes /> },      // rota /admin/clientes
    ],
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: 'login', element: <Login /> },
      { path: 'detalhes/:anuncioId', element: <Detalhes /> },
      { path: 'minhasPropostas', element: <MinhasPropostas /> },
      { path: 'cadUsuario', element: <CadUsuario /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={rotas} />
  </StrictMode>,
)