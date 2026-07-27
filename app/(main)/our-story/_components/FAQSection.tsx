"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
interface FAQItem {
  question: string;
  answer: string;
}
const faqItems: FAQItem[] = [
  {
    question: "How Is Your Lead Generation Approach Different?",
    answer:
      "Eternitive Herbals uses a combination of ancient Ayurvedic wisdom and modern scientific research to ensure the highest quality herbal formulations. Our products undergo rigorous quality checks at every stage.",
  },
  {
    question: "What Standards Do Your Manufacturing Facilities Meet?",
    answer:
      "We work with certified manufacturing facilities that comply with WHO GMP, HACCP, and ISO 9001:2015 standards, ensuring safety and efficacy in every product.",
  },
  {
    question: "What Makes Your Herbal Formulas Unique?",
    answer:
      "Our herbal formulas are sourced from authentic Ayurvedic texts and adapted using contemporary scientific methods, giving you the best of both worlds.",
  },
  {
    question: "Do You Offer a Satisfaction Guarantee?",
    answer:
      "Customer satisfaction is our top priority. We offer a 100% satisfaction guarantee on all our products, backed by comprehensive return and refund policies.",
  },
  {
    question: "Do You Provide Wellness Consultations?",
    answer:
      "We provide end-to-end consultation support, from product selection to ongoing wellness guidance, through our team of Vaidyas and health professionals.",
  },
];
export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section className="bg-white px-[calc(100dvw/24)] py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-comfortaa mb-10 text-center text-3xl font-bold text-primary-background">
          More About Us
        </h2>
        <div className="flex flex-col">
          {faqItems.map((item, i) => (
            <div key={i} className="border-b border-stone-200 py-5">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full cursor-pointer items-center justify-between text-left"
              >
                <span className="text-sm font-medium text-primary-background">
                  {item.question}
                </span>
                <ChevronDown
                  size={16}
                  className={`shrink-0 text-stone-400 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <p className="mt-3 text-sm leading-relaxed text-stone-500">
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
