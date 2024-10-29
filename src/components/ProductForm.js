import { useState } from 'react';

export const ProductForm = ({ initialData, onSubmit, onClose }) => {
    const [formData, setFormData] = useState(
    initialData || { name: '', description: '', price: '', stock: '' }
  );
  if (initialData) {
    document.title = 'Update Product';
  }else{
    document.title = 'Add Product';
  }
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Price must be greater than 0';
    if (!formData.stock || formData.stock < 0) newErrors.stock = 'Stock must be 0 or greater';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      await onSubmit(formData);
      setLoading(false);
      onClose();
    } else {
      setLoading(false);
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Product Name"
          value={formData.name}
          disabled={loading}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>
      <div>
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          disabled={loading}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>
      <div>
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          disabled={loading}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.price ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
      </div>
      <div>
        <input
          type="number"
          placeholder="Stock"
          value={formData.stock}
          disabled={loading}
          onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.stock ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
}