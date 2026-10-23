import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Kalucha Travels",
  description:
    "Read the terms and conditions for using Kalucha Travels' website and travel services.",
};

export default function TermsAndConditionsPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16 sm:py-20">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Terms & Conditions
      </h1>

      <p className="mt-4 text-sm text-gray-500">
        Last updated: October 23, 2026
      </p>

      <p className="mt-6 leading-7 text-gray-600">
        Welcome to Kalucha Travels. These Terms and Conditions govern your
        use of our website and the travel-related services we offer. By
        accessing our website or submitting an enquiry, you agree to these
        terms.
      </p>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">1. Our Services</h2>
        <p className="leading-7 text-gray-600">
          Kalucha Travels provides travel-related assistance, including
          holiday packages, flight booking assistance, visa application
          assistance, and related services. The availability and scope of
          services depend on the specific request and confirmation provided
          by our team.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold">2. Enquiries and Bookings</h2>
        <p className="leading-7 text-gray-600">
          Submitting an enquiry through our website does not, by itself,
          constitute a confirmed booking. A booking is considered confirmed
          only after the applicable details, availability, charges, and
          confirmation process have been communicated to you.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold">3. Pricing and Payments</h2>
        <p className="leading-7 text-gray-600">
          Prices, package details, flight fares, and service charges may vary
          depending on availability, travel dates, supplier policies, and
          other applicable factors. Any applicable charges and payment
          conditions should be confirmed with Kalucha Travels before a
          booking is finalized.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold">4. Visa Assistance</h2>
        <p className="leading-7 text-gray-600">
          Kalucha Travels may assist customers with visa application
          preparation and related processes. Visa decisions are made by the
          relevant embassy, consulate, or immigration authority. We cannot
          guarantee visa approval, processing times, or entry into any
          country.
        </p>
        <p className="leading-7 text-gray-600">
          Customers are responsible for providing accurate information and
          valid documents and for meeting the requirements of the relevant
          authorities.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold">
          5. Changes, Cancellations, and Refunds
        </h2>
        <p className="leading-7 text-gray-600">
          Changes, cancellations, and refunds depend on the terms applicable
          to the relevant booking, airline, hotel, tour operator, visa
          service, or other supplier. Any cancellation charges, refund
          eligibility, and applicable deadlines should be confirmed before
          making a booking.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold">6. Customer Responsibilities</h2>
        <p className="leading-7 text-gray-600">
          You agree to provide accurate and complete information when
          submitting enquiries or requesting services. You are responsible
          for checking travel documents, passport validity, visa
          requirements, and other applicable entry requirements for your
          journey.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold">
          7. Third-Party Services
        </h2>
        <p className="leading-7 text-gray-600">
          Some travel services may be provided by third parties, such as
          airlines, hotels, tour operators, and government authorities.
          Their own terms, availability, and policies may apply to those
          services.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold">8. Website Use</h2>
        <p className="leading-7 text-gray-600">
          You agree not to misuse our website, attempt unauthorized access,
          interfere with its operation, or submit false, misleading, or
          unlawful information through our forms.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold">9. Limitation of Liability</h2>
        <p className="leading-7 text-gray-600">
          To the extent permitted by applicable law, Kalucha Travels is not
          responsible for decisions made by visa authorities, changes
          imposed by third-party suppliers, or disruptions outside our
          reasonable control. Nothing in these terms excludes liability
          that cannot lawfully be excluded.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold">10. Updates to These Terms</h2>
        <p className="leading-7 text-gray-600">
          We may update these Terms and Conditions when our services or
          business practices change. The revised version will be published
          on this page with an updated revision date.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold">11. Contact Us</h2>
        <p className="leading-7 text-gray-600">
          If you have questions about these Terms and Conditions, please
          contact Kalucha Travels using the contact information provided
          on our website.
        </p>
      </section>
    </main>
  );
}
