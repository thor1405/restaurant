"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import DishCard, { Dish } from "@/components/ui/DishCard";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function SignatureDishes() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/menu")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const mappedItems = data.data.map((item: any) => ({
            ...item,
            id: item._id,
          }));
          // Just take the first 4 as signature dishes
          setDishes(mappedItems.slice(0, 4));
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-24 bg-(--color-secondary)">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="Signature Creations" 
          subtitle="A Symphony of Flavors" 
        />
        
        {loading ? (
          <div className="text-center py-10 text-black/50">Loading signature dishes...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16 mt-16">
            {dishes.map((dish, index) => (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <DishCard dish={dish} />
              </motion.div>
            ))}
          </div>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <Link href="/menu">
            <Button variant="outline">View Full Menu</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
