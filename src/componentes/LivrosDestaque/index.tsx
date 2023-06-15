import { AbBotao, AbCard } from "ds-alurabooks"
import { useEffect, useState } from "react"
import { ILivro } from "../../interfaces/ILivro"
import { Formatador } from "../../utils/FormatadorMoeda"

import './LivrosDestaque.css'
import Livro from "../../paginas/Livro"
import { Link } from "react-router-dom"

interface LivrosDestaqueProps {
    livros: ILivro[]
}

const LivrosDestaque = ({ livros }: LivrosDestaqueProps) => {

    const [selecionado, selecionarLivro] = useState<ILivro>()

    useEffect(() => {
        if (livros?.length) {
            selecionarLivro(livros[0])
        }
    }, [livros])

    const valorMinimo = selecionado ? Math.min(...selecionado.opcoesCompra.map(op => op.preco)) : 0

    return (<section className="LivrosDestaque">
        <div>
            <ul className="livros">
                {livros.map(livro => {
                    return (
                        <li
                            key={livro.titulo}
                            onClick={() => selecionarLivro(livro)}
                            className={selecionado?.titulo === livro.titulo ? 'selecionado' : ''}
                        >
                            <img src={livro.imagemCapa} alt={`Capa do livro ${livro.titulo} escrito por ${livro.autor}`} />
                        </li>)
                })}
            </ul>
        </div>
        <AbCard>
            {selecionado && <div className="selecionado-detalhes">
                <header>
                    <h5>Sobre o livro:</h5>
                </header>
                <h6>{selecionado?.titulo}</h6>
                <p>{selecionado?.descricao}</p>
                <p>Por: {selecionado?.autor}</p>
                <footer>
                    <div className="preco">
                        <em>A partir de:</em>
                        <strong>{Formatador.format(valorMinimo)}</strong>
                    </div>
                    <div>
                        <Link to={`/livro/${selecionado.slug}`}>
                            <AbBotao texto="Comprar"/>
                        </Link>
                    </div>
                </footer>
            </div>}
        </AbCard>
    </section>)
}

export default LivrosDestaque