import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_URL } from "../config";

function BorrowBook() {
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedBook, setSelectedBook] = useState("");
  const [selectedMember, setSelectedMember] = useState("");
  const [borrowRecords, setBorrowRecords] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        console.log("🔄 Loading books, members, and borrow records...");

        const [booksRes, membersRes, borrowRes] = await Promise.all([
          fetch(`${API_URL}/api/books`),
          fetch(`${API_URL}/api/members`),
          fetch(`${API_URL}/api/borrow`),
        ]);

        const booksData = await booksRes.json();
        const membersData = await membersRes.json();
        let borrowData = await borrowRes.json();

        // ✅ Ensure it's always an array
        if (!Array.isArray(borrowData)) {
          borrowData = borrowData.content || [];
        }

        console.log("✅ Books loaded:", booksData);
        console.log("✅ Members loaded:", membersData);
        console.log("✅ Borrow records loaded:", borrowData);

        setBooks(booksData || []);
        setMembers(membersData || []);
        setBorrowRecords(borrowData || []);
      } catch (error) {
        console.error("❌ Error loading data:", error);
        setBorrowRecords([]);
      }
    }

    loadData();
  }, []);

  const handleBorrow = async (e) => {
    e.preventDefault();

    const record = {
      book: { id: parseInt(selectedBook) },
      member: { id: parseInt(selectedMember) },
    };

    console.log("📤 Sending borrow record to backend:", record);

    try {
      const response = await fetch(`${API_URL}/api/borrow`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });

      console.log("📥 Borrow API response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Borrow API error response:", errorText);
        alert("Failed to borrow book. Check console for details.");
        return;
      }

      const savedRecord = await response.json();
      console.log("✅ Borrow record saved successfully:", savedRecord);

      alert("Book borrowed successfully!");
      window.location.reload();
    } catch (error) {
      console.error("❌ Error sending borrow record:", error);
      alert("Error connecting to backend!");
    }
  };

  const handleReturn = async (id) => {
    console.log(`🔁 Sending return request for record ID: ${id}`);

    try {
      const response = await fetch(`${API_URL}/api/borrow/${id}/return`, {
        method: "PUT",
      });

      console.log("📥 Return API response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Return API error:", errorText);
        alert("Failed to return book. Check console for details.");
        return;
      }

      const updatedRecord = await response.json();
      console.log("✅ Book returned successfully:", updatedRecord);

      alert("Book returned!");
      window.location.reload();
    } catch (error) {
      console.error("❌ Error returning book:", error);
      alert("Error connecting to backend!");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Borrow a Book</h2>
      <form onSubmit={handleBorrow} className="mb-4">
        <div className="row">
          <div className="col-md-5">
            <label className="form-label">Select Book</label>
            <select
              className="form-select"
              value={selectedBook}
              onChange={(e) => setSelectedBook(e.target.value)}
              required
            >
              <option value="">Choose...</option>
              {books.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.title}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-5">
            <label className="form-label">Select Member</label>
            <select
              className="form-select"
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
              required
            >
              <option value="">Choose...</option>
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-2 d-flex align-items-end">
            <button type="submit" className="btn btn-primary w-100">
              Borrow
            </button>
          </div>
        </div>
      </form>

      <h4>Borrow Records</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Book</th>
            <th>Member</th>
            <th>Borrow Date</th>
            <th>Return Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {borrowRecords.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.book?.title}</td>
              <td>{r.member?.name}</td>
              <td>{r.borrowDate}</td>
              <td>{r.returnDate || "-"}</td>
              <td>{r.status}</td>
              <td>
                {r.status === "BORROWED" && (
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleReturn(r.id)}
                  >
                    Return
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BorrowBook;
