import { Play } from 'lucide-react'
import { Separator } from './separator'
import { Accountants } from './accountants'
import { useForm } from 'react-hook-form'
import { TaskCreateSchema, type TaskDTO } from '../schema/task'
import { zodResolver } from '@hookform/resolvers/zod'

export function CountDownForm() {

    //const [isRunning, setIsRunning] = useState<boolean>(false);

    const { register, handleSubmit, watch, reset, formState: { isLoading, errors } } = useForm<TaskDTO>({
        resolver: zodResolver(TaskCreateSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    });

    const handleCreateNewCycle = (data: TaskDTO) => {
        console.log(data);

        reset();
    }

    const task = watch('task');
    const isSubmitDisabled = !task || isLoading;


    return (
        <form onSubmit={handleSubmit(handleCreateNewCycle)} className="flex flex-col gap-4 items-center space-y-14">
            <div className='flex items-center gap-2 flex-wrap'>
                <label htmlFor="taskinput" className='font-bold text-lg'>Vou trabalhar em</label>
                <input type="text" id="taskinput"
                    {...register('task', { required: true })}
                    placeholder='Dê um nome para o seu projeto'
                    list="taskinputlist"
                    autoComplete='off'
                    className='flex-1  font-bold text-[1.125rem] outline-none border-b-2 border-gray bg-transparent h-10 px-2 text-gray-100 focus-within:shadow-none focus-within:border-gray-500' />

                <datalist id="taskinputlist" className='bg-gray-800 w-full'>
                    <option value="Projeto 1" />
                    <option value="Projeto 2" />
                    <option value="Projeto 3" />
                    <option value="Projeto 4" />
                    <option value="Projeto 5" />
                </datalist>

                <label htmlFor="minutesAmount" className='font-bold text-lg'>durante</label>
                <input
                    type="number"
                    {...register('minutesAmount', { valueAsNumber: true })}
                    step={5}
                    min={5}
                    max={60}
                    placeholder='00' className='tex-center placeholder:text-center w-16 flex-1  font-bold text-[1.125rem] outline-none border-b-2 border-gray bg-transparent h-10 px-2 text-gray-100 focus-within:shadow-none focus-within:border-gray-500' />
                <label htmlFor="" className='font-bold text-lg'>minutos</label>
            </div>

            <div className='flex items-center gap-2 flex-wrap text-[10rem] font-bold space-x-0.5'>
                <Accountants>0</Accountants>
                <Accountants>0</Accountants>
                <Separator>:</Separator>
                <Accountants>0</Accountants>
                <Accountants>0</Accountants>
            </div>

            <button type='submit' disabled={isSubmitDisabled} className='text-white flex items-center bg-[#00875F] py-4 justify-center rounded-lg font-bold w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#00B37E] transition-colors duration-300 ease-in-out'>
                <Play />
                Começar
            </button>

        </form>
    )
}
