import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_URL } from "../config";

function Bibles() {
  const [bibles, setBibles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function fetchBibles() {
      try {
        const res = await fetch(`${API_URL}/api/bibles`);
        const data = await res.json();
        setBibles(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Unable to fetch bibles", e);
      } finally {
        setLoading(false);
      }
    }
    fetchBibles();
  }, []);

  const filtered = query.trim()
    ? bibles.filter(b => {
        const q = query.trim().toLowerCase();
        return (
          (b.language || "").toLowerCase().includes(q) ||
          (b.version || "").toLowerCase().includes(q)
        );
      })
    : bibles;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Bibles</h2>
        <span className="badge bg-secondary fs-6">{bibles.length} total</span>
      </div>

      <p className="text-muted small">
        Andmed päringuga back-endi kaudu väliselt API-lt:{" "}
        <code>https://holy-bible-api.com/bibles</code>
      </p>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Filter by language or version..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading ? (
        <p className="text-center text-muted py-4">Loading bibles...</p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-muted py-4">
          {query ? `No bibles match "${query}".` : "No bibles available."}
        </p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th style={{ width: "80px" }}>ID</th>
                <th>Language</th>
                <th>Version</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((bible) => (
                <tr key={bible.bible_id}>
                  <td className="text-muted">{bible.bible_id}</td>
                  <td className="text-capitalize">{bible.language || "—"}</td>
                  <td>{bible.version || <span className="text-muted">—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Bibles;
