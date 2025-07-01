import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart } from '@/components/molecules/chart/BarChart';
import { LineChart } from '@/components/molecules/chart/LineChart';
import { postProcessQuery } from '@/services/admin/ragApiService';

const formSchema = z.object({
  inputPrompt: z.string().min(2, {
    message: 'Input must be at least 2 characters.',
  }),
});

export const ModelAi = () => {
  interface ChartData {
    visualization_type: string;
    labels: string[];
    datasets: {
      label: string;
      data: number[];
    }[];
  }

  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inputPrompt: '',
    },
    reValidateMode: 'onSubmit',
  });

  const onSubmit = async (input: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError('');
    try {
      const response = await postProcessQuery(input.inputPrompt);
      console.log('Response:', response.data);

      setChartData(response.data);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to process your query. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFetch = async () => {
    try {
      const response = await fetch('http://localhost:3000/products');
      if (!response.ok) throw new Error('Failed to fetch');
      const result = await response.json();

      console.log('Fetched data:', result);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Terjadi kesalahan saat mengambil data.');
    }
  };

  const renderChart = () => {
    if (loading) {
      return <Skeleton className="w-full h-64" />;
    }

    if (!chartData) {
      return <div className="text-center text-gray-500">Submit a query to see visualization</div>;
    }

    if (chartData.visualization_type === 'bar') {
      return <BarChart labels={chartData.labels} datasets={chartData.datasets} />;
    } else if (chartData.visualization_type === 'line') {
      return <LineChart labels={chartData.labels} datasets={chartData.datasets} />;
    }

    return <div className="text-center text-gray-500">Unsupported chart type</div>;
  };

  return (
    <div className="w-full bg-slate-200 rounded-3xl px-8 py-4 shadow mb-8">
      <div className="flex flex-col mb-4 justify-between">
        <h1 className="text-3xl font-bold text-slate-800">Testing AI Dashboard</h1>
        <button
          type="button"
          onClick={handleFetch}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Fetch API
        </button>
      </div>

      <div className="flex w-full items-center justify-center p-8">{renderChart()}</div>

      {error && <div className="mb-4 text-red-500">{error}</div>}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="inputPrompt"
            render={({ field }) => (
              <FormItem className="text-slate-700 text-xl">
                <FormLabel>Input</FormLabel>
                <FormControl>
                  <Input placeholder="Input to get model..." {...field} className="bg-white" />
                </FormControl>
                <FormDescription>Enter your query to analyze data</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Submit'}
          </Button>
        </form>
      </Form>
    </div>
  );
};
