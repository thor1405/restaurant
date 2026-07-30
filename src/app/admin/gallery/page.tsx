"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Plus, Trash2, Image as ImageIcon, X } from "lucide-react";
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

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

type GalleryItem = {
  _id: string;
  imageUrl: string;
  createdAt: string;
};

export default function GalleryManager() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cropper State
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState<Crop>();
  const [showCropper, setShowCropper] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      if (data.success) {
        setItems(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch gallery items", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || '')
      );
      reader.readAsDataURL(e.target.files[0]);
      setShowCropper(true);
    }
    // reset input so the same file can be selected again
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 1));
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
    if (!image) {
      alert("Please upload an image first");
      return;
    }
    
    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: image }),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setImage("");
        fetchItems();
      } else {
        alert("Failed to save image");
      }
    } catch (error) {
      alert("An error occurred");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    
    try {
      const res = await fetch(`/api/gallery/${id}`, {
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
        <h1 className="font-heading text-3xl text-black">Gallery Manager</h1>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} className="mr-2" /> Add Image
        </Button>
      </div>

      {loading ? (
        <div className="text-black">Loading gallery...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item._id} className="relative group bg-white rounded-lg overflow-hidden border border-black/10">
              <div className="relative w-full h-48">
                <img src={item.imageUrl} alt="Gallery" className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button 
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500/20 text-red-500 p-3 rounded-full hover:bg-red-500 hover:text-black transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="col-span-full p-8 text-center text-black/50 bg-white rounded-lg border border-black/10">
              No images in gallery. Click "Add Image" to upload some.
            </div>
          )}
        </div>
      )}

      {isModalOpen && !showCropper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/80 backdrop-blur-sm">
          <div className="bg-white border border-black/10 rounded-lg w-full max-w-md">
            <div className="p-4 border-b border-black/10 flex justify-between items-center">
              <h2 className="text-xl text-black font-heading">Add Gallery Image</h2>
              <button onClick={() => { setIsModalOpen(false); setImage(""); }} className="text-black/50 hover:text-black">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-black/70 text-xs tracking-widest uppercase mb-4">Image</label>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-black/20 rounded-lg p-8">
                  {image ? (
                    <div className="relative w-full h-48 mb-4">
                      <img src={image} alt="Preview" className="w-full h-full object-contain" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center mb-4">
                      <ImageIcon size={32} className="text-black/30" />
                    </div>
                  )}
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
                    disabled={uploading}
                  >
                    {uploading ? "Uploading..." : (image ? "Change Image" : "Select Image")}
                  </Button>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t border-black/10">
                <Button type="button" variant="outline" onClick={() => { setIsModalOpen(false); setImage(""); }}>Cancel</Button>
                <Button type="submit" variant="primary" disabled={!image || uploading}>Add to Gallery</Button>
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
                aspect={1}
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
