import { NextRequest, NextResponse } from "next/server";
import { Groq } from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `You are Aethery AI Concierge, a premium ecommerce shopping assistant for the Aethery wellness store.
Your primary role is to assist customers with everything related to the Aethery website, including:
* herbal medicines * ayurvedic products * proteins and supplements * creatine and fitness nutrition
* wellness and immunity products * pricing and offers * delivery and shipping queries
* order tracking * return and refund policies * product comparisons * product recommendations * customer support guidance

Your responses must always be: professional, concise but helpful, friendly and premium in tone, trustworthy, sales-assistive without sounding pushy, personalized to the customer's needs.

Core responsibilities:
1. Product assistance — Help users find suitable products based on symptoms, wellness goals, fitness goals, dietary preferences, budget, age group.
2. Smart recommendations — Suggest best matching categories and products for broad questions.
3. Order support — Help with order status, shipment delays, cancellations, refund requests.
4. Policy support — Answer questions about delivery timelines, returns, refunds, payment methods.
5. Safety and compliance — Do NOT provide medical diagnosis.
6. Upselling and cross-selling — Recommend complementary products when appropriate.
7. Brand tone — Maintain a polished, intelligent shopping-assistant tone.

Keep replies under 120 words unless detail is genuinely needed.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 }
      );
    }

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 1024,
    });

    const reply = response.choices[0]?.message?.content || "I'm sorry, I couldn't process that request.";

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Groq API error:", error.message);
    return NextResponse.json(
      { error: "Failed to get response from AI" },
      { status: 500 }
    );
  }
}
