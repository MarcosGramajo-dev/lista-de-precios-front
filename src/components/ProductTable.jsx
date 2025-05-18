import {
  Card,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function ProductTable({
  products,
  columnSettings,
  onEdit,
  onScrapeUpdate,
  onDelete,
  onShowHistory,
  onSort,
  sortColumn,
  sortDirection
}) {

  const columns = [
    { key: "modelo", label: "Model" },
    { key: "marca", label: "Brand" },
    { key: "vendedor", label: "Seller" },
    { key: "stock", label: "Stock" },
    { key: "porcentaje_ganancia", label: "% Gain" },
    { key: "precio_compra", label: "Purchase Price" },
    { key: "precio_venta", label: "Sale Price" },
    { key: "registrado_en", label: "Date" },
  ];
  
  const visibleColumns = columns.filter(col => columnSettings[col.key]);
  

  const renderHeader = (label, key) => (
    <th
      key={key}
      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 cursor-pointer"
      onClick={() => onSort(key)}
    >
      <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
        {label} {sortColumn === key && (sortDirection === 'asc' ? '↑' : '↓')}
      </Typography>
    </th>
  );

  const getCell = (value, className) => (
    <td className={className}>{value !== undefined && value !== null ? value : "-"}</td>
  );

  return (
    <Card className="mt-6">
      <CardBody className="overflow-auto px-0">
        <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {visibleColumns.map(({ key, label }) => (
              <th
                key={key}
                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 cursor-pointer"
                onClick={() => onSort(key)}
              >
                <Typography variant="small" color="blue-gray" className="font-normal opacity-70">
                  {label} {sortColumn === key && (sortDirection === "asc" ? "↑" : "↓")}
                </Typography>
              </th>
            ))}
            <th className="p-4 bg-blue-gray-50/50">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              {visibleColumns.map(({ key }) => (
                <td key={key} className="p-4 border-b border-blue-gray-50">
                  {key === "porcentaje_ganancia"
                    ? `${p[key]}%`
                    : key.includes("precio")
                    ? `$${p[key]?.toLocaleString()}`
                    : key === "registrado_en"
                    ? p[key]?.split("T")[0]
                    : p[key] ?? "-"}
                </td>
              ))}

              <td className="p-4 border-b border-blue-gray-50">
                <div className="flex gap-2 flex-wrap">
                  <Button color="yellow" size="sm" onClick={() => onEdit(p)}>Edit</Button>
                  {p.url && <Button color="blue" size="sm" onClick={() => onScrapeUpdate(p)}>Scrap</Button>}
                  <Button color="red" size="sm" onClick={() => onDelete(p)}>Delete</Button>
                  <Button color="gray" size="sm" onClick={() => onShowHistory(p)}>History</Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>

        </table>
      </CardBody>
    </Card>
  );
}
