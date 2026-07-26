"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import DishCard, { Dish } from "@/components/ui/DishCard";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const SIGNATURE_DISHES: Dish[] = [
  {
    id: "1",
    name: "Truffle & Gold Risotto",
    description: "Acquerello rice, 24-month Parmigiano Reggiano, fresh black truffle shavings, 24k edible gold leaf.",
    price: "$85",
    image: "https://images.unsplash.com/photo-1633504581786-316c8002b1b9?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "2",
    name: "Wagyu A5 Striploin",
    description: "Charcoal grilled Miyazaki Wagyu, smoked potato purée, glazed wild mushrooms, bordelaise sauce.",
    price: "$160",
    image: "https://images.unsplash.com/photo-1544025162-8316dfc633a1?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "3",
    name: "Lobster Medallions",
    description: "Butter-poached Maine lobster, saffron velouté, caviar, delicate sea herbs.",
    price: "$110",
    image: "https://images.unsplash.com/photo-1533682805518-48d1f5a8cb39?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "4",
    name: "Dark Chocolate Sphere",
    description: "Valrhona chocolate, passion fruit curd, almond praline, warm caramel sauce.",
    price: "$45",
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&q=80&w=800",
  }
];

export default function SignatureDishes() {
  return (
    <section className="py-24 bg-[#111111]">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="Signature Creations" 
          subtitle="A Symphony of Flavors" 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mt-16 max-w-6xl mx-auto">
          {SIGNATURE_DISHES.map((dish, index) => (
            <DishCard key={dish.id} dish={dish} index={index} />
          ))}
        </div>

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
