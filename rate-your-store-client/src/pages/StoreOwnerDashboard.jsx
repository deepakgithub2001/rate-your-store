import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

export default function StoreOwnerDashboard() {
  const { user } = useAuth();
  const [stores, setStores] = useState([]);
  const [newStore, setNewStore] = useState({
    name: "",
    address: "",
    description: "",
  });
  const [editStoreId, setEditStoreId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    address: "",
    description: "",
  });

  // Fetch stores
  useEffect(() => {
    if (!user) return;
    api
      .get("/stores", { withCredentials: true })
      .then((res) => setStores(res.data))
      .catch(() => setStores([]));
  }, [user]);

  // Create store
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(
        "/stores",
        { store: newStore },
        { withCredentials: true }
      );
      setStores([...stores, res.data]);
      setNewStore({ name: "", address: "", description: "" });
    } catch (err) {
      alert("Error creating store");
    }
  };

  // Delete store
  const handleDelete = async (storeId) => {
    if (!window.confirm("Are you sure you want to delete this store?")) return;
    try {
      await api.delete(`/stores/${storeId}`, { withCredentials: true });
      setStores(stores.filter((s) => s.id !== storeId));
    } catch (err) {
      alert("Error deleting store");
    }
  };

  // Start editing a store
  const handleEdit = (store) => {
    setEditStoreId(store.id);
    setEditData({
      name: store.name,
      address: store.address,
      description: store.description,
    });
  };

  // Cancel edit
  const cancelEditing = () => {
    setEditStoreId(null);
    setEditData({ name: "", address: "", description: "" });
  };

  // Submit edit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.patch(
        `/stores/${editStoreId}`,
        { store: editData },
        { withCredentials: true }
      );
      setStores(stores.map((s) => (s.id === editStoreId ? res.data : s)));
      cancelEditing();
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Store Owner Dashboard</h1>

        {/* Create Store Form */}
        <form
          onSubmit={handleCreate}
          className="bg-white shadow p-4 rounded mb-6"
        >
          <h2 className="text-xl font-semibold mb-4">Create a Store</h2>
          <input
            type="text"
            placeholder="Name"
            value={newStore.name}
            onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={newStore.address}
            onChange={(e) =>
              setNewStore({ ...newStore, address: e.target.value })
            }
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <textarea
            placeholder="Description"
            value={newStore.description}
            onChange={(e) =>
              setNewStore({ ...newStore, description: e.target.value })
            }
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create Store
          </button>
        </form>

        {/* Store List */}
        <div className="space-y-4">
          {stores.map((store) => (
            <div key={store.id} className="bg-gray-100 p-4 rounded shadow">
              {editStoreId === store.id ? (
                <form onSubmit={handleEditSubmit} className="space-y-2">
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="text"
                    value={editData.address}
                    onChange={(e) =>
                      setEditData({ ...editData, address: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                  <textarea
                    value={editData.description}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        description: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={cancelEditing}
                      className="bg-gray-400 text-white px-4 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h3 className="text-xl font-semibold">{store.name}</h3>
                  <p className="text-gray-600">{store.address}</p>
                  <p className="text-gray-700 mb-2">{store.description}</p>
                  <p className="text-sm text-yellow-600">
                    Avg Rating:{" "}
                    {typeof store.average_rating === "number"
                      ? store.average_rating.toFixed(1)
                      : "Not rated yet"}
                  </p>
                  <div className="flex items-center justify-start gap-5 mt-3">
                    <button
                      onClick={() => handleEdit(store)}
                      className="bg-blue-500 text-white hover:bg-blue-700 px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(store.id)}
                      className="bg-red-500 text-white hover:bg-red-700 px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
} 
