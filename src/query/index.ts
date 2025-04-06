import { listDocuments } from "@/lib/appwirte";
import { useQuery } from "@tanstack/react-query";

export function useGetTasks(userId: string, page = 1) {
  const query = useQuery({
    queryKey: ["tasks", userId, page],
    queryFn: async () => await listDocuments(userId, page),
    enabled: !!userId,
  });

  return {
    ...query, // inclui data, isLoading, isError, error, refetch, etc.
    tasks: query.data,
  };
}
