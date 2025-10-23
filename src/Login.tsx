import { useForm } from "react-hook-form"

import { Link, useNavigate } from "react-router-dom";


import { toast } from "sonner"
import { useUsuarioStore } from "./context/UsuarioContext"

type Inputs = {
    email: string
    senha: string
    manter: boolean
}

const apiUrl = import.meta.env.VITE_API_URL

export default function Login() {
    const { register, handleSubmit } = useForm<Inputs>()    
    const { logaUsuario } = useUsuarioStore()

    const navigate = useNavigate()

    async function verificaLogin(data: Inputs) {
        // alert(`${data.email} ${data.senha} ${data.manter}`)
        const response = await 
          fetch(`${apiUrl}/login`, {
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify({ email: data.email, senha: data.senha })
          })
        
        // console.log(response)
        if (response.status == 200) {
            // toast.success("Ok!")            
            const dados = await response.json()

            // "coloca" os dados do cliente no contexto
            logaUsuario(dados)
            
            // se o cliente indicou que quer se manter conectado
            // salvamos os dados (id) dele em localStorage
            if (data.manter) {
                localStorage.setItem("clienteKey", dados.id)
            } else {
                // se indicou que não quer permanecer logado e tem
                // uma chave (anteriormente) salva, remove-a
                if (localStorage.getItem("clienteKey")) {
                    localStorage.removeItem("clienteKey")
                }
            }

            // carrega a página principal, após login do cliente
            navigate("/")
        } else {
            toast.error("Erro... Login ou senha incorretos")
        }
    }

    return (
        <div className="sebo-auth-container">
            <div className="sebo-auth-card">
                <h1 className="sebo-auth-title">
                    Dados de Acesso do Cliente
                </h1>
                <form className="sebo-auth-form" onSubmit={handleSubmit(verificaLogin)}>
                    <div className="sebo-auth-field">
                        <label htmlFor="email" className="sebo-auth-label">Seu e-mail</label>
                        <input 
                            type="email" 
                            id="email" 
                            className="sebo-auth-input"
                            placeholder="nome@gmail.com"
                            required 
                            {...register("email")} 
                        />
                    </div>
                    <div className="sebo-auth-field">
                        <label htmlFor="password" className="sebo-auth-label">Senha de Acesso</label>
                        <input 
                            type="password" 
                            id="password" 
                            className="sebo-auth-input"
                            placeholder="••••••••"
                            required 
                            {...register("senha")} 
                        />
                    </div>
                    <div className="sebo-auth-checkbox-container">
                        <input 
                            id="remember" 
                            type="checkbox" 
                            className="sebo-auth-checkbox"
                            {...register("manter")} 
                        />
                        <label htmlFor="remember" className="sebo-auth-checkbox-label">
                            Manter Conectado
                        </label>
                    </div>
                    <div className="sebo-auth-forgot">
                        <a href="#" className="sebo-auth-link">Esqueceu sua senha?</a>
                    </div>
                    <button type="submit" className="sebo-auth-button">
                        Entrar
                    </button>
                    <div className="sebo-auth-footer">
                        Ainda não possui conta? <Link to="/cadUsuario" className="sebo-auth-link">Cadastre-se</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}