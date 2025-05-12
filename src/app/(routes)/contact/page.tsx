// app/contact/page.tsx
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

export default function ContactPage() {
  return (
    <section className=" scroll-mt-40 py-20 max-md:py-10 ">
      <div className=" max-w-[1440px] mx-auto w-11/12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Contact Information */}
          <div className=" p-8 rounded-lg">
            <h2 className="text-2xl font-semibold second-text-color mb-4">
              Get in Touch
            </h2>
            <p className="mb-6">
              Reach out for a no-obligation discovery call or visit. <br />
              Call or submit the form.
            </p>

            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-start">
                <div className="soft-bg-purple p-3 rounded-full mr-4">
                  <FaPhone className="main-text-color text-xl" />
                </div>
                <div>
                  <h3 className="text-gray-500 text-sm font-medium">Phone</h3>
                  <p className="second-text-color text-lg">(858)864-0192</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start">
                <div className="soft-bg-purple p-3 rounded-full mr-4">
                  <FaEnvelope className="main-text-color text-xl" />
                </div>
                <div>
                  <h3 className="text-gray-500 text-sm font-medium">Email</h3>
                  <p className="second-text-color text-lg">
                    info@unitedcarelinks.com
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start">
                <div className="soft-bg-purple p-3 rounded-full mr-4">
                  <FaMapMarkerAlt className="main-text-color text-xl" />
                </div>
                <div>
                  <h3 className="text-gray-500 text-sm font-medium">
                    Our Address
                  </h3>
                  <p className="second-text-color text-lg">
                    13715 Rosecroft Way, San Diego, CA 92130, USA
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start">
                <div className="soft-bg-purple p-3 rounded-full mr-4">
                  <FaClock className="main-text-color text-xl" />
                </div>
                <div>
                  <h3 className="text-gray-500 text-sm font-medium">
                    Hours of Operation
                  </h3>
                  <p className="second-text-color text-lg">
                    Monday - Friday: 8:00 AM - 5:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className=" p-8 rounded-lg border-2 main-border-color ">
            <h2 className="text-2xl font-semibold second-text-color mb-6">
              Send Us a Message
            </h2>

            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name*
                  </label>
                  <input
                    type="text"
                    id="first-name"
                    name="first-name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md  "
                  />
                </div>

                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name*
                  </label>
                  <input
                    type="text"
                    id="last-name"
                    name="last-name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md "
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md "
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md "
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description*
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md "
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full second-bg-color text-white py-3 px-4 rounded-md font-medium transition-transform duration-300 hover:scale-105 cursor-pointer"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
