// <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]' >
import { useEffect, useRef, useState } from "react";

const FadeInSection = ({ children }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out 
         ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  );
};
 
const About = () => {
  return (
    <main className="w-full mt-20 ">
      {/* HERO */}
      <section className="w-full bg-neutral-900 text-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <span className="inline-block mb-4 px-4 py-1 text-sm border border-white/30 rounded-full">
            Made in Egypt 🇪🇬
          </span>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-3xl">
            Threads of identity,
            <br /> woven with purpose
          </h1>

          <p className="mt-6 text-lg text-gray-300 max-w-2xl">
            Khyoot blends Egyptian heritage with modern design to create
            meaningful, locally crafted fashion.
          </p>
        </div>
      </section>

      {/* ABOUT TEXT */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <FadeInSection>
          <h2 className="text-3xl font-bold mb-8 text-center">About Us</h2>
        </FadeInSection>

        <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
          <FadeInSection>
            <p>
              <span className="font-semibold text-black">Khyoot</span> is a local
              Egyptian brand inspired by our rich heritage and driven by modern
              design.
            </p>
          </FadeInSection>

          <FadeInSection>
            <p>
              Meaning <em>“threads”</em> in Arabic, Khyoot connects tradition with
              innovation through ethically made, locally crafted pieces.
            </p>
          </FadeInSection>

          <FadeInSection>
            <p>
              We celebrate Egyptian craftsmanship by blending cultural roots
              with contemporary style — creating unique, meaningful designs
              that reflect who we are and where we come from.
            </p>
          </FadeInSection>

          <FadeInSection>
            <p className="font-semibold text-black">
              Khyoot isn’t just fashion — it’s identity, woven.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-neutral-50 py-20 px-6 h-full">
        <div className="max-w-6xl mx-auto">
          <FadeInSection>
            <h2 className="text-3xl font-bold mb-12 text-center">
              Our Values
            </h2>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FadeInSection>
              <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
                <h3 className="text-xl font-semibold mb-3">Craft</h3>
                <p className="text-gray-600">
                  Every piece is thoughtfully made with attention to detail,
                  honoring traditional Egyptian craftsmanship.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection>
              <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
                <h3 className="text-xl font-semibold mb-3">Identity</h3>
                <p className="text-gray-600">
                  Our designs tell stories — inspired by culture, roots, and
                  personal expression.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection>
              <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
                <h3 className="text-xl font-semibold mb-3">
                  Sustainability
                </h3>
                <p className="text-gray-600">
                  Locally produced, ethically made, and consciously designed
                  for a better future.
                </p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>
      {/* WHY CHOOSE KHYOOT */}
<section className="py-20 px-6 bg-white">
  <div className="max-w-6xl mx-auto">
    
    <FadeInSection>
      <h2 className="text-3xl font-bold mb-12 text-center">
        Why Choose Khyoot
      </h2>
    </FadeInSection>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      
      <FadeInSection>
        <div className="p-8 border rounded-2xl text-center hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-3">
            Authentic Craft
          </h3>
          <p className="text-gray-600">
            Every piece is inspired by Egyptian heritage and crafted with
            attention to detail and cultural meaning.
          </p>
        </div>
      </FadeInSection>

      <FadeInSection>
        <div className="p-8 border rounded-2xl text-center hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-3">
            Modern Design
          </h3>
          <p className="text-gray-600">
            We blend traditional elements with contemporary fashion to create
            timeless, wearable designs.
          </p>
        </div>
      </FadeInSection>

      <FadeInSection>
        <div className="p-8 border rounded-2xl text-center hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-3">
            Made with Purpose
          </h3>
          <p className="text-gray-600">
            Khyoot is built on meaning, sustainability, and supporting local
            craftsmanship.
          </p>
        </div>
      </FadeInSection>

    </div>
  </div>
</section>

    </main>
  );
};

export default About;
