import './BlocoSobre.css'

interface BlocoSobreProps {
    titulo: string
    corpo: string | undefined
}

const BlocoSobre = ({ titulo, corpo }: BlocoSobreProps) => {
    return (
        <div className="container-sobre">
            <h1 className="titulo-sobre">
                {titulo}
            </h1>
            <p className="corpo-sobre">
                {corpo}
            </p>
        </div>
    )
}

export default BlocoSobre