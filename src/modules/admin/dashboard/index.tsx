import { useGetProductsQuery } from '@/stores/api/apiSlice';
import { Loader2, AlertCircle, Package } from 'lucide-react';
import { DashboardTable } from './DashboardTable';
import { ChartGraph } from './ChartGraph';
import { ModelAi } from './ModelAi';
import { SignatureAnimate } from '@/components/molecules/random/SignatureAnimate';

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

      <div className="">
        <SignatureAnimate
          width="400"
          height="400"
          viewBox="0 0 279 37"
          className="my-svg-animation"
          path="M15.02 175.02 C16.94 165.68, 21.33 151.40, 24.90 140.70 C25.43 131.37, 30.95 115.93, 32.87 103.41 C38.63 75.84, 47.63 41.54, 67.46 21.53 C85.86 39.05, 83.39 53.87, 89.16 57.44 C94.10 69.25, 98.77 86.00, 101.51 91.77 C164.11 259.70, 34.79 54.97, 21.61 71.17 C7.61 85.18, 2.94 97.81, 10.90 124.44 C14.45 137.79, 24.06 153.45, 116.06 87.92 C120.17 98.53, 114.14 112.09, 118.00 119.00 C124.58 107.97, 127.87 93.96, 135.00 84.00 C141.60 88.47, 132.81 114.56, 141.00 119.00 C148.19 112.36, 152.03 85.45, 159.00 82.00 C166.04 86.00, 155.60 105.22, 159.00 121.00 C163.80 123.38, 234.41 60.19, 243.47 52.23 C230.94 36.24, 215.74 22.30, 193.22 18.45 C171.32 21.74, 146.33 39.59, 147.92 53.60 C150.39 64.31, 245.67 113.18, 241.27 129.11 C228.64 144.21, 157.80 156.85, 141.60 160.14 C94.38 170.58, 31.50 180.46, 21.33 184.02 C12.67 170.93, 179.72 132.02, 257.20 110.99"
          strokeColor="#000000"
          strokeWidth={3}
          strokeLinecap="round"
          animationDuration={5}
          animationDelay={0}
          animationBounce={0.3}
          reverseAnimation={false}
          enableHoverAnimation={true}
          hoverAnimationType="redraw"
          hoverStrokeColor="#4f46e5"
        />
      </div>
      <ModelAi />
      <ChartGraph />

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
