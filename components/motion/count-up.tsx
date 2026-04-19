"use client";

import { motion } from "framer-motion";

type CountUpProps = {
  value: number;
  suffix?: string;
};

export function CountUp({ value, suffix = "" }: CountUpProps) {
  return (
    <motion.span
      initial={{ opacity: 0.55, y: 10, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      aria-label={`${value}${suffix}`}
    >
      {value.toLocaleString()}
      {suffix}
    </motion.span>
  );
}
