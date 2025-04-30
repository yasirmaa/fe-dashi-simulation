import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Product } from '@/types/product';

interface ProductsProps {
  products: Product[];
}

export const DashboardTable = ({ products }: ProductsProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-50">
          <TableHead className="w-16 text-gray-600 font-medium">No</TableHead>
          <TableHead className="text-gray-600 font-medium">Name</TableHead>
          <TableHead className="text-gray-600 font-medium">Price</TableHead>
          <TableHead className="text-gray-600 font-medium">Stock</TableHead>
          <TableHead className="text-gray-600 font-medium">Category</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product, index) => (
          <TableRow key={product.id} className="hover:bg-gray-50 transition-colors">
            <TableCell className="w-16 font-medium text-gray-500">{index + 1}</TableCell>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell>
              <span className="text-blue-600 font-medium">
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                }).format(product.price)}
              </span>
            </TableCell>
            <TableCell>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  product.stock > 100
                    ? 'bg-green-50 text-green-600'
                    : product.stock > 0
                    ? 'bg-yellow-50 text-yellow-600'
                    : 'bg-red-50 text-red-600'
                }`}
              >
                {product.stock} {product.stock === 1 ? 'unit' : 'units'}
              </span>
            </TableCell>
            <TableCell>
              <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                {product.category}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
