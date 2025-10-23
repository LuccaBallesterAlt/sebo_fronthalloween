import { FiUsers } from "react-icons/fi"
import { Link } from "react-router-dom"
import { useAdminStore } from "../../context/AdminContext"

export function Titulo() {
  const { admin } = useAdminStore()

  return (
    <nav className="bg-gray-800 border-gray-200 flex flex-wrap justify-between fixed top-0 left-0 w-full z-50">
      <div className="flex flex-wrap justify-between max-w-screen-xl p-4">
        <Link to="/admin" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="./livroLogo.webp" className="h-16" alt="Logo" />
          <span className="self-center text-3xl font-semibold whitespace-nowrap text-white">
            Sebo dos guris: Admin
          </span>
        </Link>
      </div>
      <div className="flex me-4 items-center font-bold text-gray-300">
        <FiUsers className="mr-2 text-gray-400" />
        {admin.nome}
      </div>
    </nav>
  )
}