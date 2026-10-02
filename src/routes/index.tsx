import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Hero } from "@/components/gift/Hero";
import { Packages } from "@/components/gift/Packages";
import { Gallery } from "@/components/gift/Gallery";
import { EnquiryForm } from "@/components/gift/EnquiryForm";
import { Footer } from "@/components/gift/Footer";
import { Retail } from "@/components/gift/Retail";

const title = "Gifting an Experience | De LUSH Resort, Bavdhan Pune";
const description =
  "Gift a night away at De LUSH Resort, Bavdhan, Pune. Curated stay, dining and spa gift packages from ₹3,999 for birthdays, anniversaries and festivals.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    window.history.scrollRestoration = "manual";

    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }

    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="overflow-x-hidden">
      <Hero />
      <Packages />
      <Retail />
      <Gallery />
      <EnquiryForm />
      <Footer />
      <Toaster position="top-center" richColors />
    </main>
  );
}