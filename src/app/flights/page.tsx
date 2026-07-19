import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import FlightBookingForm from "@/components/flights/FlightBookingForm";

export default function FlightsPage() {
  return (
    <>
      <Header />
      <main className="bg-cream py-14">
        <Container>
          <div className="text-center mb-10">
            <Eyebrow className="justify-center">Flight Booking</Eyebrow>
            <h1 className="text-[34px] leading-tight text-navy">
              Book Your Next <span className="text-orange">Flight</span>
            </h1>
            <p className="text-muted text-sm mt-2 max-w-md mx-auto">
              Tell us where you're headed — our team will find you the best fares.
            </p>
          </div>
          <FlightBookingForm />
        </Container>
      </main>
      <Footer />
    </>
  );
}