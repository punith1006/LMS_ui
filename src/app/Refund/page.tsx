import Footer from "@/app/Component/Footer/Footer";
import Header from "@/app/Component/Header/Header";
import React from "react";

const refundData={
    "refundPolicy": [
      {
        "title": "General overview: ",
        "description": "Welcome to Meta Cognitive! We are dedicated to providing high-quality live training programs and certification courses to our learners. This Refund Policy outlines our guidelines for processing refunds and aims to establish clear and transparent procedures for refund requests. Please read this policy carefully before enrolling in any course on our platform."
      },
      {
        "title": "Eligibility for refunds",
        "description": [
          "Course Cancellations by Meta Cognitive: In the unlikely event that Meta Cognitive cancels a live training program or certificate course, learners will be eligible for a full refund of the course fees. We will notify the affected learners about the cancellation and initiate the refund process promptly.",
          "No Refunds After Course Purchase: Once a learner has purchased a course, there will be no refunds granted, except under the circumstance outlined in above section. It is essential for learners to make informed decisions before enrolling in any course.",
          "No Refunds After Starting the Training: If a learner has commenced the live training program or certificate course, no refunds will be provided. This policy applies regardless of the learner's progress within the course."
        ]
      },
      {
        "title": "Refund procedure",
        "description": [
          "Refund Requests: To request a refund for a course cancellation, learners must submit a written request via email to our customer support team at [Support@metacognitive.co.in]. The refund request should include the following details:",
          [
            "Name and contact information of the learner",
            "Course title and enrollment details",
            "Reason for the refund request"
          ],
          "Timeframe for Refund Requests: For course cancellations by Meta Cognitive, learners must submit the refund request within 30 calendar days from the date of notification about the course cancellation. Refund requests submitted after this period will not be considered."
        ]
      },
      {
        "title": "Refund decision and processing",
        "description": [
          "Refund Eligibility Assessment: Upon receiving a refund request for a course cancellation, our team will assess its eligibility based on the provided details and evidence.",
          "Refund Approval: If the refund request meets our eligibility criteria as stated in Eligibility for refunds section , we will approve the refund and initiate the process within 15 business days of approval.",
          "Refund Amount: For eligible refund requests due to course cancellations, the amount refunded will be equal to the original course fees paid by the learner. Any transaction charges, taxes, or additional costs incurred during the payment process will not be included in the refund amount."
        ]
      },
      {
        "title": "Non-Refundable scenarios: ",
        "description": [
          "No Refunds After Starting the Training: As mentioned in Eligibility for refunds section, once a learner has started the live training program or certificate course, no refunds will be granted."
        ]
      },
      {
        "title": "Updates to the refund policy: ",
        "description": [
          "Meta Cognitive reserves the right to modify or update this Refund Policy at any time. Any changes will be effective immediately upon posting on our website. Learners are encouraged to review this policy regularly for any updates."
        ]
      },
      {
        "title": "Contact information:",
        "description": [
          "For any refund-related queries or concerns, please contact our customer support team at [Support@metacognitive.co.in]."
        ]
      }
    ]
  }

interface RefundItem {
  title: string;
  description: string | (string | string[])[]; // Handles nested arrays for Refund Procedure
}

const RefundPolicy: React.FC = () => {
  const refundPolicyData: RefundItem[] = refundData.refundPolicy as RefundItem[];

  return (
    <div className="p-6 bg-black text-white rounded-lg shadow md:p-8">
                      <Header />
                      <h1 className="w-full text-center m-5 font-extrabold text-4xl">Refund Policy</h1>

      {refundPolicyData.map((item, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-xl font-bold mb-2">{item.title}</h2>
          {typeof item.description === "string" ? (
            <p className="text-sm my-3">{item.description}</p>
          ) : (
            // Handle array descriptions
            item.description.map((desc, i) =>
              Array.isArray(desc) ? (
                // Nested lists with bullet points
                <ul key={i} className="list-disc pl-6 text-sm">
                  {desc.map((nestedItem, j) => (
                    <li key={j} className="my-1">
                      {nestedItem}
                    </li>
                  ))}
                </ul>
              ) : (
                // Checkmarks for non-nested items
                <div key={i} className="flex items-start text-sm my-3">
                  <span className="text-white mr-2">✔</span>
                  <span>{desc}</span>
                </div>
              )
            )
          )}
        </div>
      ))}

      <Footer />
    </div>
  );
};

export default RefundPolicy;
