import { useQuery, useQueryClient } from "@tanstack/react-query";
import { livroService } from "../services/livro-service";
import type { Livro } from "../types/livro";

export function useLivroIndividual(livroId: string | undefined) {
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["livro", livroId],
        initialData: () => {
            const cache = queryClient.getQueryData<Livro[]>(["livros"]); 
            return cache;
        },
        queryFn: () => livroService.getLivros(),
    
    });

    const livro = (data?.find(l => l.id === Number(livroId))) ?? null;
    return { livro, isLoading, isError };
}