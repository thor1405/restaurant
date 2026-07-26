"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1544025162-8316dfc633a1?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1599388859942-e1c8d64cc0de?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1533682805518-48d1f5a8cb39?auto=format&fit=crop&q=80&w=800",
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="pt-32 pb-24 bg-[#111111] min-h-screen">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="Gallery" 
          subtitle="A Visual Journey" 
        />

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 mt-16 max-w-7xl mx-auto">
          {GALLERY_IMAGES.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative rounded-lg overflow-hidden cursor-pointer group break-inside-avoid"
              onClick={() => setSelectedImage(src)}
            >
              {/* Aspect ratios vary naturally based on image, but we'll enforce some random heights for masonry effect simulation if needed. Here we just let the image dictate height. */}
              <div className="relative w-full h-[300px] md:h-[400px]">
                 <Image
                    src={src}
                    alt={`Gallery Image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
              </div>
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white tracking-widest uppercase text-sm border border-white px-4 py-2 backdrop-blur-sm">View</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-12"
              onClick={() => setSelectedImage(null)}
            >
              <button 
                className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <X size={32} />
              </button>
              
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-5xl h-full max-h-[85vh] rounded-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={selectedImage}
                  alt="Enlarged gallery view"
                  fill
                  className="object-contain"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
