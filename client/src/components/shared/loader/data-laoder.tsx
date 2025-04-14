"use client";

import React from "react";
import { HashLoader } from "react-spinners";
import { motion } from "framer-motion";

const DataLoader = () => {
  return (
    <motion.div
      className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-pink-300 via-purple-300 to-blue-400 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="mb-6 text-4xl font-extrabold tracking-wider"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        DIGITALGB...
      </motion.div>
      <HashLoader size={80} color="#ffffff" />
    </motion.div>
  );
};

export default DataLoader;
