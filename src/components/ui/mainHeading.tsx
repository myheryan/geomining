import { motion } from "framer-motion";
import clsx from "clsx";
import * as React from "react";

type AccentType = React.ComponentPropsWithoutRef<"h2">;

export default function HeadingGradient({ children, className }: AccentType) {
  return (
    <motion.h2
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
        className={clsx(
        className,
        "text-center font-header text-4xl font-semibold text-primary sm:text-5xl lg:text-6xl",
        'bg-clip-text text-transparent bg-linear-to-r from-sky-500 to-blue-800'
      )}
      data-fade="5"
    >
      {children}
    </motion.h2>
  );
}
