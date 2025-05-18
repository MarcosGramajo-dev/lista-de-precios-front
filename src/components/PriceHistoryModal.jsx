
import { useEffect, useState } from 'react';
import axios from 'axios';

import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Button,
  Table,
} from "@material-tailwind/react";

export default function PriceHistoryModal({ product, onClose }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/items/${product.id}/prices`);
        setHistory(res.data);
      } catch (err) {
        alert('Failed to load price history.');
      }
    };

    fetchHistory();
  }, [product]);

  return (
    <Dialog open={true} handler={onClose} size="xl">
      <DialogHeader>
        <Typography variant="h5" color="blue-gray">
          Price History - {product.modelo}
        </Typography>
      </DialogHeader>

      <DialogBody className="overflow-y-auto max-h-[60vh]">
        {history.length === 0 ? (
          <Typography color="gray" className="text-center">
            No price records found.
          </Typography>
        ) : (
          <div className="overflow-auto px-0">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50 text-left">
                    <Typography variant="small" color="blue-gray" className="font-normal opacity-70">
                      Purchase Price
                    </Typography>
                  </th>
                  <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50 text-left">
                    <Typography variant="small" color="blue-gray" className="font-normal opacity-70">
                      Sale Price
                    </Typography>
                  </th>
                  <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50 text-left">
                    <Typography variant="small" color="blue-gray" className="font-normal opacity-70">
                      Date
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                {history.map((h) => (
                  <tr key={h.id}>
                    <td className="p-4 border-b border-blue-gray-50">${h.precio_compra}</td>
                    <td className="p-4 border-b border-blue-gray-50">${h.precio_venta}</td>
                    <td className="p-4 border-b border-blue-gray-50">{h.registrado_en?.split('T')[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </DialogBody>

      <DialogFooter>
        <Button color="red" onClick={onClose}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
