import * as Dialog from '@radix-ui/react-dialog'
import { Info } from '@phosphor-icons/react'
import { X } from 'lucide-react'

import type { ICycle } from '@/interfaces'

interface TaskDetailsDialogProps {
  task: ICycle
}

export function TaskDetailsDialog({ task }: TaskDetailsDialogProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button type='button' className="text-blue-500 hover:text-blue-600 flex items-center gap-1">
          <Info size={20} />
          Detalhes
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/40 fixed inset-0" />
        <Dialog.Content className="fixed top-1/2 left-1/2 bg-white p-6 rounded-xl w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 shadow-lg">
          <Dialog.Title className="text-lg font-semibold mb-4 flex justify-between items-center">
            Detalhes da Tarefa
            <Dialog.Close className="text-gray-500 hover:text-red-500">
              <X size={20} />
            </Dialog.Close>
          </Dialog.Title>

          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>Projeto:</strong> {task.task}</p>
            <p><strong>Duração:</strong> {task.minutesAmount} min</p>
            <p><strong>Início:</strong> {new Date(task.startDate).toLocaleString()}</p>
            {task.finishedDate && (
              <p><strong>Finalizado em:</strong> {new Date(task.finishedDate).toLocaleString()}</p>
            )}
            {task.interruptedDate && (
              <p><strong>Interrompido em:</strong> {new Date(task.interruptedDate).toLocaleString()}</p>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
