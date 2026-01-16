import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactHeroSection } from "@/components/contact-hero-section"
import { MentorsMessagesSection } from "@/components/mentors-messages-section"
import { ContactInfoSection } from "@/components/contact-info-section"
import { ContactFormSection } from "@/components/contact-form-section"
import { MapSection } from "@/components/map-section"

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ContactHeroSection />
      <MentorsMessagesSection />
      <ContactInfoSection />
      <ContactFormSection />
      <MapSection />
      <Footer />
    </main>
  )
}
