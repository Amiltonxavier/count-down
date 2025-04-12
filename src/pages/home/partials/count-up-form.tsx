import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCountUpContext } from '@/context/count-up-context';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { HandPalm, Play } from '@phosphor-icons/react';
import { useCyclesContext } from '@/context/cycles-context';
import { Display } from './count-display';

const countUpSchema = z.object({
    task: z.string().min(1, 'Informe o nome do projeto'),
});

type CountUpFormData = z.infer<typeof countUpSchema>;

export function CountUpForm() {
    const { activeCycleId, startNewCycle, interruptCycle, minutes, seconds } = useCountUpContext();
    const { activeCycle } = useCyclesContext()

    const form = useForm<CountUpFormData>({
        resolver: zodResolver(countUpSchema),
        defaultValues: {
            task: '',
        },
    });

    const onSubmit = ({ task }: CountUpFormData) => {
        startNewCycle(task);
    };

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 items-center"
        >
            <div className='flex items-center gap-2 flex-wrap'>
                <label htmlFor="taskinput" className="font-bold text-lg">
                    {activeCycle ? "Estou trabalhando em" : "Vou trabalhar em"}
                </label>
                <Input
                    type="text"
                    id="taskinput"
                    {...form.register('task')}
                    placeholder='Dê um nome para o seu projeto'
                    autoComplete='off'
                    className='flex-1'
                    defaultValue={activeCycle?.task}
                    disabled={!!activeCycle}
                />
            </div>

            <Display minutes={minutes} seconds={seconds} />

            {activeCycleId ? (
                <Button
                    type='button'
                    variant='danger'
                    onClick={interruptCycle}
                >
                    <HandPalm className='size-5' />
                    Interromper
                </Button>
            ) : (
                <Button type='submit' variant='success'>
                    <Play className='size-5' />
                    Começar
                </Button>
            )}
        </form>
    );
}
