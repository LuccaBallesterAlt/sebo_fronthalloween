import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { toast } from "sonner"

type Inputs = {
    nome: string
    email: string
    cidade: string
    senha: string
    senha2: string
}

const apiUrl = import.meta.env.VITE_API_URL

export default function CadUsuario() {
    const { register, handleSubmit } = useForm<Inputs>()

    async function cadastraUsuario(data: Inputs) {

        if (data.senha != data.senha2) {
            toast.error("Erro... Senha e Confirme Senha precisam ser iguais")
            return
        }

        const response = await
            fetch(`${apiUrl}/usuarios`, {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify({
                    nome: data.nome,
                    email: data.email,
                    cidade: data.cidade,
                    senha: data.senha
                })
            })

        console.log(response)
        if (response.status == 201) {
            toast.success("Ok! Cadastro realizado com sucesso...")
            // carrega a página principal, após login do cliente
            // navigate("/login")
        } else {
            toast.error("Erro... Não foi possível realizar o cadastro")
        }
    }

    return (
        <div className="sebo-auth-container">
            <div className="sebo-auth-card">
                <h1 className="sebo-auth-title">
                    Cadastro de Cliente
                </h1>
                <form className="sebo-auth-form" onSubmit={handleSubmit(cadastraUsuario)}>
                    <div className="sebo-auth-field">
                        <label htmlFor="nome" className="sebo-auth-label">Nome:</label>
                        <input 
                            type="text" 
                            id="nome" 
                            className="sebo-auth-input"
                            placeholder="Seu nome completo" 
                            required 
                            {...register("nome")} 
                        />
                    </div>
                    <div className="sebo-auth-field">
                        <label htmlFor="email" className="sebo-auth-label">E-mail:</label>
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
                        <label htmlFor="cidade" className="sebo-auth-label">Cidade:</label>
                        <input 
                            type="text" 
                            id="cidade" 
                            className="sebo-auth-input"
                            placeholder="Sua cidade" 
                            required 
                            {...register("cidade")} 
                        />
                    </div>
                    <div className="sebo-auth-field">
                        <label htmlFor="password" className="sebo-auth-label">Senha de Acesso:</label>
                        <input 
                            type="password" 
                            id="password" 
                            className="sebo-auth-input"
                            placeholder="••••••••" 
                            required 
                            {...register("senha")} 
                        />
                    </div>
                    <div className="sebo-auth-field">
                        <label htmlFor="confirm-password" className="sebo-auth-label">Confirme a Senha:</label>
                        <input 
                            type="password" 
                            id="confirm-password" 
                            className="sebo-auth-input"
                            placeholder="••••••••" 
                            required 
                            {...register("senha2")} 
                        />
                    </div>
                    <button type="submit" className="sebo-auth-button">
                        Criar sua Conta
                    </button>
                    <div className="sebo-auth-footer">
                        Já possui uma conta? <Link to="/login" className="sebo-auth-link">Faça Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}