export const ProductCard = ({ product, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{product.description}</p>
            <div className="mt-2">
                <p className="text-gray-700">Price: ${product.price}</p>
                <p className="text-gray-700">Stock: {product.stock}</p>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
                <button
                onClick={() => onEdit(product)}
                className="p-2 text-blue-500 hover:bg-blue-50 rounded"
                >
                Edit
                </button>
                <button
                onClick={() => onDelete(product.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded"
                >
                Delete
                </button>
            </div>
        </div>
    );
}