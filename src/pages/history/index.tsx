import { TableCell, TableHeaderCell } from '../../components/table'
import { useUser } from '@clerk/clerk-react';
import { relativeDate } from '../../helpers';

import { useGetTasks } from '@/query';
import { useState } from 'react';
import { TaskDetailsDialog } from './dialog/dialog';
import { ICycle } from '@/interfaces';
import { SpinnerGap } from '@phosphor-icons/react/dist/ssr';

export default function HistoryPage() {
    const { user } = useUser();
    const [isOpen, setIsOpen] = useState(false)
    const { tasks, isLoading, isError, error } = useGetTasks(user?.id ?? '')
    const [selectedTask, setSelectedTask] = useState<ICycle | null>(null)
    const handleOpen = () => {
        setIsOpen(true)
    }
    const handleClose = () => {
        setIsOpen(false)
    }

    const handleTaskClick = (task: ICycle) => {
        setSelectedTask(task);
        handleOpen();
    }

    if (isLoading) return <span className='flex items-center justify-center'><SpinnerGap className='animate-spin size-8' /></span>
    if (isError) return <span>Erro: {String(error)}</span>


    if (!tasks || tasks.length === 0) return <span>Nenhuma tarefa encontrada</span>
    return (
        <div className='flex flex-col gap-4 space-y-2 flex-1'>
            <h2 className='font-bold text-2xl text-gray-100'>Meu histórico</h2>
            <div className='w-full flex-1 overflow-auto'>
                <table className='w-full table-auto border-collapse min-w-[600px]'>
                    <thead>
                        <tr className='bg-[#29292E] text-gray-100'>
                            <TableHeaderCell className='rounded-tl-[8px] pl-6'>Tarefa</TableHeaderCell>
                            <TableHeaderCell>Duração</TableHeaderCell>
                            <TableHeaderCell>Início</TableHeaderCell>
                            <TableHeaderCell className='rounded-tr-lg pr-6'>Status</TableHeaderCell>
                            <TableHeaderCell className='rounded-tr-lg pr-6'>Detalhes</TableHeaderCell>
                        </tr>
                    </thead>

                    <tbody>
                        {tasks.map((item) => (
                            <tr key={item.id}>
                                <TableCell className='pl-6 w-[50%]'>{item.task}</TableCell>
                                <TableCell>{item.minutesAmount} minutos</TableCell>
                                <TableCell>
                                    {relativeDate(item.startDate)}
                                </TableCell>
                                <TableCell className='pr-6'>
                                    {item.finishedDate ? (
                                        <span className='text-green-500'>Concluído</span>
                                    ) : item.interruptedDate ? (
                                        <span className='text-red-500'>Interrompido</span>
                                    ) : (
                                        <span className='text-green-500'>Em andamento</span>
                                    )}
                                </TableCell>
                                <TableCell className='pr-6'>
                                    {/* <TaskDetailsDialog task={item} /> */}
                                    <button
                                        onClick={() => handleTaskClick(item)}
                                        type='button'
                                        className='text-blue-500 hover:text-blue-600'>Detalhes</button>

                                </TableCell>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {selectedTask && <TaskDetailsDialog task={selectedTask} />}
        </div>
    )
}
