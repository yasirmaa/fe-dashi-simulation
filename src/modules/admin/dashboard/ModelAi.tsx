import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { postProcessQuery } from '@/services/admin/processQuery';

const formSchema = z.object({
  inputPrompt: z.string().min(2, {
    message: 'Input must be at least 2 characters.',
  }),
});

export const ModelAi = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inputPrompt: '',
    },
    reValidateMode: 'onSubmit',
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const response = await postProcessQuery(data.inputPrompt);
    console.log('Response from API:', response.data);
  };

  return (
    <div className="w-full bg-gray-300 rounded-3xl px-8 py-4 shadow mb-8">
      <div className="flex flex-col mb-4">
        <h1 className="text-3xl font-bold text-slate-800">Testing AI Dashboard</h1>
        <p className="text-xl text-slate-500">Coming Soon</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="inputPrompt"
            render={({ field }) => (
              <FormItem className="text-slate-700 text-xl">
                <FormLabel>Input</FormLabel>
                <FormControl>
                  <Input placeholder="Input to get model...." {...field} className="bg-white" />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};
