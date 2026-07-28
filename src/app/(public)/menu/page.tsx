"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import DishCard, { Dish } from "@/components/ui/DishCard";
import { Search } from "lucide-react";

const CATEGORIES = ["All", "Starters", "Mains", "Desserts", "Wine"];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [menuItems, setMenuItems] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/menu")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          // Map _id to id for the DishCard component
          const mappedItems = data.data.map((item: any) => ({
            ...item,
            id: item._id,
          }));
          setMenuItems(mappedItems);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, menuItems]);

  return (
    <div className="pt-32 pb-24 bg-[#111111] min-h-screen">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="Our Menu" 
          subtitle="Culinary Excellence" 
        />

        {/* Filters and Search */}
        <div className="max-w-6xl mx-auto mb-16 flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`uppercase tracking-widest text-sm py-2 px-4 transition-all duration-300 ${
                  activeCategory === category 
                    ? "text-(--color-accent) border-b border-(--color-accent)" 
                    : "text-white/60 hover:text-white border-b border-transparent"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-b border-white/20 pb-2 pl-8 text-white placeholder:text-white/40 focus:outline-none focus:border-(--color-accent) transition-colors"
            />
            <Search className="absolute left-0 bottom-3 text-white/40" size={18} />
          </div>
        </div>

        {/* Menu Grid */}
        <div className="max-w-6xl mx-auto min-h-[400px]">
          {loading ? (
            <div className="text-center py-20 text-white/50">Loading menu...</div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
                  {filteredItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                    >
                      <DishCard dish={item} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="col-span-full text-center py-20 text-white/50"
                >
                  No dishes found matching your criteria.
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}
