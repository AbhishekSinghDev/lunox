import { env } from "@/env";
import axios, { type AxiosError, type AxiosInstance } from "axios";
import { tryCatch } from "../../lib/try-catch";
import type { SearchParams, WebSearchApiResponse } from "./types";

class BraveApiError extends Error {
  status?: number;
  code?: string;

  constructor(message: string, status?: number, code?: string) {
    super(message);
    this.name = "BraveApiError";
    this.status = status;
    this.code = code;
  }
}

export class Brave {
  private apiKey: string;
  private client: AxiosInstance;
  private baseUrl = "https://api.search.brave.com/res/v1";

  constructor() {
    this.apiKey = env.BRAVE_API_KEY;

    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip",
        "X-Subscription-Token": this.apiKey,
      },
    });
  }

  async searchWeb(params: SearchParams) {
    const searchParams = new URLSearchParams();

    // Add query parameter
    searchParams.append("q", params.q);

    // Add optional parameters
    if (params.country) searchParams.append("country", params.country);
    if (params.search_lang)
      searchParams.append("search_lang", params.search_lang);
    if (params.ui_lang) searchParams.append("ui_lang", params.ui_lang);
    if (params.count) searchParams.append("count", params.count.toString());
    if (params.offset) searchParams.append("offset", params.offset.toString());
    if (params.safesearch) searchParams.append("safesearch", params.safesearch);
    if (params.freshness) searchParams.append("freshness", params.freshness);
    if (params.text_decorations !== undefined)
      searchParams.append(
        "text_decorations",
        params.text_decorations.toString(),
      );
    if (params.spellcheck !== undefined)
      searchParams.append("spellcheck", params.spellcheck.toString());
    if (params.result_filter)
      searchParams.append("result_filter", params.result_filter);
    if (params.goggles_id) searchParams.append("goggles_id", params.goggles_id);
    if (params.units) searchParams.append("units", params.units);
    if (params.extra_snippets !== undefined)
      searchParams.append("extra_snippets", params.extra_snippets.toString());
    if (params.summary !== undefined)
      searchParams.append("summary", params.summary.toString());

    const makeRequest = async (): Promise<WebSearchApiResponse> => {
      try {
        const response = await this.client.get<WebSearchApiResponse>(
          `/web/search?${searchParams.toString()}`,
        );
        return response.data;
      } catch (error) {
        const axiosError = error as AxiosError;
        let errorMessage = axiosError.message;

        if (axiosError.response?.data) {
          errorMessage =
            (axiosError.response.data as unknown as { message?: string })
              .message ?? axiosError.message;
        }

        throw new BraveApiError(
          errorMessage,
          axiosError.response?.status,
          axiosError.code,
        );
      }
    };

    const result = await tryCatch<WebSearchApiResponse, BraveApiError>(
      makeRequest(),
    );

    return result;
  }
}

export default Brave;
