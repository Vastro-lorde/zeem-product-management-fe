import { createContext, useContext, useState, useEffect } from 'react';
import { BACKEND_BASEURL } from '../utility/enums';

const ProductContext = createContext();

/**
 * Hook to access the products context. Throws an error if used outside of a ProductProvider.
 *
 * @returns {object} The products context.
 * @throws {Error} If used outside of a ProductProvider.
 */
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

/**
 * Provides the products context to the components in the subtree.
 *
 * @param {ReactNode} children The components to provide the context to.
 * @returns {ReactElement} The component with the products context.
 */
export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    /**
     * Fetches the products from the backend based on the given page size and page number.
     * Sets the products, total pages, and error states accordingly.
     *
     * @param {number} pageSize The number of products to fetch per page.
     * @param {number} pageNumber The page number to fetch.
     */
    const fetchProducts = async (pageSize, pageNumber) => {
        setLoading(true);
        try {
          const response = await fetch(
            `${BACKEND_BASEURL}/Products/GetAllProducts?pageSize=${pageSize}&pageNumber=${pageNumber}`
          );
          const data = await response.json();
          console.log(data);
          
          setProducts(()=> data?.pageItems);
          setTotalPages(data?.totalNumberOfPages);
          setError(null);
        } catch (err) {
          setError('Failed to fetch products');
        } finally {
          setLoading(false);
        }
      };

    const addProduct = async (product) => {
        try {
            await fetch(`${BACKEND_BASEURL}/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            });
            await fetchProducts(currentPage, searchTerm);
        } catch (err) {
            setError('Failed to add product');
        }
    };

    const updateProduct = async (id, product) => {
        try {
            await fetch(`${BACKEND_BASEURL}/api/products/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            });
            await fetchProducts(currentPage, searchTerm);
        } catch (err) {
            setError('Failed to update product');
        }
    };

    const deleteProduct = async (id) => {
        try {
            await fetch(`/api/products/${id}`, { method: 'DELETE' });
            await fetchProducts(currentPage, searchTerm);
        } catch (err) {
            setError('Failed to delete product');
        }
    };

    useEffect(() => {
        fetchProducts(10, 1);
    }, [currentPage, searchTerm]);

    return (
        <ProductContext.Provider
          value={{
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
          }}
        >
          {children}
        </ProductContext.Provider>
      );
}