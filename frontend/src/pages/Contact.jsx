import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section className="min-h-screen mt-20 bg-[#F8FAFC] py-20 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-[#0B1C2D] mb-4">
            Contact Us
          </h1>
          <p className="text-[#6B7280] max-w-2xl mx-auto">
            Reach out to KHYOOT and our team will get back to you shortly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-md p-8 space-y-6 border-t-4 border-[#6B7280]"
          >
            <div className="flex items-center gap-4">
              <Mail className="text-[#6B7280]" />
              <div>
                <p className="font-semibold text-[#0B1C2D]">Email</p>
                <p className="text-[#6B7280]">aboelkhairahmed869@gmail.com</p>
              </div>
            </div>

            {/* <div className="flex items-center gap-4">
              <Phone className="text-[#6B7280]" />
              <div>
                <p className="font-semibold text-[#0B1C2D]">Phone</p>
                <p className="text-[#6B7280]">+20 1099622861</p>
                <p className="text-[#6B7280]">+20 1050972767</p>
              </div>
            </div> */}

            <div className="flex items-center gap-4">
              <MapPin className="text-[#6B7280]" />
              <div>
                <p className="font-semibold text-[#0B1C2D]">Location</p>
                <p className="text-[#6B7280]">EGYPT - ELMANSOURA</p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-md p-8"
          >
            <form className="space-y-5">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#6B7280] outline-none"
                required
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#6B7280] outline-none"
                required
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#6B7280] outline-none"
                required
              />

              <button
                type="submit"
                className="w-full bg-[#0B1C2D] text-white py-3 rounded-xl font-semibold hover:bg-[#007280] transition"
              >
                Send Message
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
