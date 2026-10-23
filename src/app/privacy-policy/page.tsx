import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Kalucha Travels",
  description:
    "Learn how Kalucha Travels collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16 sm:py-20">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Privacy Policy
      </h1>

      <p className="mt-4 text-sm text-gray-500">
        Last updated: October 23, 2026
      </p>

      <p className="mt-6 leading-7 text-gray-600">
        Kalucha Travels respects your privacy and is committed to handling
        your personal information responsibly. This Privacy Policy explains
        what information we may collect when you use our website, why we
        collect it, and how we handle it.
      </p>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">
          1. Information We Collect
        </h2>
        <p className="leading-7 text-gray-600">
          Depending on the service you request, we may collect information
          such as:
        </p>
        <ul className="list-disc space-y-2 pl-6 leading-7 text-gray-600">
          <li>Name and contact details, including email address and phone number.</li>
          <li>Travel preferences, destinations, travel dates, and enquiry details.</li>
          <li>Information required to respond to flight and holiday package enquiries.</li>
          <li>
            Information and documents you choose to submit for visa assistance,
            which may include passport or other identity details.
          </li>
          <li>
            Technical information associated with website usage, where collected
            by our hosting provider or website tools.
          </li>
        </ul>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold">
          2. How We Use Your Information
        </h2>
        <p className="leading-7 text-gray-600">
          We may use the information you provide to respond to enquiries,
          prepare travel options, assist with bookings and visa-related
          processes, communicate with you about requested services, maintain
          business records, protect our website, and meet applicable legal
          obligations.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold">
          3. Visa Documents and Sensitive Information
        </h2>
        <p className="leading-7 text-gray-600">
          Documents submitted for visa assistance may contain personal
          identification and travel information. Please provide only
          information necessary for your request and submit documents
          through the designated channels provided by Kalucha Travels.
        </p>
        <p className="leading-7 text-gray-600">
          Access to submitted documents should be restricted to authorized
          personnel who need them to handle your request. We aim to use
          reasonable safeguards to protect this information.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold">
          4. Sharing of Information
        </h2>
        <p className="leading-7 text-gray-600">
          We do not sell your personal information. Where necessary to fulfil
          your request, information may be shared with relevant service
          providers, such as airlines, hotels, travel partners, visa
          processing partners, or government authorities. Information may
          also be disclosed when required by law.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold">
          5. Storage and Security
        </h2>
        <p className="leading-7 text-gray-600">
          We use appropriate measures intended to protect information against
          unauthorized access, loss, misuse, or disclosure. Our website and
          service providers may store information electronically.
          However, no method of storage or transmission over the internet
          can be guaranteed to be completely secure.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold">
          6. Data Retention
        </h2>
        <p className="leading-7 text-gray-600">
          We retain personal information for as long as reasonably necessary
          to respond to enquiries, provide requested services, maintain
          appropriate records, resolve disputes, and comply with applicable
          legal obligations. Retention periods may vary depending on the
          type of information and the purpose for which it was collected.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold">
          7. Cookies and Website Technologies
        </h2>
        <p className="leading-7 text-gray-600">
          Our website or its service providers may use cookies or similar
          technologies for essential functionality, security, or website
          performance. The technologies used depend on the website
          configuration and any third-party tools enabled.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold">
          8. Third-Party Services
        </h2>
        <p className="leading-7 text-gray-600">
          Our website may rely on third-party services for hosting, data
          storage, communications, or travel-related services. Those
          providers may process information as needed to perform their
          services and may have their own privacy policies.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold">
          9. Your Choices and Requests
        </h2>
        <p className="leading-7 text-gray-600">
          You may contact us to ask about your personal information, request
          a correction, or raise a concern about how it is handled. We will
          consider such requests in accordance with applicable law and any
          legitimate record-retention requirements.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold">
          10. Children's Privacy
        </h2>
        <p className="leading-7 text-gray-600">
          Our website is not specifically directed at children. Where
          information about a minor is required for a travel-related
          service, it should be provided by a parent, guardian, or other
          person legally authorized to provide it.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold">
          11. Changes to This Policy
        </h2>
        <p className="leading-7 text-gray-600">
          We may revise this Privacy Policy as our services or data-handling
          practices change. Any updated version will be published on this
          page with a revised date.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold">12. Contact Us</h2>
        <p className="leading-7 text-gray-600">
          For questions or requests relating to this Privacy Policy or your
          personal information, please contact Kalucha Travels using the
          contact details listed on our website.
        </p>
      </section>
    </main>
  );
}