import { useState, useEffect } from 'react';
import { useProducts } from './hooks/useProducts';
import axios from 'axios';
import ProductTable from './components/ProductTable';
import ProductModal from './components/ProductModal';
import ColumnToggle from './components/ColumnToggle';
import PriceHistoryModal from './components/PriceHistoryModal';

import {
  Button,
  Card,
  CardBody,
  Typography,
  Input
} from "@material-tailwind/react";

function App() {
  const {
    products,
    searchTerm,
    setSearchTerm,
    fetchProducts,
    handleSort,
    sortColumn,
    sortDirection
  } = useProducts();

  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [historyItem, setHistoryItem] = useState(null);
  const [columnSettings, setColumnSettings] = useState({
    modelo: true,
    marca: true,
    vendedor: true,
    stock: true,
    porcentaje_ganancia: true,
    precio_compra: true,
    precio_venta: true,
    registrado_en: true,
  });

  const fetchColumnSettings = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/columns`);
      const settings = {};
      res.data.forEach(col => {
        settings[col.column_key] = col.visible;
      });
      setColumnSettings(prev => ({ ...prev, ...settings }));
    } catch (err) {
      alert('Failed to load column settings.');
    }
  };

  const toggleColumn = async (key) => {
    const current = columnSettings[key];
    try {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/columns/${key}`, {
        visible: !current
      });
      setColumnSettings(prev => ({
        ...prev,
        [key]: !current
      }));
    } catch {
      alert('Failed to update column visibility');
    }
  };

  useEffect(() => {
    fetchColumnSettings();
  }, []);

  const handleEdit = (product) => {
    setEditItem(product);
  };

  const handleScrapeUpdate = async (product) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/items`, {
        ...product,
        porcentaje_ganancia: product.porcentaje_ganancia,
        stock: product.stock,
        modelo: product.modelo,
        url: product.url,
      });
      fetchProducts();
      alert('Product updated via scraping.');
    } catch (err) {
      alert('Failed to update product using scraping.');
    }
  };

  const handleDelete = async (product) => {
    if (!confirm(`Are you sure you want to delete "${product.modelo}"?`)) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/items/${product.id}`);
      fetchProducts();
      alert('Product deleted successfully.');
    } catch (err) {
      alert('Failed to delete product.');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditItem(null);
  };

  const handleCreatedOrUpdated = () => {
    handleCloseModal();
    fetchProducts();
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Card className="mb-6 p-6 shadow-md">
        <Typography variant="h4" color="green" className="mb-2">
          Product List
        </Typography>
        <Typography color="gray">
          Manage and update your product prices from different sources. You can add, edit, delete, or scrape product data.
        </Typography>
      </Card>

      <div className="mb-4 flex items-center gap-4 flex-wrap">
        <Button color="green" onClick={() => setShowModal(true)}>
          Add Product
        </Button>

        <Button
          variant="outlined"
          color="blue"
          onClick={fetchProducts}
        >
          Refresh Table
        </Button>

        <Input
          label="Search by model, brand or seller"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-xs"
        />
      </div>

      <ColumnToggle columnSettings={columnSettings} toggleColumn={toggleColumn} />

      <ProductTable
        products={products}
        columnSettings={columnSettings}
        onEdit={handleEdit}
        onScrapeUpdate={handleScrapeUpdate}
        onDelete={handleDelete}
        onShowHistory={setHistoryItem}
        onSort={handleSort}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
      />

      {(showModal || editItem) && (
        <ProductModal
          onClose={handleCloseModal}
          onCreated={handleCreatedOrUpdated}
          initialValues={editItem}
        />
      )}

      {historyItem && (
        <PriceHistoryModal
          product={historyItem}
          onClose={() => setHistoryItem(null)}
        />
      )}
    </div>
  );
}

export default App;
