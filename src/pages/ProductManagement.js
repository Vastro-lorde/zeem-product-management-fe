import { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { ProductForm } from '../components/ProductForm';
import { Modal } from '../components/Modal';
import { ProductCard } from '../components/ProductCard';
import { Pagination } from '../components/Pagination';
import { SearchBar } from '../components/SearchBar';

export const ProductManagement = () => {
    const {
        products,
        loading,
        error,
        currentPage,
        totalPages,
        searchTerm,
        setSearchTerm,
        setCurrentPage,
        addProduct,
        updateProduct,
        deleteProduct,
      } = useProducts();
      const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Product Management</h1>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Add Product
            </button>
          </div>
          <div className="mt-4">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </div>
        </div>

        {error && (
          <div className="mx-4 mb-4 p-4 bg-red-50 text-red-500 rounded-lg">
            {error}
          </div>
        )}
        
        <div className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products?.length === 0 ? 'No products found' : products?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={setEditProduct}
              onDelete={deleteProduct}
            />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Product"
      >
        <ProductForm
          onSubmit={addProduct}
          onClose={() => setIsAddModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={!!editProduct}
        onClose={() => setEditProduct(null)}
        title="Edit Product"
      >
        <ProductForm
          initialData={editProduct}
          onSubmit={(data) => updateProduct(editProduct.id, data)}
          onClose={() => setEditProduct(null)}
        />
      </Modal>
    </div>
  );

}