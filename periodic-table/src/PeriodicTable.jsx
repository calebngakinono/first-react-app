import { useState } from "react";
import { elements, categories } from "./data/elements";
import "./PeriodicTable.css";

function ElementCard({ element, onClick, isSelected }) {
  const categoryStyle = categories[element.category];

  return (
    <div
      className={`element ${element.category} ${isSelected ? "selected" : ""}`}
      style={{ 
        "--category-color": categoryStyle.color,
        gridColumn: element.group,
        gridRow: element.period
      }}
      onClick={() => onClick(element)}
    >
      <span className="atomic-number">{element.number}</span>
      <span className="symbol">{element.symbol}</span>
      <span className="name">{element.name}</span>
      <span className="mass">{element.mass}</span>
    </div>
  );
}

function ElementDetail({ element, onClose }) {
  if (!element) return null;
  const categoryStyle = categories[element.category];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <div className="detail-header" style={{ backgroundColor: categoryStyle.color }}>
          <span className="detail-number">{element.number}</span>
          <span className="detail-symbol">{element.symbol}</span>
          <span className="detail-name">{element.name}</span>
        </div>
        <div className="detail-body">
          <div className="detail-row">
            <span className="label">Atomic Mass</span>
            <span className="value">{element.mass} u</span>
          </div>
          <div className="detail-row">
            <span className="label">Category</span>
            <span className="value" style={{ color: categoryStyle.color }}>{categoryStyle.name}</span>
          </div>
          <div className="detail-row">
            <span className="label">Period</span>
            <span className="value">{element.period}</span>
          </div>
          <div className="detail-row">
            <span className="label">Group</span>
            <span className="value">{element.group}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Legend() {
  return (
    <div className="legend">
      {Object.entries(categories).map(([key, { name, color }]) => (
        <div key={key} className="legend-item">
          <span className="legend-color" style={{ backgroundColor: color }}></span>
          <span className="legend-name">{name}</span>
        </div>
      ))}
    </div>
  );
}

export default function PeriodicTable() {
  const [selectedElement, setSelectedElement] = useState(null);

  const getPosition = (element) => {
    if (element.period === 8) {
      return { gridColumn: element.group + 2, gridRow: 6 };
    }
    if (element.period === 9) {
      return { gridColumn: element.group + 2, gridRow: 7 };
    }
    return { gridColumn: element.group, gridRow: element.period };
  };

  return (
    <div className="periodic-table-container">
      <h1>Interactive Periodic Table</h1>
      <Legend />
      <div className="periodic-table">
        {elements.map((element) => {
          const pos = getPosition(element);
          return (
            <div
              key={element.number}
              className={`element-wrapper ${element.category}`}
              style={pos}
            >
              <div
                className={`element ${selectedElement?.number === element.number ? "selected" : ""}`}
                style={{ "--category-color": categories[element.category].color }}
                onClick={() => setSelectedElement(element)}
              >
                <span className="atomic-number">{element.number}</span>
                <span className="symbol">{element.symbol}</span>
                <span className="name">{element.name}</span>
              </div>
            </div>
          );
        })}
      </div>
      <ElementDetail 
        element={selectedElement} 
        onClose={() => setSelectedElement(null)} 
      />
    </div>
  );
}
