import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLivrosPorGenero } from "../../hooks/livrosGenero";
import styles from "./console.module.css";
import buscar from "../../assets/busca.png";
import voltar from "../../assets/voltar.png";

export default function Genero() {
    const { generoNome } = useParams();
    const navigate = useNavigate();
    const [pesquisa, setPesquisa] = useState("");
    const { livros, isLoading, isError } = useLivrosPorGenero(generoNome);

    const livrosFiltrados = livros.filter(livro =>
        livro.titulo.toLowerCase().includes(pesquisa.toLowerCase())
    );

    if (isLoading) return <p>Carregando...</p>;
    if (isError) return <p>Não foi possível carregar os livros.</p>;

    return (
        <main className={styles.containerPrincipal}>
            <div className={styles.barraPesquisa}>
                <img src={buscar} alt="lupa de pesquisa" />
                <input
                    type="text"
                    placeholder="Pesquisar por título"
                    value={pesquisa}
                    onChange={(e) => setPesquisa(e.target.value)}
                />
            </div>

            <div className={styles.header}>
                <button className={styles.voltar} onClick={() => navigate(-1)}>
                    <img src={voltar} alt="voltar" />
                    {generoNome}
                </button>
            </div>

            <div className={styles.livrosGrid}>
                {livrosFiltrados.map(livro => (
                    <div
                        key={livro.id}
                        className={styles.cardLivro}
                        onClick={() => navigate(`/produto/${livro.id}`)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className={styles.capaContainer}>
                            <img src={livro.capa} alt={livro.titulo} />
                        </div>
                        <div className={styles.infoLivro}>
                            <h3 className={styles.titulo}>{livro.titulo}</h3>
                            <div className={styles.rodape}>
                                <p className={styles.autor}>{livro.autor}</p>
                                <p className={styles.preco}>
                                    R$ {livro.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}