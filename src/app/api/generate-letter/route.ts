import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!, // Ensure this is set in .env
});

export async function POST(req: Request) {
  try {
    const { memory, joke, reason } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a romantic poet writing a heartfelt love letter." },
        { role: "user", content: `Write a love letter including:
          - Memory: ${memory}
          - Inside joke: ${joke}
          - Reason for love: ${reason}
        ` },
      ],
    });

    return new Response(JSON.stringify({ text: response.choices[0].message.content }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
  }
}


