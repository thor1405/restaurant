"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Plus, Edit, Trash2, X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

type MenuItem = {
  _id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
};

export default function MenuManager() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  
  // Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Starters");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/menu");
      const data = await res.json();
      if (data.success) {
        setItems(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch menu items", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleOpenModal = (item?: MenuItem) => {
    if (item) {
      setEditingItem(item);
      setName(item.name);
      setDescription(item.description);
      setPrice(item.price);
      setCategory(item.category);
      setImage(item.image);
    } else {
      setEditingItem(null);
      setName("");
      setDescription("");
      setPrice("");
      setCategory("Starters");
      setImage("");
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setImage(data.imageUrl);
      } else {
        alert("Upload failed");
      }
    } catch (error) {
      alert("Error uploading image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { name, description, price, category, image };
    
    try {
      const url = editingItem ? `/api/menu/${editingItem._id}` : "/api/menu";
      const method = editingItem ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        handleCloseModal();
        fetchItems();
      } else {
        alert("Failed to save item");
      }
    } catch (error) {
      alert("An error occurred");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    
    try {
      const res = await fetch(`/api/menu/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchItems();
      }
    } catch (error) {
      alert("Failed to delete item");
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-heading text-3xl text-white">Menu Manager</h1>
        <Button variant="primary" onClick={() => handleOpenModal()}>
          <Plus size={18} className="mr-2" /> Add Item
        </Button>
      </div>

      {loading ? (
        <div className="text-white">Loading menu...</div>
      ) : (
        <div className="bg-[#1C1C1C] rounded-lg border border-white/10 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/50 border-b border-white/10 text-white/50 text-xs tracking-widest uppercase">
                <th className="p-4 font-medium">Item</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      {item.image ? (
                        <div className="w-12 h-12 relative rounded overflow-hidden">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-white/10 rounded flex items-center justify-center">
                          <ImageIcon size={20} className="text-white/30" />
                        </div>
                      )}
                      <div>
                        <div className="text-white font-medium">{item.name}</div>
                        <div className="text-white/50 text-sm truncate max-w-xs">{item.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-white/70">{item.category}</td>
                  <td className="p-4 text-white/70">{item.price}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleOpenModal(item)}
                        className="p-2 text-white/50 hover:text-white transition-colors bg-white/5 rounded"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(item._id)}
                        className="p-2 text-red-500/70 hover:text-red-500 transition-colors bg-red-500/10 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-white/50">
                    No menu items found. Click "Add Item" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1C1C1C] border border-white/10 rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#1C1C1C] border-b border-white/10 p-4 flex justify-between items-center z-10">
              <h2 className="text-xl text-white font-heading">
                {editingItem ? "Edit Menu Item" : "Add Menu Item"}
              </h2>
              <button onClick={handleCloseModal} className="text-white/50 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-white/70 text-xs tracking-widest uppercase mb-2">Image</label>
                  <div className="flex items-center gap-4">
                    {image && (
                      <div className="w-24 h-24 relative rounded overflow-hidden border border-white/20">
                        <Image src={image} alt="Preview" fill className="object-cover" />
                      </div>
                    )}
                    <div>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                      >
                        {uploading ? "Uploading..." : image ? "Change Image" : "Upload Image"}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-white/70 text-xs tracking-widest uppercase mb-2">Name</label>
                  <input 
                    type="text" required value={name} onChange={e => setName(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-(--color-accent)"
                  />
                </div>
                
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-white/70 text-xs tracking-widest uppercase mb-2">Price (e.g. $24)</label>
                  <input 
                    type="text" required value={price} onChange={e => setPrice(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-(--color-accent)"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-white/70 text-xs tracking-widest uppercase mb-2">Category</label>
                  <select 
                    value={category} onChange={e => setCategory(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-(--color-accent)"
                  >
                    <option value="Starters">Starters</option>
                    <option value="Mains">Mains</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Wine">Wine</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-white/70 text-xs tracking-widest uppercase mb-2">Description</label>
                  <textarea 
                    required value={description} onChange={e => setDescription(e.target.value)} rows={3}
                    className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-(--color-accent)"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
                <Button type="button" variant="outline" onClick={handleCloseModal}>Cancel</Button>
                <Button type="submit" variant="primary">Save Item</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
