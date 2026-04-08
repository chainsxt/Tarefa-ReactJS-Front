import { useQuery } from "@tanstack/react-query";
import { livroService } from "../services/livro-service";


export function useLivros(){

   const{ data, isLoading, isError } = useQuery({
    queryKey:["livros"],
    queryFn: ()=> livroService.getLivros(),
    retry: false,
    refetchInterval: 60*5*1000
    });
    const livros = data ?? [];
    const generosDisponiveis=[...new Set(livros.map(livro => livro.genero))];
    return { livros, isLoading, isError, generosDisponiveis };

}