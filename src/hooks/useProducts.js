
import { useEffect, useState } from 'react';
import axios from 'axios';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [visibleCount, setVisibleCount] = useState(20);
  const itemsPerPage = 20;

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setVisibleCount(itemsPerPage);
  }, [searchTerm]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.innerHeight + window.scrollY;
      const bottom = document.documentElement.offsetHeight;

      if (scrollY >= bottom - 100) {
        setVisibleCount(prev => prev + itemsPerPage);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/items`);
      setProducts(res.data);
    } catch {
      alert('Failed to load products.');
    }
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const filtered = products
    .filter(p => {
      const term = searchTerm.toLowerCase();
      return (
        p.modelo?.toLowerCase().includes(term) ||
        p.marca?.toLowerCase().includes(term) ||
        p.vendedor?.toLowerCase().includes(term)
      );
    })
    .sort((a, b) => {
      if (!sortColumn) return 0;
      const valA = a[sortColumn], valB = b[sortColumn];
      return typeof valA === 'string'
        ? sortDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA)
        : sortDirection === 'asc' ? valA - valB : valB - valA;
    });

  const paginatedProducts = filtered.slice(0, visibleCount);

  return {
    products: paginatedProducts,
    setSearchTerm,
    searchTerm,
    fetchProducts,
    handleSort,
    sortColumn,
    sortDirection
  };
}
