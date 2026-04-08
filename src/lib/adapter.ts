import type { HttpAdapter } from "../types/http";
import { axiosAdapter } from "./axios";

export const httpAdapter: HttpAdapter = axiosAdapter