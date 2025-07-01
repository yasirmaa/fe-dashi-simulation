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
import { generateChart, sendToRAG } from '@/services/admin/ragApiService';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart } from '@/components/molecules/chart/BarChart';
import { LineChart } from '@/components/molecules/chart/LineChart';

const formSchema = z.object({
  query: z.string().min(2, {
    message: 'Input must be at least 2 characters.',
  }),
});

interface ChartData {
  visualization_type: string;
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
}

const HomePage = () => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState<null | {
    message: string;
    reason: string;
    suggestion: string;
    summary: string;
    available_data_summary: string;
  }>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: '',
    },
    reValidateMode: 'onSubmit',
  });

  const onSubmit = async (input: z.infer<typeof formSchema>) => {
    setLoading(true);
    setChartData(null);
    setErrorInfo(null);
    try {
      const response = await generateChart(input.query);
      setChartData(response.chart_config);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('An error occurred in onSubmit:', error); // Gunakan console.error untuk error

      // Hapus 'return;' agar kode di bawahnya bisa berjalan
      // return; // <-- HAPUS BARIS INI

      // Periksa status langsung dari objek error kustom yang Anda buat
      if (error?.status === 400 && error?.data?.detail) {
        // Akses data error dari error.data.detail sesuai struktur JSON
        const errorData = error.data.detail;

        if (errorData?.error_type === 'data_not_found') {
          setErrorInfo({
            message: errorData.message || 'No data found for the given query.',
            reason: errorData.reason || 'The query did not match any available data.',
            suggestion: errorData.suggestion || 'Please check your query and try again.',
            summary: errorData.summary || 'No matching data found.',
            available_data_summary:
              errorData.available_data_summary ||
              'Available data is limited or not matching the query.',
          });
        }
        // Anda bisa menambahkan penanganan untuk 'error_type' lain di sini
      } else {
        // Penanganan untuk error lain yang tidak terduga (misal: 500, error jaringan)
        setErrorInfo({
          message: 'An unexpected error occurred.',
          reason: 'Please try again later or contact support.',
          suggestion: '',
          summary: '',
          available_data_summary: '',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFetchAndUpload = async () => {
    try {
      const uploadResponse = await sendToRAG('inventory_data');

      console.log('Fetched and uploaded data:', uploadResponse);
      return;
    } catch (error) {
      console.error('Error fetching and uploading data:', error);
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
    <div className="bg-[#F3F2F7] h-screen">
      <section className=" w-full flex gap-10 h-[400px] py-16 px-10">
        <div className="bg-white min-w-[900px] min-h-[400px] rounded-2xl shadow">
          <div className="flex justify-center items-center h-full">
            <div className="flex w-full items-center justify-center p-8">{renderChart()}</div>
          </div>
        </div>

        <div className="bg-white w-full h-full rounded-2xl shadow px-10 py-7">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold">ChatbotAI</h1>
            <Button
              className="border border-blue-400 px-5 py-3 text-blue-500"
              variant={'outline'}
              onClick={handleFetchAndUpload}
            >
              Refresh Data
            </Button>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="query"
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

          {errorInfo && (
            <div className="mt-4 p-4 bg-red-100 text-red-800 rounded">
              <h2 className="font-bold">Error: {errorInfo.message}</h2>
              <p>
                <strong>Reason:</strong> {errorInfo.reason}
              </p>
              <p>
                <strong>Suggestion:</strong> {errorInfo.suggestion}
              </p>
              <p>
                <strong>Summary:</strong> {errorInfo.summary}
              </p>
              <p>
                <strong>Available Data Summary:</strong> {errorInfo.available_data_summary}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
