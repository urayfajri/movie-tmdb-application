import { client } from "./config";

export interface TMDBRequestParams {
  page?: number;
  query?: string;
  language?: string;
  include_adult?: boolean;
  [key: string]: any;
}

export async function get<T>(
  url: string,
  params?: TMDBRequestParams
): Promise<T> {
  const { data } = await client.get<T>(url, { params });
  return data;
}
