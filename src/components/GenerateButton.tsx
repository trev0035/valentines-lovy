import { useState } from "react";

export default function GenerateButton() {
  const [loading, setLoading] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    const response = await fetch("/api/generate-letter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        memory: "That time we got lost and laughed the entire way.",
        joke: "You and your obsession with pineapple pizza!",
        reason: "Your kindness and the way you always make me smile.",
      }),
    });

    const data = await response.json();
    setGeneratedLetter(data.text);
    setLoading(false);
  };

  return (
    <div className="text-center mt-4">
      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Love Letter 💌"}
      </button>
      {generatedLetter && (
        <div className="mt-4 p-4 bg-white shadow-md rounded">
          <h2 className="text-lg font-bold">Your Love Letter:</h2>
          <p className="mt-2">{generatedLetter}</p>
        </div>
      )}
    </div>
  );
}


