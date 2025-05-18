export default function ColumnToggle({ columnSettings, toggleColumn }) {
    return (
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(columnSettings).map(([key, visible]) => (
          <button
            key={key}
            className={`text-sm px-3 py-1 border rounded transition
              ${visible ? 'bg-[#7FB26F] text-white' : 'bg-gray-200 text-gray-600'}`}
            onClick={() => toggleColumn(key)}
          >
            {visible ? `${key}` : `${key}`}
          </button>
        ))}
      </div>
    );
  }
  