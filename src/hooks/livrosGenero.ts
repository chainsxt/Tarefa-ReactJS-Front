import { useQuery, useQueryClient } from "@tanstack/react-query";
import { livroService } from "../services/livro-service";
import type { Livro } from "../types/livro";

export function useLivrosPorGenero(generoNome: string | undefined) {
    const queryClient = useQueryClient();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["livros", generoNome],
        initialData: () => {                                      
            const cache = queryClient.getQueryData<Livro[]>(["livros"]);
            return cache;
        },
        queryFn: () => livroService.getLivros(),
    });

    const livros = (data ?? []).filter(livro => livro.genero === generoNome);

    return { livros, isLoading, isError };
}