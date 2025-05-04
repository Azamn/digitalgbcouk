"use client";

import React from "react";
import { HashLoader } from "react-spinners";
import { motion } from "framer-motion";

const coloredLetters = [
  { letter: "D", color: "#FF6B6B" }, // red
  { letter: "I", color: "#F7B801" }, // yellow
  { letter: "G", color: "#6BCB77" }, // green
  { letter: "I", color: "#4D96FF" }, // blue
  { letter: "T", color: "#9D4EDD" }, // purple
  { letter: "A", color: "#FF6B6B" }, // red
  { letter: "L", color: "#F7B801" }, // yellow
  { letter: "G", color: "#6BCB77" }, // green
  { letter: "B", color: "#4D96FF" }, // blue
];

const DataLoader = () => {
  return (
    <motion.div
      className="flex min-h-screen w-full flex-col items-center justify-center bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="flex items-center gap-x-8">
        <HashLoader size={40} color="#9D4EDD" />
        <motion.div
          className="flex gap-1 text-4xl font-extrabold tracking-wider"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          {coloredLetters.map(({ letter, color }, index) => (
            <span key={index} style={{ color }}>
              {letter}
            </span>
          ))}
          <span className="text-white">...</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DataLoader;
