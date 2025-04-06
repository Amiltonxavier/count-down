import { z } from "zod";

export const TaskCreateSchema = z
  .object({
    task: z.string().min(1, "Informe a tarefa"),
    minutesAmount: z
      .number()
      .min(1, "O ciclo precisa ser de no mínimo 60 minutos.")
      .max(60, "O ciclo precisa ser de no máximo 60 minutos."),
  })
  .strict();
export type TaskDTO = z.infer<typeof TaskCreateSchema>;
