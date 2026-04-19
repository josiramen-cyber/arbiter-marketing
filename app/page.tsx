"use client";

import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Solution from "@/components/sections/Solution";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import Trust from "@/components/sections/Trust";
import FinalCTA from "@/components/sections/FinalCTA";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <FadeIn><Hero /></FadeIn>
        <FadeIn delay={0.08}><Problem /></FadeIn>
        <FadeIn delay={0.08}><Solution /></FadeIn>
        <FadeIn delay={0.08}><Features /></FadeIn>
        <FadeIn delay={0.08}><HowItWorks /></FadeIn>
        <FadeIn delay={0.08}><Trust /></FadeIn>
        <FadeIn delay={0.08}><FinalCTA /></FadeIn>
      </main>
      <Footer />
    </>
  );
}
