import { Link, useNavigate } from "react-router-dom";
import { useLivros } from "../../hooks/useLivros";
import banner from "../../assets/banner.png";
import styles from "./console.module.css";

export default function Home() {
    const { livros, isLoading, isError, generosDisponiveis } = useLivros();
    const navigate = useNavigate();

    if (isLoading) return <p>Carregando...</p>;
    if (isError) return <p>Não foi possível carregar os livros.</p>;

    return (
        <main className={styles.container}>
            <section className={styles.banner}>
                <img src={banner} alt="Banner de promoções" />
            </section>

            {generosDisponiveis.map(generoNome => (
                <section key={generoNome} className={styles.secaoLivros}>
                    <div className={styles.secaoHeader}>
                        <h2>{generoNome}</h2>
                        <Link to={`/genero/${generoNome}`} className={styles.vermais}>
                            Ver mais
                        </Link>
                    </div>

                    <div className={styles.livrosGrid}>
                        {livros
                            .filter(livro => livro.genero === generoNome)
                            .slice(0, 4)
                            .map(livro => (
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
                                        <div className={styles.textoPrincipal}>
                                            <h3>{livro.titulo}</h3>
                                            <p className={styles.autor}>{livro.autor}</p>
                                        </div>
                                        <p className={styles.preco}>
                                            R$ {livro.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </section>
            ))}
        </main>
    );
}