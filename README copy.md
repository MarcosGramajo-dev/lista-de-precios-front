# 📦 Lista de Precios

Aplicación web para gestionar productos, realizar seguimiento de precios y actualizarlos automáticamente mediante scraping desde sitios como MercadoLibre.

---

## 🚀 Funcionalidades

- ✅ Agregar productos manualmente o por URL
- ✅ Scraping automático de marca, vendedor y precio de compra (usando Puppeteer)
- ✅ Historial de precios por producto
- ✅ Edición completa de productos
- ✅ Ocultamiento de columnas personalizado
- ✅ Ordenamiento y búsqueda en tabla
- ✅ Paginación automática con scroll infinito
- ✅ Interfaz moderna con Material Tailwind

---

## 🖼️ Capturas

| Modal de Producto | Historial de Precios |
|-------------------|----------------------|
| ![modal](./screenshots/product-modal.png) | ![history](./screenshots/price-history.png) |

---

## 🧱 Tecnologías

### Frontend
- React + Vite
- TailwindCSS + [Material Tailwind](https://www.material-tailwind.com/)
- Axios

### Backend
- Node.js + Express
- Puppeteer
- MySQL 8

---

## ⚙️ Instalación local

### 🔧 Requisitos
- Node.js
- MySQL
- Git

### 🖥️ Clonar el proyecto

```bash
git clone https://github.com/MarcosGramajo-dev/lista-de-precios-front.git
cd lista-de-precios-front
```

### 📦 Instalar dependencias

```bash
npm install
```

### 🚴‍♂️ Ejecutar el frontend

```bash
npm run dev
```

> Recomendación: usar junto al backend corriendo en `localhost:3001`

---

## 🗃️ Base de datos

### 🧱 Tablas principales

```sql
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  modelo VARCHAR(255) NOT NULL,
  url VARCHAR(2048),
  marca VARCHAR(255),
  vendedor VARCHAR(255),
  stock INT DEFAULT 0,
  porcentaje_ganancia INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE product_prices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT,
  precio_compra DECIMAL(10,2),
  precio_venta DECIMAL(10,2),
  registrado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE column_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  column_key VARCHAR(50) NOT NULL UNIQUE,
  visible BOOLEAN DEFAULT TRUE
);
```

---

## 🤖 Scraping

La funcionalidad de scraping obtiene:

- Precio de compra (`.andes-money-amount__fraction`)
- Marca (`.andes-table__column--value`)
- Vendedor (`.ui-seller-data-header__title-container h2`)

Usa Puppeteer y ejecuta headless desde el backend.

---

## 📫 Contacto

Desarrollado por [Marcos Gramajo](https://github.com/MarcosGramajo-dev)  
📧 Email: marcosgramajo.dev@gmail.com

---

## 📝 Licencia

Este proyecto es de uso libre con fines educativos o personales. Para uso comercial, contactarse previamente.