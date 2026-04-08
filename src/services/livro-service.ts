import { BaseService } from "./base-service";
import type { Livro } from "../types/livro";
import { httpAdapter } from "../lib/adapter";

class LivroService extends BaseService {
    constructor() {
        super(httpAdapter);
    }

    async getLivros(): Promise<Livro[]> {
        const response = await this.execute<undefined, { livros: Livro[] }>({
            method: "GET",
            url: "/livros.json",
        });

        return response.data.livros;
    }
}

export const livroService = new LivroService();