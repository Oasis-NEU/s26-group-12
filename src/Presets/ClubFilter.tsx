import { useState } from "react";

const FILTERS: Record<string, string[]> = {
  "Average Rating": ["4.5 - 5.0", "3.0 - 5.0", "1.5 - 5.0"],
  "Club Category": [
    "Arts & Music", "Service & Volunteer", "Sports & Recreation",
    "Professional", "Religious & Spiritual", "Greek Life",
    "Political & Advocacy", "STEM", "Gaming & Esports", "Health & Wellness"
  ],
  "Meeting Days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  "# of Ratings": ["5+", "15+", "50+"],
};

type FilterState = Record<string, string>;

interface ClubSearchFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
  onClose?: () => void;
}

export default function ClubSearchFilters({ onFilterChange, onClose }: ClubSearchFiltersProps) {
  const [selected, setSelected] = useState<FilterState>({});
  const [visible, setVisible] = useState(true);

  const pick = (cat: string, val: string) => {
    setSelected(prev => {
      const updated = { ...prev, [cat]: prev[cat] === val ? "" : val };
      onFilterChange?.(updated);
      return updated;
    });
  };

  const clearAll = () => {
    setSelected({});
    onFilterChange?.({});
  };

  const close = () => {
    setVisible(false);
    onClose?.();
  };

  if (!visible) return null;

  const categories = Object.keys(FILTERS);

  return (
    /* Backdrop */
    <div
      onClick={close}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(52, 52, 52, 0.6)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000,
      }}
    >
      {/* Modal panel — stop click from bubbling to backdrop */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#141414ff",
          borderRadius: 14,
          padding: "28px 32px 24px",
          width: "90%",
          maxWidth: 880,
          fontFamily: "'Segoe UI', sans-serif",
          boxSizing: "border-box",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        }}
      >
        {/* Header */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", marginBottom: 22,
        }}>
          <span style={{ color: "#fff", fontSize: 20, fontWeight: 600 }}>
            Search filters
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button
              onClick={clearAll}
              style={{
                background: "none", border: "none", color: "#aaa",
                fontSize: 13, cursor: "pointer", textDecoration: "underline",
              }}
            >
              Clear all
            </button>
            <button
              onClick={close}
              style={{
                background: "none", border: "none", color: "#aaa",
                fontSize: 22, cursor: "pointer", lineHeight: 1,
                padding: "0 2px", display: "flex", alignItems: "center",
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Columns */}
        <div style={{ display: "flex" }}>
          {categories.map((cat, ci) => (
            <div key={cat} style={{
              flex: 1,
              borderRight: ci < categories.length - 1 ? "1px solid #3a3a3a" : "none",
              paddingRight: ci < categories.length - 1 ? 22 : 0,
              paddingLeft: ci > 0 ? 22 : 0,
            }}>
              <div style={{
                color: "#eaeaeaff", fontSize: 10.5, fontWeight: 700,
                letterSpacing: "0.09em", textTransform: "uppercase", marginBottom: 10,
              }}>
                {cat}
              </div>
              <div style={{ borderBottom: "1px solid #3a3a3a", marginBottom: 14 }} />

              {FILTERS[cat].map(opt => {
                const isSelected = selected[cat] === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => pick(cat, opt)}
                    style={{
                      display: "block", width: "100%", textAlign: "left",
                      background: "none", border: "none", cursor: "pointer",
                      padding: "5px 0", color: isSelected ? "#fff" : "#c3c3c3ff",
                      fontWeight: isSelected ? 700 : 400,
                      fontSize: 13.5, borderRadius: 4,
                      transition: "color 0.1s",
                    }}
                    onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.color = "#ddd"; }}
                    onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.color = "#aaa"; }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Active filter chips */}
        {Object.values(selected).some(Boolean) && (
          <div style={{
            display: "flex", flexWrap: "wrap", gap: 8,
            marginTop: 20, paddingTop: 16, borderTop: "1px solid #3a3a3a",
          }}>
            {Object.entries(selected).filter(([, v]) => v).map(([cat, val]) => (
              <span key={cat} style={{
                background: "#2e2e2e", border: "1px solid #444",
                borderRadius: 20, padding: "4px 12px",
                color: "#ddd", fontSize: 12, display: "flex", alignItems: "center", gap: 6,
              }}>
                <span style={{ color: "#cacacaff", fontSize: 11 }}>{cat}:</span> {val}
                <span
                  onClick={() => pick(cat, val)}
                  style={{ cursor: "pointer", color: "#888", fontSize: 14, lineHeight: 1 }}
                >×</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}