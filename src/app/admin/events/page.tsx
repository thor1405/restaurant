"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Plus, Edit, Trash2, X, Image as ImageIcon } from "lucide-react";
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

type EventItem = {
  _id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  isActive: boolean;
};

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: 'px',
        width: Math.min(mediaWidth, mediaHeight) * 0.9,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

export default function EventsManager() {
  const [items, setItems] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<EventItem | null>(null);
  
  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cropper State
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState<Crop>();
  const [showCropper, setShowCropper] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      if (data.success) {
        setItems(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch events", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleOpenModal = (item?: EventItem) => {
    if (item) {
      setEditingItem(item);
      setTitle(item.title);
      setDescription(item.description);
      setDate(item.date);
      setImage(item.image);
      setIsActive(item.isActive);
    } else {
      setEditingItem(null);
      setTitle("");
      setDescription("");
      setDate("");
      setImage("");
      setIsActive(true);
    }
    setImgSrc("");
    setShowCropper(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); 
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || '')
      );
      reader.readAsDataURL(e.target.files[0]);
      setShowCropper(true);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 16/9)); // Events use 16:9 or similar wide aspect ratio
  };

  const getCroppedImg = async () => {
    if (!imgRef.current || !crop) return;
    
    const canvas = document.createElement('canvas');
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
    
    const pixelRatio = window.devicePixelRatio;
    
    canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio);
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingQuality = 'high';
    
    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;
    const cropWidth = crop.width * scaleX;
    const cropHeight = crop.height * scaleY;

    ctx.drawImage(
      imgRef.current,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight
    );

    return new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
      }, 'image/jpeg', 0.95);
    });
  };

  const handleUploadCrop = async () => {
    const croppedBlob = await getCroppedImg();
    if (!croppedBlob) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", croppedBlob, "cropped.jpg");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setImage(data.imageUrl);
        setShowCropper(false);
        setImgSrc("");
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
    const payload = { title, description, date, image, isActive };
    
    try {
      const url = editingItem ? `/api/events/${editingItem._id}` : "/api/events";
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
        alert("Failed to save event");
      }
    } catch (error) {
      alert("An error occurred");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    
    try {
      const res = await fetch(`/api/events/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchItems();
      }
    } catch (error) {
      alert("Failed to delete event");
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-heading text-3xl text-black">Events Manager</h1>
        <Button variant="primary" onClick={() => handleOpenModal()}>
          <Plus size={18} className="mr-2" /> Add Event
        </Button>
      </div>

      {loading ? (
        <div className="text-black">Loading events...</div>
      ) : (
        <div className="bg-white rounded-lg border border-black/10 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F7F5F2] border-b border-black/10 text-black/50 text-xs tracking-widest uppercase">
                <th className="p-4 font-medium">Event</th>
                <th className="p-4 font-medium">Date/Time</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-b border-black/5 hover:bg-black/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      {item.image ? (
                        <div className="w-16 h-12 relative rounded overflow-hidden">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-16 h-12 bg-black/10 rounded flex items-center justify-center">
                          <ImageIcon size={20} className="text-black/30" />
                        </div>
                      )}
                      <div>
                        <div className="text-black font-medium">{item.title}</div>
                        <div className="text-black/50 text-sm truncate max-w-xs">{item.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-black/70">{item.date}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs rounded ${item.isActive ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                      {item.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleOpenModal(item)}
                        className="p-2 text-black/50 hover:text-black transition-colors bg-black/5 rounded"
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
                  <td colSpan={4} className="p-8 text-center text-black/50">
                    No events found. Click "Add Event" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Main Form Modal */}
      {isModalOpen && !showCropper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/80 backdrop-blur-sm">
          <div className="bg-white border border-black/10 rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-black/10 p-4 flex justify-between items-center z-10">
              <h2 className="text-xl text-black font-heading">
                {editingItem ? "Edit Event" : "Add Event"}
              </h2>
              <button onClick={handleCloseModal} className="text-black/50 hover:text-black">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-black/70 text-xs tracking-widest uppercase mb-2">Image</label>
                  <div className="flex items-center gap-4">
                    {image && (
                      <div className="w-32 h-18 relative rounded overflow-hidden border border-black/20 flex-shrink-0">
                        <img src={image} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        ref={fileInputRef}
                        onChange={handleFileChange}
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => fileInputRef.current?.click()}
                      >
                        {image ? "Change Image" : "Upload Image"}
                      </Button>
                      <p className="text-black/40 text-xs mt-2">Images will be cropped to a 16:9 ratio.</p>
                    </div>
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-black/70 text-xs tracking-widest uppercase mb-2">Event Title</label>
                  <input 
                    type="text" required value={title} onChange={e => setTitle(e.target.value)}
                    className="w-full bg-[#F7F5F2] border border-black/10 rounded p-3 text-black focus:outline-none focus:border-(--color-accent)"
                  />
                </div>
                
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-black/70 text-xs tracking-widest uppercase mb-2">Date/Time String</label>
                  <input 
                    type="text" required value={date} onChange={e => setDate(e.target.value)} placeholder="e.g. Every Thursday | 10:00 AM"
                    className="w-full bg-[#F7F5F2] border border-black/10 rounded p-3 text-black focus:outline-none focus:border-(--color-accent)"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-black/70 text-xs tracking-widest uppercase mb-2">Description</label>
                  <textarea 
                    required value={description} onChange={e => setDescription(e.target.value)} rows={3}
                    className="w-full bg-[#F7F5F2] border border-black/10 rounded p-3 text-black focus:outline-none focus:border-(--color-accent)"
                  />
                </div>

                <div className="col-span-2 flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="isActive"
                    checked={isActive} 
                    onChange={e => setIsActive(e.target.checked)}
                    className="w-4 h-4 accent-(--color-accent)"
                  />
                  <label htmlFor="isActive" className="text-black/70 text-sm">Event is currently active and visible on website</label>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t border-black/10">
                <Button type="button" variant="outline" onClick={handleCloseModal}>Cancel</Button>
                <Button type="submit" variant="primary">Save Event</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cropper Modal */}
      {showCropper && imgSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/80 backdrop-blur-sm">
          <div className="bg-white border border-black/10 rounded-lg w-full max-w-2xl">
            <div className="p-4 border-b border-black/10 flex justify-between items-center">
              <h2 className="text-xl text-black font-heading">Crop Image</h2>
              <button onClick={() => setShowCropper(false)} className="text-black/50 hover:text-black">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 flex justify-center max-h-[60vh] overflow-y-auto bg-[#F7F5F2]">
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                aspect={16/9}
                className="max-w-full"
              >
                <img
                  ref={imgRef}
                  alt="Crop me"
                  src={imgSrc}
                  onLoad={onImageLoad}
                  className="max-h-[50vh] w-auto"
                />
              </ReactCrop>
            </div>
            <div className="p-4 border-t border-black/10 flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => setShowCropper(false)}>
                Cancel
              </Button>
              <Button type="button" variant="primary" onClick={handleUploadCrop} disabled={uploading}>
                {uploading ? "Uploading..." : "Save Crop"}
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
