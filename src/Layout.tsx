import Titulo from './components/Titulo.tsx'
import Footer from './components/Footer.tsx'
import { Outlet } from 'react-router-dom'

import { Toaster } from 'sonner'

export default function Layout() {
  return (
    <>
      <Titulo />
      <Outlet />
      <Footer />
      <Toaster richColors position="top-center" />
    </>
  )
}
