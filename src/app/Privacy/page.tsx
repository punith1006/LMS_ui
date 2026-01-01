import Footer from "@/app/Component/Footer/Footer";
import Header from "@/app/Component/Header/Header";
import React from "react";

const contentData={
    "privacyPolicy": [
      {
        "title": "1. Introduction",
        "description": "Welcome to Meta Cognitive, an online educational platform that offers live training programs with certification. This Privacy Policy explains how we collect, use, store, and disclose your personal information when you access and use our website and services. We value your privacy and are committed to protecting your personal information. By using our website and services, you consent to the practice described in this Privacy Policy."
      },
      {
        "title": "2. Definition",
        "description": [
          "Meta Cognitive, 'we,' 'our,' or 'us' refers to the website and its operators.",
          "You or 'user' refers to any individual accessing or using our website or services."
        ]
      },
      {
        "title":"3. Information collection:",
        "description": ["We collect the following types of information from you:",
        "Personal Information: When you sign up for a live training program or certificate course, we  collect your name, email address, contact number, date of birth, gender, educational qualifications, and other relevant details required for course enrollment and administration.",
        "Payment Information: If you make a purchase on our platform, we  collect your payment details, such as credit/debit card information or other payment methods.", 
        "Communication Information: We  collect information provided during your interactions with our customer support team, such as chat logs or email exchanges.", 
        "Usage Information: We automatically collect information about your interactions with our website, including IP address, device information, browser type, and pages visited. We  also collect information through cookies and similar technologies, as explained in our Cookie Policy."
    ]
      },
      {
        "title":"4. Cookie policy: ",
        "description": "Our website uses cookies and similar tracking technologies to enhance your browsing experience and improve our services. Cookies are small data files stored on your device. By using our website, you consent to our use of cookies as described in our Cookie Policy."
      },
      {
        "title":"5. Purpose of collecting, storing, and using your information and the manner of such usage",
        "description":["We collect, store, and use your information for the following purposes:",
        "Course Enrollment: We use your personal information to enroll you in the live training programs or certificate courses you have selected and to communicate course-related information.",
        "Account Creation: Your personal information is used to create and manage your user account on our platform.",
        "Communication: We  use your contact information to communicate with you regarding course updates, promotions, surveys, and other relevant information.",
        "Payment Processing: We process your payment information to complete transactions for the courses you enroll in.",
        "Improving User Experience: We analyze usage data to understand user preferences, trends, and areas of improvement to enhance the user experience on our website.",
        "Compliance and Legal Obligations: We  use your information to comply with legal requirements, resolve disputes, and enforce our Terms of Service."
    ]
      },
      {
        "title":"6. How we store and process your information:",
        "description":["We implement reasonable security measures to protect your personal information from unauthorized access, alteration, or disclosure. Your data will be stored on secure servers and will only be accessible to authorized personnel.",
        "We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law."
      ]
      },
      {
        "title":"7. Who we share and disclose your information to: ",
        "description":["We share your personal information with third parties in the following situations:",
"Instructors and Course Partners: We  share your information with instructors and course partners to facilitate course delivery and support.",
"Service Providers: We  engage third-party service providers to assist us in operating our business, such as payment processors, data analytics providers, and customer support services.",
"Legal Compliance: We  disclose your information to comply with applicable laws, regulations, or legal processes, or respond to government requests.",
"Business Transfers: In the event of a merger, acquisition, or sale of assets, your information  be transferred to the relevant third party as part of the transaction.",
"We will not sell, rent, or lease your personal information to third parties without your explicit consent."
]
      },
      {
        "title":"8. How we secure your information: ",
        "description":"We employ appropriate technical and organizational security measures to protect your personal information from unauthorized access, misuse, or disclosure. However, please be aware that no data transmission over the internet is entirely secure, and we cannot guarantee the absolute security of your information."
      },
      {
        "title":"9. Your rights: ",
        "description":["You have certain rights regarding your personal information, including:",
        "Access: You can request access to the personal information we hold about you.",
        "Correction: You can request corrections to any inaccuracies in your personal information.",
        "Deletion: You can request the deletion of your personal information under certain circumstances.",
        "Objection: You can object to the processing of your personal information for certain purposes.",
        "To exercise your rights, please contact our Grievance Officer (details provided below)."]
      },
      {
        "title":"10. Links to third-party apps and websites: ",
        "description":"Our website  contain links to third-party apps and websites for your convenience. We do not have control over their content or practices, and their usage is subject to their respective privacy policies. We recommend reviewing the privacy policies of those third-party services before providing any personal information."
      },
      {
        "title":"11. Grievance redressal: ",
        "description": ["If you have any concerns, queries, or grievances regarding your personal information or this Privacy Policy, please contact our Grievance Officer:",
        "Email: Support@metacognitive.co.in",
        "Address: Meta Cognitive technologies Private Limited #714A,Suite #306, Spencer Plaza , Phase II, 7 th floor Anna Salai , Thousand Lights , Chennai 600002",
        "Phone: +91 8310165136"]
      },
      {
        "title":"12. Updates to the privacy policy: ",
        "description":["We update this Privacy Policy from time to time to reflect changes in our practices or for legal and regulatory compliance. We will notify you about significant changes through our website or other communication channels. It is your responsibility to review this Privacy Policy periodically for any updates.",
                        "By using our website and services after any changes to the Privacy Policy, you signify your acceptance of the revised terms."]
      }
    ]
  }

