import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import VisaApplicationForm from "@/components/visa/VisaApplicationForm";

export default function VisaApplicationPage() {
  return (
    <>
      <Header />
      <main className="bg-cream py-14">
        <Container>
          <div className="text-center mb-10">
            <Eyebrow className="justify-center">Visa Application</Eyebrow>
            <h1 className="text-[34px] leading-tight text-navy">
              Apply for Your <span className="text-orange">Visa</span>
            </h1>
            <p className="text-muted text-sm mt-2 max-w-md mx-auto">
              Fill in your details and upload your documents — our team handles the rest.
            </p>
          </div>
          <VisaApplicationForm />
        </Container>
      </main>
      <Footer />
    </>
  );
}