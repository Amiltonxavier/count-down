import { QueryClient } from "@tanstack/react-query";

export const queryCLient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 1,
      refetchInterval: false,
      refetchIntervalInBackground: false,
      onError: (error) => {
        console.error("Query error:", error);
      },
    },
    mutations: {
      retry: 1,
      onError: (error) => {
        console.error("Mutation error:", error);
      },
    },
  },
});
