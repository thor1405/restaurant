"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import DishCard, { Dish } from "@/components/ui/DishCard";
import { Search } from "lucide-react";

const CATEGORIES = ["All", "Starters", "Mains", "Desserts", "Wine"];

const MENU_ITEMS: Dish[] = [
  {
    id: "1",
    name: "Oysters Rockefeller",
    description: "Fresh East Coast oysters, spinach, watercress, pernod, hollandaise.",
    price: "$36",
    category: "Starters",
    image: "https://images.unsplash.com/photo-1599388859942-e1c8d64cc0de?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "2",
    name: "Foie Gras Terrine",
    description: "Hudson Valley foie gras, fig compote, toasted brioche, port wine reduction.",
    price: "$42",
    category: "Starters",
    image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "3",
    name: "Truffle & Gold Risotto",
    description: "Acquerello rice, 24-month Parmigiano Reggiano, fresh black truffle shavings, 24k edible gold leaf.",
    price: "$85",
    category: "Mains",
    image: "https://images.unsplash.com/photo-1633504581786-316c8002b1b9?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "4",
    name: "Wagyu A5 Striploin",
    description: "Charcoal grilled Miyazaki Wagyu, smoked potato purée, glazed wild mushrooms, bordelaise sauce.",
    price: "$160",
    category: "Mains",
    image: "https://images.unsplash.com/photo-1544025162-8316dfc633a1?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "5",
    name: "Dark Chocolate Sphere",
    description: "Valrhona chocolate, passion fruit curd, almond praline, warm caramel sauce.",
    price: "$45",
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "6",
    name: "Grand Cru Burgundy",
    description: "Domaine de la Romanée-Conti, 2015. A sublime expression of Pinot Noir.",
    price: "$450",
    category: "Wine",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=800",
  },
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

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
          <AnimatePresence mode="popLayout">
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
                {filteredItems.map((dish, index) => (
                  <motion.div
                    key={dish.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                  >
                    <DishCard dish={dish} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-white/60 py-20"
              >
                <p className="text-xl font-light">No dishes found matching your criteria.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
