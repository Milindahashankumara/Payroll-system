import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus, FaEye } from "react-icons/fa";

export default function OT() {
  const [ots, setOts] = useState([]);
  const [selectedOT, setSelectedOT] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editOT, setEditOT] = useState({});
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newOT, setNewOT] = useState({ name: "", rate: "" });

  useEffect(() => {
    fetchOTs();
  }, []);

  const fetchOTs = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/ot`);
      setOts(res.data);
    } catch (err) {
      console.error("Error fetching OTs", err);
    }
  };

  const fetchOTById = async (id) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/ot/${id}`);
      setSelectedOT(res.data);
      setIsModalOpen(true);
    } catch (err) {
      console.error("Error fetching OT details", err);
    }
  };

  const openEditModal = (ot) => {
    setEditOT({ ...ot });
    setIsEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditOT((prev) => ({ ...prev, [name]: value }));
  };

  const updateOT = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/ot/${editOT.id}`, editOT);
      setOts((prev) => prev.map((ot) => (ot.id === editOT.id ? editOT : ot)));
      setIsEditModalOpen(false);
    } catch (err) {
      console.error("Error updating OT", err);
    }
  };

  const deleteOT = async (id) => {
    if (!window.confirm("Are you sure you want to delete this OT?")) return;
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/ot/${id}`);
      setOts((prev) => prev.filter((ot) => ot.id !== id));
    } catch (err) {
      console.error("Error deleting OT", err);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Overtime Rates</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage overtime types and rates.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* <button
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition"
            >
              <FaPlus /> Create New
            </button> */}
          </div>
        </div>

        {/* Table for medium+ screens */}
        <div className="hidden sm:block bg-white shadow rounded-lg overflow-hidden">
          <div className="w-full overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th> */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {ots.length > 0 ? (
                  ots.map((ot) => (
                    <tr key={ot.id} className="hover:bg-gray-50">
                      {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{ot.id}</td> */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{ot.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{ot.rate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                        <div className="inline-flex items-center gap-2">
                          <button
                            aria-label={`view-${ot.id}`}
                            onClick={() => fetchOTById(ot.id)}
                            className="p-2 rounded-md text-blue-600 hover:bg-blue-50 transition"
                          >
                            <FaEye />
                          </button>
                          <button
                            aria-label={`edit-${ot.id}`}
                            onClick={() => openEditModal(ot)}
                            className="p-2 rounded-md text-indigo-600 hover:bg-indigo-50 transition"
                          >
                            <FaEdit />
                          </button>
                          {/* <button
                            aria-label={`delete-${ot.id}`}
                            onClick={() => deleteOT(ot.id)}
                            className="p-2 rounded-md text-red-600 hover:bg-red-50 transition"
                          >
                            <FaTrash />
                          </button> */}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-sm text-gray-500">
                      No OTs found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Card list for small screens */}
        <div className="sm:hidden space-y-4">
          {ots.length > 0 ? (
            ots.map((ot) => (
              <div
                key={ot.id}
                className="bg-white shadow-sm rounded-lg p-4 flex items-start justify-between"
              >
                <div>
                  <div className="text-sm font-medium text-gray-800">{ot.name}</div>
                  <div className="text-xs text-gray-500 mt-1">Rate: {ot.rate}</div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button
                    aria-label={`view-${ot.id}`}
                    onClick={() => fetchOTById(ot.id)}
                    className="p-2 rounded-md text-blue-600 hover:bg-blue-50 transition"
                  >
                    <FaEye />
                  </button>
                  <button
                    aria-label={`edit-${ot.id}`}
                    onClick={() => openEditModal(ot)}
                    className="p-2 rounded-md text-indigo-600 hover:bg-indigo-50 transition"
                  >
                    <FaEdit />
                  </button>
                  {/* <button
                    aria-label={`delete-${ot.id}`}
                    onClick={() => deleteOT(ot.id)}
                    className="p-2 rounded-md text-red-600 hover:bg-red-50 transition"
                  >
                    <FaTrash />
                  </button> */}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white shadow-sm rounded-lg p-6 text-center text-gray-500">
              No OTs found
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Edit OT</h2>
            <form className="space-y-3">
              <input
                type="text"
                name="name"
                value={editOT.name || ""}
                onChange={handleEditChange}
                placeholder="OT Name"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="number"
                name="rate"
                value={editOT.rate || ""}
                onChange={handleEditChange}
                placeholder="Rate"
                className="w-full border px-3 py-2 rounded"
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={updateOT}
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isCreateModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-xl font-bold mb-4">Create OT</h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const res = await axios.post(
              `${process.env.REACT_APP_API_BASE_URL}/api/ot`,
              newOT
            );
            setOts((prev) => [...prev, res.data]);
            setIsCreateModalOpen(false);
            setNewOT({ name: "", rate: "" });
          } catch (err) {
            console.error("Error creating OT", err);
          }
        }}
        className="space-y-3"
      >
        <input
          type="text"
          name="name"
          value={newOT.name}
          onChange={(e) => setNewOT({ ...newOT, name: e.target.value })}
          placeholder="OT Name"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="number"
          name="rate"
          value={newOT.rate}
          onChange={(e) => setNewOT({ ...newOT, rate: e.target.value })}
          placeholder="Rate"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <div className="flex gap-3">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(false)}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}


      {/* View Modal */}
      {isModalOpen && selectedOT && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">OT Details</h2>
            {/* <p><strong>ID:</strong> {selectedOT.id}</p> */}
            <p><strong>Name:</strong> {selectedOT.name}</p>
            <p><strong>Rate:</strong> {selectedOT.rate}</p>
            {/* <p><strong>Active:</strong> {selectedOT.isActive ? "Yes" : "No"}</p> */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
