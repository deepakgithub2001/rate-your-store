// src/pages/AboutPage.jsx
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer";
import aboutImg from "../assets/store-about.jpg"

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center px-4 py-12 mt-24">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left Text Section */}
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              About Rate Your Store
            </h2>
            <p className="text-gray-700 text-lg leading-right text-justify">
              Rate Your Store is a platform where users can share their experiences
              and provide ratings for various stores. It empowers customers to make
              informed decisions and helps store owners improve their services.
              Whether you're an admin managing the platform, a store owner receiving
              feedback, or a user leaving reviews — we offer a seamless experience
              for everyone.
            </p>
          </div>

          {/* Right Image Section */}
          <div className="w-full">
            <img
              src={aboutImg}
              alt="About Rate Your Store"
              className="w-full h-auto rounded shadow-md"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
