"use client";

import type React from "react";
import {
  ChevronRight,
  Map,
  Clock,
  MessageSquareText,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import EVChargingIllustration from "@/components/ev-charging-illustration";
import AppInterface3D from "@/components/app-interface-3d";
import NewsletterForm from "@/components/newsletter-form";
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Home() {
  // References to sections for scrolling
  const problemsRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const missionRef = useRef<HTMLElement>(null);
  const newsletterRef = useRef<HTMLElement>(null);

  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionRef: React.RefObject<HTMLElement | null>) => {
    if (sectionRef?.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle hash changes for direct links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#problems" && problemsRef.current) {
        problemsRef.current.scrollIntoView({ behavior: "smooth" });
      } else if (hash === "#features" && featuresRef.current) {
        featuresRef.current.scrollIntoView({ behavior: "smooth" });
      } else if (hash === "#mission" && missionRef.current) {
        missionRef.current.scrollIntoView({ behavior: "smooth" });
      } else if (hash === "#newsletter" && newsletterRef.current) {
        newsletterRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };

    // Handle initial hash if present
    if (window.location.hash) {
      // Use setTimeout to ensure the DOM is fully loaded
      setTimeout(handleHashChange, 0);
    }

    // Add event listener for hash changes
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFBFC]">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-[#D9E2E9] bg-[#FFFBFC]/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/favicon.png"
              width={50}
              height={50}
              alt="MobiShare Logo"
            />
            <span className="text-xl font-bold text-[#0C1D32]">MobiShare</span>
          </div>
          <nav className="hidden md:flex items-center  gap-6">
            <button
              onClick={() => scrollToSection(problemsRef)}
              className="text-[#0C1D32] hover:text-[#007AAD] transition-colors"
            >
              Problémák
            </button>
            <button
              onClick={() => scrollToSection(featuresRef)}
              className="text-[#0C1D32] hover:text-[#007AAD] transition-colors"
            >
              Funkciók
            </button>
            <button
              onClick={() => scrollToSection(missionRef)}
              className="text-[#0C1D32] hover:text-[#007AAD] transition-colors"
            >
              Küldetés
            </button>
            <button
              onClick={() => scrollToSection(newsletterRef)}
              className="text-[#0C1D32] hover:text-[#007AAD] transition-colors"
            >
              Hírlevél
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="container relative z-10">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-[#0C1D32] leading-tight">
                Az All-in-One <span className="text-[#007AAD]">EV Töltő</span>{" "}
                Megoldás Magyarországon
              </h1>
              <p className="text-lg text-[#0C1D32]/80 max-w-md">
                Érje el azzzzzz összes töltőállomást Magyarországon egyetlen
                alkalmazással. Valós idejű adatok, megbízható információk és
                MI-alapú asszisztencia.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-[#007AAD] hover:bg-[#007AAD]/90"
                  onClick={() => scrollToSection(newsletterRef)}
                >
                  Feliratkozás
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[#007AAD]/20 to-[#0C1D32]/40 z-10 rounded-lg"></div>
              <div className="w-full h-full">
                <EVChargingIllustration />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/3 h-1/2 bg-[#D9E2E9]/50 rounded-l-full blur-3xl"></div>
      </section>

      {/* Problems Section */}
      <section ref={problemsRef} id="problems" className="py-20 bg-[#0C1D32]">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#FFFBFC] mb-4">
              Válasz az e-mobilitási problémáira:
            </h2>
            <p className="text-[#D9E2E9] max-w-2xl mx-auto">
              A jelenlegi elektromos jármű töltési infrastruktúra Magyarországon
              számos kihívást jelent az elektromos járművek tulajdonosai
              számára.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-[#0C1D32] border border-[#007AAD]/30 shadow-lg">
              <CardContent className="pt-6">
                <div className="bg-[#007AAD]/10 p-3 rounded-full w-fit mb-4">
                  <Map className="h-6 w-6 text-[#007AAD]" />
                </div>
                <h3 className="text-xl font-bold text-[#FFFBFC] mb-2">
                  Széttagolt Infrastruktúra
                </h3>
                <p className="text-[#D9E2E9]">
                  A felhasználóknak jelenleg 5-6 különböző alkalmazásra van
                  szükségük, hogy hozzáférjenek az összes töltőállomáshoz
                  Magyarországon, ami frusztráló élményt teremt.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#0C1D32] border border-[#007AAD]/30 shadow-lg">
              <CardContent className="pt-6">
                <div className="bg-[#007AAD]/10 p-3 rounded-full w-fit mb-4">
                  <MessageSquareText className="h-6 w-6 text-[#007AAD]" />
                </div>
                <h3 className="text-xl font-bold text-[#FFFBFC] mb-2">
                  Félretájékoztatás
                </h3>
                <p className="text-[#D9E2E9]">
                  A töltőállomások képességeiről szóló megbízhatatlan
                  információk időpazarláshoz és frusztrációhoz vezetnek az
                  elektromos járművek tulajdonosai számára.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#0C1D32] border border-[#007AAD]/30 shadow-lg">
              <CardContent className="pt-6">
                <div className="bg-[#007AAD]/10 p-3 rounded-full w-fit mb-4">
                  <Clock className="h-6 w-6 text-[#007AAD]" />
                </div>
                <h3 className="text-xl font-bold text-[#FFFBFC] mb-2">
                  Valós Idejű Adatok Hiánya
                </h3>
                <p className="text-[#D9E2E9]">
                  A jelenlegi alkalmazások nem nyújtanak pontos, valós idejű
                  információkat a töltőállomások elérhetőségéről és működéséről.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} id="features" className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C1D32] mb-4">
              A Mi Megoldásunk
            </h2>
            <p className="text-[#0C1D32]/70 max-w-2xl mx-auto">
              A MobiShare egyesíti az összes töltőállomást Magyarországon
              megbízható információkkal és MI-alapú funkciókkal.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="bg-[#007AAD]/10 p-3 rounded-full h-fit">
                    <Map className="h-6 w-6 text-[#007AAD]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0C1D32] mb-2">
                      All-in-One Platform
                    </h3>
                    <p className="text-[#0C1D32]/70">
                      Érje el az összes töltőállomást Magyarországon egyetlen
                      intuitív alkalmazáson keresztül.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-[#007AAD]/10 p-3 rounded-full h-fit">
                    <MessageSquareText className="h-6 w-6 text-[#007AAD]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0C1D32] mb-2">
                      MI Asszisztens "Mobi"
                    </h3>
                    <p className="text-[#0C1D32]/70">
                      Kapjon szakértői útmutatást MI asszisztensünktől, amely a
                      magyarországi elektromos jármű infrastruktúrára és iparági
                      ismeretekre van kiképezve.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-[#007AAD]/10 p-3 rounded-full h-fit">
                    <Clock className="h-6 w-6 text-[#007AAD]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0C1D32] mb-2">
                      Valós Idejű Közösségi Frissítések
                    </h3>
                    <p className="text-[#0C1D32]/70">
                      Profitáljon a felhasználók által közölt valós idejű
                      frissítésekből a töltőállomások állapotáról és
                      elérhetőségéről.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-[#007AAD]/10 p-3 rounded-full h-fit">
                    <BarChart3 className="h-6 w-6 text-[#007AAD]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0C1D32] mb-2">
                      Intelligens Útvonaltervezés
                    </h3>
                    <p className="text-[#0C1D32]/70">
                      MI-alapú útvonaltervezés, amely a költségek és a
                      hatékonyság szempontjából optimalizált az Ön vezetési
                      szokásai alapján.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2 relative h-[500px] rounded-lg overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[#007AAD]/20 to-[#0C1D32]/40 z-10 rounded-lg"></div>
              <div className="w-full h-full">
                <AppInterface3D />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EV Buyer's Guide Section */}
      <section
        id="ev-buyers-guide"
        className="py-20 bg-gradient-to-r from-[#007AAD]/10 to-[#0C1D32]/10"
      >
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C1D32] mb-4">
              Az Elektromos Jármű Vásárlás{" "}
              <span className="text-[#007AAD]">Új Kapuja</span>
            </h2>
            <p className="text-[#0C1D32]/70 max-w-2xl mx-auto">
              Tervezed elektromos járműre váltani? A MobiShare az első lépés a
              sikeres EV vásárláshoz Magyarországon.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md border border-[#D9E2E9]">
                <h3 className="text-xl font-bold text-[#0C1D32] mb-3 flex items-center">
                  <span className="bg-[#007AAD] text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">
                    1
                  </span>
                  Intelligens EV Ajánlások
                </h3>
                <p className="text-[#0C1D32]/70">
                  Az alkalmazásunk elemzi az utazási szokásaidat és személyre
                  szabott EV ajánlásokat kínál, amelyek megfelelnek a valós
                  igényeidnek és életmódodnak.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-[#D9E2E9]">
                <h3 className="text-xl font-bold text-[#0C1D32] mb-3 flex items-center">
                  <span className="bg-[#007AAD] text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">
                    2
                  </span>
                  Töltési Infrastruktúra Előrejelzés
                </h3>
                <p className="text-[#0C1D32]/70">
                  Láthatod, hogy a lakóhelyed vagy munkahelyed környékén milyen
                  töltési lehetőségek vannak, így könnyebben dönthetsz az
                  elektromos járműre váltás mellett.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-[#D9E2E9]">
                <h3 className="text-xl font-bold text-[#0C1D32] mb-3 flex items-center">
                  <span className="bg-[#007AAD] text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">
                    3
                  </span>
                  Költségkalkulátor
                </h3>
                <p className="text-[#0C1D32]/70">
                  Összehasonlíthatod a jelenlegi üzemanyagköltségeidet a
                  potenciális elektromos töltési költségekkel, és láthatod a
                  hosszú távú megtakarítási lehetőségeket.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#007AAD]/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#0C1D32]/20 rounded-full blur-2xl"></div>

              <div className="bg-white p-8 rounded-xl shadow-lg border border-[#D9E2E9] relative z-10">
                <h3 className="text-2xl font-bold text-[#0C1D32] mb-6 text-center">
                  Miért a MobiShare az első lépés az EV vásárláshoz?
                </h3>

                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-[#007AAD]/10 p-2 rounded-full mr-3 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-[#007AAD]"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-[#0C1D32]/80">
                      <strong>Valós adatok</strong> a töltőállomásokról, nem
                      marketinganyagok
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[#007AAD]/10 p-2 rounded-full mr-3 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-[#007AAD]"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-[#0C1D32]/80">
                      <strong>Közösségi visszajelzések</strong> a különböző EV
                      modellek valós teljesítményéről
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[#007AAD]/10 p-2 rounded-full mr-3 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-[#007AAD]"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-[#0C1D32]/80">
                      <strong>Személyre szabott tanácsadás</strong> a Mobi AI
                      asszisztenstől a vásárlási döntéshez
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[#007AAD]/10 p-2 rounded-full mr-3 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-[#007AAD]"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-[#0C1D32]/80">
                      <strong>Zökkenőmentes átállás</strong> a hagyományos
                      járműről elektromos járműre
                    </p>
                  </li>
                </ul>

                <div className="mt-8 text-center">
                  <Button
                    size="lg"
                    className="bg-[#007AAD] hover:bg-[#007AAD]/90 w-full"
                    onClick={() => scrollToSection(newsletterRef)}
                  >
                    Kezdd el az EV utazásodat
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section ref={missionRef} id="mission" className="py-20 bg-[#D9E2E9]/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C1D32] mb-6">
              Küldetésünk
            </h2>
            <p className="text-xl text-[#0C1D32]/80 mb-8 leading-relaxed">
              A MobiShare-nél elkötelezettek vagyunk Magyarország fenntartható
              mobilitásra való átállásának felgyorsítása mellett, az elektromos
              járművek elterjedésének akadályainak megszüntetésével. Hisszük,
              hogy a megbízható információk, a zökkenőmentes hozzáférés és a
              közösség által vezérelt megoldások kulcsfontosságúak egy zöldebb
              jövő építéséhez.
            </p>
            <div className="flex justify-center">
              <Button
                size="lg"
                className="bg-[#007AAD] hover:bg-[#007AAD]/90"
                onClick={() => scrollToSection(newsletterRef)}
              >
                Csatlakozz a Mozgalmunkhoz
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}

      {/* Newsletter Section */}
      <section
        ref={newsletterRef}
        id="newsletter"
        className="py-20 bg-[#0C1D32]"
      >
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#FFFBFC] mb-4">
              Maradj Naprakész
            </h2>
            <p className="text-[#D9E2E9] mb-8">
              Légy az első, aki értesül a MobiShare indulásáról, és kapj
              exkluzív frissítéseket a fejlődésünkről.
            </p>
            <NewsletterForm />
            <p className="text-[#D9E2E9]/70 text-sm mt-4">
              Tiszteletben tartjuk a magánéletedet. Bármikor leiratkozhatsz.
              <Link
                href="/privacy-policy"
                className="text-[#007AAD] hover:underline"
              >
                Adatvédelmi szabályzat
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#0C1D32] border-t border-[#007AAD]/20">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <img
                src="/favicon.png"
                width={50}
                height={50}
                alt="MobiShare Logo"
              />
              <span className="text-lg font-bold text-[#FFFBFC]">
                MobiShare
              </span>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-4 md:mb-0">
              <Link
                href="/privacy-policy"
                className="text-[#D9E2E9]/80 hover:text-[#FFFBFC] text-sm"
              >
                Adatvédelmi szabályzat
              </Link>
            </div>
            <div className="text-[#D9E2E9]/70 text-sm">
              © {new Date().getFullYear()} MobiShare. Minden jog fenntartva.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
