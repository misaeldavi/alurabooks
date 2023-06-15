import { AbGrupoOpcao, AbGrupoOpcoes, AbInputQuantidade, AbBotao } from "ds-alurabooks"
import TituloPrincipal from '../../componentes/TituloPrincipal'
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useParams } from "react-router-dom"
import BlocoSobre from "../../componentes/BlocoSobre"
import SobreAutor from '../../componentes/SobreAutor'
import { obterLivro } from "../../http"
import { Formatador } from "../../utils/FormatadorMoeda"
import './Livro.css'
import Loader from "../../componentes/Loader"
import { ILivro } from "../../interfaces/ILivro"
import { AxiosError } from "axios"

const Livro = () => {
    const params = useParams()
    const [opcao, setOpcao] = useState<AbGrupoOpcao>()

    const { data: livro, isLoading, error } = useQuery<ILivro | null, AxiosError>(['livro', params.slug], () => obterLivro(params.slug || ''))

    if (error) {
        console.log('Alguma coisa deu errado')
        console.log(error.message)
        return <h1>Ops! Algum erro inesperado aconteceu!</h1>
    }

    if (livro === null) {
        return <h1>Livro não encontrado!</h1>
    }

    if (isLoading || !livro) {
        return <Loader />
    }

    const opcoes: AbGrupoOpcao[] = livro.opcoesCompra ? livro.opcoesCompra.map(opcao => ({
        id: opcao.id,
        corpo: Formatador.format(opcao.preco),
        titulo: opcao.titulo,
        rodape: opcao.formato ? opcao.formato.join(',') : ''
    }))
        : []

    return (<section className="livro-detalhe">
        <TituloPrincipal texto='Detalhes do Livro' />
        <div className="page">
            <div className="container-detalhe">
                <div className="content">
                    <figure className='imagem-livro'>
                        <img src={livro.imagemCapa} alt={`Capa do livro ${livro.titulo} escrito por ${livro.autor}`} />
                    </figure>

                    <div className="detalhes">
                        <h2>{livro.titulo}</h2>
                        <p>{livro.descricao}</p>
                        <h3>Selecione o formato do seu livro:</h3>
                        <div className="opcoes">
                            <AbGrupoOpcoes
                                opcoes={opcoes}
                                onChange={setOpcao}
                                valorPadrao={opcao}
                            />
                        </div>
                        <p><strong>*Você terá acessso às futuras atualizações do livro.</strong></p>
                        <footer>
                            <div className="qtdContainer">
                                <AbInputQuantidade 
                                    onChange={() => setOpcao}
                                    value={1}
                                />
                            </div>
                            <div>
                                <AbBotao texto="Comprar" />
                            </div>
                        </footer>
                    </div>
                </div>
                <div>
                    <SobreAutor autorId={livro.autor} />
                    <BlocoSobre titulo='Sobre o Livro' corpo={livro.sobre} />
                </div>

            </div>
        </div>
    </section>
    )
}

export default Livro