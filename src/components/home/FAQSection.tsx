import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    category: "Women Wellness Program",
    questions: [
      {
        question: "Is this program suitable for beginners?",
        answer:
          "Yes! All sessions are guided with step-by-step therapeutic instructions. Our instructors ensure proper form and modifications are provided for all fitness levels.",
      },
      {
        question: "Do I need equipment?",
        answer:
          "Just a yoga mat. Dumbbells (starting at 2 kg) are recommended for strength sessions. We progress gradually with planned overloading for safe and sustainable development.",
      },
      {
        question: "Will this help with hormonal or lifestyle issues?",
        answer:
          "Yes. Practices are curated for spine health, reproductive wellness, stress management, diabetes management & more. Each session follows the Integrated Approach of Yoga Therapy (IAYT).",
      },
    ],
  },
  {
    category: "90-Day Diet Program",
    questions: [
      {
        question: "Will I have to give up carbs or fats?",
        answer:
          "No. The program uses the Cognitive Plating Method — a balanced approach with all macronutrients. No extreme restrictions, just mindful, enjoyable eating habits.",
      },
      {
        question: "How personalized is the plan?",
        answer:
          "Completely. Your diet is designed based on your body metrics, metabolic profile, medical history, physical activity level, and energy expenditure.",
      },
      {
        question: "What happens after 90 days?",
        answer:
          "You receive 21 days of maintenance support to help your body transition smoothly into a balanced, non-restrictive diet while monitoring real-time responses.",
      },
    ],
  },
  {
    category: "Kids Yoga",
    questions: [
      {
        question: "At what age can kids join?",
        answer:
          "Ages 7–14. The program is designed to help children understand their bodies, emotions and physical abilities in an engaging, educational and enjoyable way.",
      },
      {
        question: "Will kids learn theory too?",
        answer:
          "Yes. They learn anatomy, joints, muscle functions & yogic mantras. This method builds curiosity, intelligence and awareness—helping children become mindful movers.",
      },
      {
        question: "How do you keep kids motivated?",
        answer:
          "Through Practice Merit Points & the Balayogi of the Month award. Children earn points for dedication and one practitioner is recognized each month.",
      },
    ],
  },
  {
    category: "LSP + Juice Fasting",
    questions: [
      {
        question: "Is everyone eligible for this program?",
        answer:
          "No. Eligibility is based on medical conditions for safety. Participants are selected after reviewing medical conditions, current medications, and personal health history.",
      },
      {
        question: "Is this for weight loss?",
        answer:
          "Weight loss may occur, but the main goal is gut reset & digestive rest. The primary focus is deep digestive rest, gut reset and metabolic cleansing.",
      },
      {
        question: "Will I be guided throughout the process?",
        answer:
          "Yes. You receive step-by-step supervision and daily monitoring. This includes fatigue & symptom tracking and a dedicated support group.",
      },
    ],
  },
];

const FAQSection = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <HelpCircle size={16} />
            FAQs
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our programs. Can't find what
            you're looking for? Contact us directly.
          </p>
        </div>

        {/* FAQ Accordions */}
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8">
            {faqs.map((category) => (
              <div key={category.category}>
                <h3 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {category.category}
                </h3>
                <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`${category.category}-${index}`}
                        className="border-border"
                      >
                        <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-secondary/50 text-left font-display font-medium text-foreground">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4 text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
