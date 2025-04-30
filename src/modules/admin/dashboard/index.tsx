import { useGetProductsQuery } from '@/stores/api/apiSlice';
import { Loader2, AlertCircle, Package } from 'lucide-react';
import { DashboardTable } from './DashboardTable';
import { ModelAi } from './ModelAi';
import { ChartAuto } from './ChartAuto';

export const DashboardAdmin = () => {
  const { data: products = [], isLoading, isError, isUninitialized } = useGetProductsQuery();

  if (isLoading || isUninitialized) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <Loader2 className="h-8 w-8 animate-spin mb-2" />
        <p className="text-sm font-medium">Loading products...</p>
      </div>
    );
  } else if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-600 bg-red-50 rounded-lg">
        <AlertCircle className="h-8 w-8 mb-2" />
        <p className="text-sm font-medium">Error loading products</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage your product inventory</p>
        </div>
        <div className="flex items-center bg-blue-50 px-4 py-2 rounded-lg text-blue-600">
          <Package className="h-5 w-5 mr-2" />
          <span className="font-medium">{products.length} Products</span>
        </div>
      </div>

      <ModelAi />
      <ChartAuto />

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-700">Product Inventory</h2>
        </div>

        <div className="overflow-x-auto">
          <DashboardTable products={products} />
        </div>

        {products.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No products found</p>
          </div>
        )}
      </div>
    </div>
  );
};
