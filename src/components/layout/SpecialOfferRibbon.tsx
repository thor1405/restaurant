"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SpecialOfferRibbon() {
  const [active, setActive] = useState(false);
  const [text, setText] = useState("");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data.specialOfferActive) {
          setActive(true);
          setText(data.data.specialOfferText);
        }
      })
      .catch(console.error);
  }, []);

  if (!active || !visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        className="w-full bg-(--color-accent) text-black py-2 px-6 flex justify-center items-center relative z-[60]"
      >
        <p className="text-sm font-medium tracking-wide text-center mr-8">
          {text}
        </p>
        <button 
          onClick={() => setVisible(false)}
          className="absolute right-4 text-black/60 hover:text-black"
          aria-label="Close offer"
        >
          &times;
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
