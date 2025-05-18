import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

export default function ProductModal({ onClose, onCreated, initialValues = null }) {
  const isEdit = !!initialValues;

  const [form, setForm] = useState({
    modelo: '',
    stock: 0,
    porcentaje_ganancia: 0,
    url: '',
    marca: '',
    vendedor: '',
    precio_compra: ''
  });

  useEffect(() => {
    if (initialValues) {
      setForm({
        modelo: initialValues.modelo || '',
        stock: initialValues.stock || 0,
        porcentaje_ganancia: initialValues.porcentaje_ganancia || 0,
        url: initialValues.url || '',
        marca: initialValues.marca || '',
        vendedor: initialValues.vendedor || '',
        precio_compra: initialValues.precio_compra ?? ''
      });
    } else {
      setForm({
        modelo: '',
        stock: 0,
        porcentaje_ganancia: 0,
        url: '',
        marca: '',
        vendedor: '',
        precio_compra: ''
      });
    }
  }, [initialValues]);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const payload = { ...form };

      if (!payload.url) {
        delete payload.url;
        payload.precio_compra = parseFloat(payload.precio_compra);
      }

      if (isEdit) {
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}/items/${initialValues.id}`, payload);
      } else {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/items`, payload);
      }

      onCreated();
    } catch (err) {
      alert('Failed to save product.');
    }
  };

  return (
    <Dialog open={true} handler={onClose} size="xl">
      <DialogHeader>
        <Typography variant="h5" color="blue-gray">
          {isEdit ? 'Edit Product' : 'New Product'}
        </Typography>
      </DialogHeader>

      <form onSubmit={handleSubmit}>
        <DialogBody className="grid grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto">
          <Input label="Model" name="modelo" value={form.modelo} onChange={handleChange} required />
          <Input label="Stock" name="stock" type="number" value={form.stock} onChange={handleChange} />

          <Input label="% Gain" name="porcentaje_ganancia" type="number" value={form.porcentaje_ganancia} onChange={handleChange} required />

          <Input label="URL (optional)" name="url" value={form.url} onChange={handleChange} className="col-span-2" />

          {!form.url && (
            <>
              <Input label="Brand" name="marca" value={form.marca} onChange={handleChange} required />
              <Input label="Seller" name="vendedor" value={form.vendedor} onChange={handleChange} required />
              <Input
                label="Purchase Price"
                name="precio_compra"
                type="number"
                step="0.01"
                value={form.precio_compra}
                onChange={handleChange}
                className="col-span-2"
                required={!isEdit} // opcional en edición, obligatorio en creación
              />
            </>
          )}

        </DialogBody>

        <DialogFooter>
          <Button variant="text" color="red" onClick={onClose} className="mr-2">
            Cancel
          </Button>
          <Button type="submit" color="green">
            {isEdit ? 'Save Changes' : 'Save Product'}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
