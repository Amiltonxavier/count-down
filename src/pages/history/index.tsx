import { TableCell, TableHeaderCell } from '../../components/table'
import { useHistoryContext } from '../../context/history-context';

export default function HistoryPage() {

    const { history } = useHistoryContext();
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
                        </tr>
                    </thead>

                    <tbody>
                        {history.map((item) => (
                            <tr key={item.id}>
                                <TableCell className='pl-6 w-[50%]'>{item.task}</TableCell>
                                <TableCell>{item.minutesAmount} minutos</TableCell>
                                <TableCell>Há 2 meses</TableCell>
                                <TableCell className='pr-6'>Concluído</TableCell>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
