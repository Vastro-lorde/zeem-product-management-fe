import './App.css';
import { ProductProvider } from './context/ProductContext';
import { ProductManagement } from './pages/ProductManagement';

export default function App() {
  return (
    <ProductProvider>
      <ProductManagement />
    </ProductProvider>
  );
}
