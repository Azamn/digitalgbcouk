"use client";

import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "./use-toast";

interface ToastProps {
  title: string;
  description?: string;
}

const toastVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export const useAppToasts = () => {
  const { toast } = useToast();

  const SuccessToast = ({ title, description }: ToastProps) => {
    toast({
      description: (
        <motion.div
          variants={toastVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="flex items-start gap-3"
        >
          <CheckCircle className="mt-1 size-6 text-green-400" />
          <div>
            <span className="font-semibold text-base text-green-300">
              {title}
            </span>
            {description && (
              <p className="text-sm text-green-400 mt-1">{description}</p>
            )}
          </div>
        </motion.div>
      ),
      className:
        "bg-green-950 border border-green-800 text-green-300 shadow-lg rounded-lg p-4 backdrop-blur-md",
    });
  };

  const ErrorToast = ({ title, description }: ToastProps) => {
    toast({
      description: (
        <motion.div
          variants={toastVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="flex items-start gap-3"
        >
          <XCircle className="mt-1 size-6 text-red-400" />
          <div>
            <span className="font-semibold text-base text-red-300">
              {title}
            </span>
            {description && (
              <p className="text-sm text-red-400 mt-1">{description}</p>
            )}
          </div>
        </motion.div>
      ),
      className:
        "bg-red-950 border border-red-800 text-red-300 shadow-lg rounded-lg p-4 backdrop-blur-md",
    });
  };

  const WarningToast = ({ title, description }: ToastProps) => {
    toast({
      description: (
        <motion.div
          variants={toastVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="flex items-start gap-3"
        >
          <AlertTriangle className="mt-1 size-6 text-yellow-400" />
          <div>
            <span className="font-semibold text-base text-yellow-300">
              {title}
            </span>
            {description && (
              <p className="text-sm text-yellow-400 mt-1">{description}</p>
            )}
          </div>
        </motion.div>
      ),
      className:
        "bg-yellow-950 border border-yellow-800 text-yellow-300 shadow-lg rounded-lg p-4 backdrop-blur-md",
    });
  };

  return { SuccessToast, ErrorToast, WarningToast };
};