// Allow description to be either a string or a string array
interface PrivacyItem {
  title: string;
  description: string | string[];
}

const PrivacyPolicy: React.FC = () => {
  const privacyPolicyData: PrivacyItem[] = contentData.privacyPolicy || [];

  return (
    <div className="p-6 bg-black text-white rounded-lg shadow md:p-8">
              <Header/>
<h1 className="w-full text-center m-5 font-extrabold text-4xl">Privacy Policy</h1>
      {privacyPolicyData.map((card, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-xl font-bold mb-2">{card.title}</h2>

          {(card.title === "3. Information Collection:" ||
            card.title === "5. Purpose Of Collecting, Storing, And Using Your Information And The Manner Of Such Usage" ||
            card.title === "6. How We Store And Process Your Information:" ||
            card.title === "7. Who We Share And Disclose Your Information To: " ||
            card.title === "9. Your Rights: " ||
            card.title === "11. Grievance Officer: ") &&
          Array.isArray(card.description) ? (
            <>
        
              <p className="text-white text-sm mb-3">{card.description[0]}</p>

              {card.title === "6. How We Store And Process Your Information:" && (
                <p className="text-white text-sm font-semibold mb-3">
                  {card.description[1]}
                </p>
              )}

              {/* Remaining items as a list */}
              {card.description
                .slice(
                  card.title === "6. How We Store And Process Your Information:" ? 2 : 1,
                  card.title === "7. Who We Share And Disclose Your Information To: " ? -1 : undefined
                )
                .map((desc, i) => (
                  <div key={i} className="flex items-start text-sm my-3">
                    <span className="text-white mr-2">✔</span>
                    <span>{desc}</span>
                  </div>
                ))}

              {card.title === "7. Who We Share And Disclose Your Information To: " && (
                <p className="text-white text-sm mt-3">
                  {card.description[card.description.length - 1]}
                </p>
              )}
            </>
          ) : (
            // Default rendering for other sections
            <div>
              {Array.isArray(card.description) ? (
                <div>
                  {card.description.map((desc, i) => (
                    <div key={i} className="flex items-start text-sm my-3">
                      <span className="text-white mr-2">✔</span>
                      <span>{desc}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white text-sm">{card.description}</p>
              )}
            </div>
          )}
        </div>
      ))}
      <Footer/>
    </div>
  );
};

export default PrivacyPolicy;
