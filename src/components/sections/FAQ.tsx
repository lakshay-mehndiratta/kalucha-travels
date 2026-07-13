"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";

const faqs = [
  {
    question: "How long does visa processing take?",
    answer:
      "Processing times vary by country and visa type, typically ranging from a few days to a few weeks. We'll give you an estimated timeline during your consultation.",
  },
  {
    question: "Which countries do you provide visa assistance for?",
    answer:
      "We assist with visas for major destinations worldwide, including the UAE, Singapore, Canada, the UK, Thailand, Australia and more.",
  },
  {
    question: "Do you offer customized holiday packages?",
    answer:
      "Yes — we tailor holiday packages for couples, families and groups based on your budget, destination preferences and travel dates.",
  },
  {
    question: "Can you book flights and hotels for international travel?",
    answer:
      "Absolutely. We handle domestic and international flight bookings along with hand-picked hotel reservations worldwide.",
  },
  {
    question: "Do you provide travel insurance?",
    answer:
      "Yes, we offer comprehensive travel insurance options so your journey is covered from start to finish.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-cream py-20">
      <Container className="grid grid-cols-[0.9fr_1.4fr] gap-10 items-start">
        <div>
          <Eyebrow>FAQs</Eyebrow>
          <h2 className="text-[34px] leading-tight text-navy">
            Frequently Asked <span className="text-orange">Questions</span>
          </h2>
        </div>

        <div>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.question}
                className="bg-white border border-line rounded-xl mb-3 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex justify-between items-center gap-4 px-[22px] py-[18px] text-[15px] font-semibold text-navy cursor-pointer text-left"
                >
                  {faq.question}
                  <span className="text-orange text-xl font-normal shrink-0">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <p className="px-[22px] pb-[18px] text-[13.5px] text-muted">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}