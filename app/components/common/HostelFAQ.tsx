"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string | string[];
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-purple-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold text-gray-800">{question}</h3>
        {isOpen ? (
          <ChevronUp className="text-purple-600" />
        ) : (
          <ChevronDown className="text-purple-600" />
        )}
      </button>
      {isOpen && (
        <div className="mt-2 text-gray-700 animate-fadeIn">
          {Array.isArray(answer) ? (
            <ul className="list-disc pl-5">
              {answer.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>{answer}</p>
          )}
        </div>
      )}
    </div>
  );
};

const HostelFAQ: React.FC = () => {
  const faqs = [
    {
      question: "What types of rooms do you offer?",
      answer: [
        "Mixed dormitory rooms (4-8 beds)",
        "Female-only dormitory rooms (4-6 beds)",
        "Private rooms (single, double, and triple occupancy)",
        "Family rooms (4-6 person capacity)",
      ],
    },
    {
      question: "What amenities are included in the price?",
      answer: [
        "Free Wi-Fi",
        "Bed linens and towels",
        "Lockers (bring your own lock)",
        "Access to shared kitchen facilities",
        "Common areas (lounge, TV room)",
        "24/7 reception",
      ],
    },
    {
      question: "Do you have a minimum or maximum stay requirement?",
      answer:
        "We generally have a minimum stay of one night and a maximum stay of 14 nights. For longer stays, please contact us directly for special arrangements.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "We offer free cancellation up to 48 hours before check-in. Cancellations made within 48 hours of check-in will be charged the first night's stay.",
    },
    {
      question: "Is breakfast included?",
      answer:
        "Breakfast is not included in the standard room rate. However, we offer a budget-friendly breakfast option for an additional fee.",
    },
    {
      question: "What is the check-in and check-out time?",
      answer:
        "Check-in time is from 2:00 PM, and check-out time is by 11:00 AM. Early check-in or late check-out may be available upon request, subject to availability.",
    },
    {
      question: "Do you have age restrictions?",
      answer:
        "Guests must be at least 18 years old to stay in dormitory rooms. There is no age restriction for private and family rooms when accompanied by an adult.",
    },
    {
      question: "Is the hostel located near public transportation?",
      answer:
        "Yes, our hostel is conveniently located near public transportation. The nearest bus stop is a 2-minute walk, and the metro station is a 10-minute walk away.",
    },
    {
      question: "Do you offer parking facilities?",
      answer:
        "We have limited on-site parking available for an additional fee. Please reserve in advance as spaces are subject to availability.",
    },
    {
      question: "Are pets allowed?",
      answer:
        "We do not allow pets in our hostel, with the exception of service animals.",
    },
    {
      question: "How do I get hostel for rent in pune?",
      answer:
        "An entire flat on rent or hostel for rent in pune can get a little expensive. Hence, if you are a bachelor, nomad, student, working professional who has just moved to pune, the best way is to get a shared home on rent so you can share the expenses with other like-minded individuals. GetSetHome.com is the best place to get started for your search on shared hostel for rent in pune.",
    },
    {
      question: "How much is the rent per month for hostel in pune?",
      answer:
        "The rent of an unfurnished hostel in pune can be upwards of Rs.8,000/month, depending upon the area. However, a fully furnished hostel on sharing/co-living basis with all inclusive bills can be found on GetSetHome.com from Rs.8,000/month inclusive of free Wi-Fi, free DTH, daily housekeeping, etc. More so, no brokerage applicable if you rent a shared hostel in pune from GetSetHome.com",
    },
    {
      question: "Does pune have good hostel options for working professionals?",
      answer:
        "Many pune societies have issues to rent homes to bachelors. Hence, as a single working professional, you can rent from GetSetHome.com. GetSetHome is a premium rental accommodation provider that provides fully furnished homes in gated societies along with free daily housekeeping, free Wi-Fi, DTH, gas & home maintenance support.",
    },
    {
      question: "Are there any hostel with Wi-Fi facility available in pune?",
      answer:
        "Yes; if you want hostel with a free Wi-Fi facility in a good and secure neighbourhood, you should go for GetSetHome - India's Best Co-living Accommodations. No brokerage, fully furnished hostel, minimal deposit, free Wi-Fi, DTH, gas and daily housekeeping are some of the many benefits of renting from GetSetHome.",
    },
    {
      question: "Are there any hostel options available for students in pune?",
      answer:
        "Students should definitely go for a shared hostel rather than a hostel. A hostel is overly crowded, poorly managed, prone to thefts and has increased exposure to many people from all corners which increase health risks in this COVID situation. Whereas, a professionally managed co-living hostel like the ones by GetSetHome, makes sure that you are in a safe hostel with minimal people, private space, clean homes, functional kitchen and in a gated society which has 24/7 security.",
    },
  ];

  return (
    <div className="bg-purple-50 p-8 rounded-lg shadow-lg max-w-6xl mx-auto w-full">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">
        FAQs - About Hostel Accommodation
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

export default HostelFAQ;
