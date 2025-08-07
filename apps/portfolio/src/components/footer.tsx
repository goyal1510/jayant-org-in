"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <p className="text-muted-foreground">
              © 2025 Jayant. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground mt-1 text-center">
              Made with <Heart className="inline h-4 w-4 text-red-500" />
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
} 