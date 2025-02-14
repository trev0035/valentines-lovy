import { useState } from 'react';
import Head from 'next/head';
import GenerateButton from "../components/GenerateButton";
import TypewriterInput from "../components/TypewriterInput";
import LoveMap from "../components/LoveMap";
import { motion } from 'framer-motion';

export default function Home() {
  const [memory, setMemory] = useState("");
  const [joke, setJoke] = useState("");
  const [reason, setReason] = useState("");
  const [generatedLetter, setGeneratedLetter] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("/api/generate-letter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ memory, joke, reason })
    });
    const data = await response.json();
    setGeneratedLetter(data.content);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center p-4">
      <Head>
        <title>Valentine's Day AI Website</title>
        <meta name="description" content="A fun interactive Valentine's Day website for my boyfriend" />
      </Head>
      
      <nav className="p-4 bg-red-300 shadow-lg text-white text-lg">
        <ul className="flex justify-center gap-8">
          <li><a href="#love-letter" className="hover:underline">AI Love Letter</a></li>
          <li><a href="#love-map" className="hover:underline">Love Map</a></li>
        </ul>
      </nav>
      
      <motion.section id="love-letter" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="p-8">
        <h1 className="text-3xl font-bold text-red-500">A Love Letter, Just for You ❤️</h1>
        <p className="text-gray-700">Fill in the details, and I’ll write you a love letter that captures our best memories!</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <TypewriterInput label="Your favorite memory together" value={memory} onChange={(e) => setMemory(e.target.value)} />
          <TypewriterInput label="One inside joke" value={joke} onChange={(e) => setJoke(e.target.value)} />
          <TypewriterInput label="A reason you love them" value={reason} onChange={(e) => setReason(e.target.value)} />
          </form>
        {generatedLetter && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="mt-6">
            <h2 className="text-xl font-semibold mb-2 text-pink-600">Your Love Letter:</h2>
            <p className="bg-pink-50 p-4 rounded-md text-gray-800 whitespace-pre-wrap">{generatedLetter}</p>
          </motion.div>
        )}
      </motion.section>
      
      <motion.section id="love-map" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }} className="p-8">
        <h1 className="text-3xl font-bold text-red-500">Our Love, Mapped Out 🗺️❤️</h1>
        <p className="text-gray-700">Click on the heart markers to revisit our favorite memories!</p>
        <LoveMap />
      </motion.section>
    </div>
  );
}


