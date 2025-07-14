// src/components/Hero.jsx
import heroImg from "../assets/store-hero.jpg"; // Use your own image

const Hero = () => {
  return (
    <div className="py-12 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-10 mt-25">
      {/* Left Text */}
      <div className="mb-8 md:mb-0 md:w-1/2">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Discover & Rate the Best Stores Around You!
        </h1>
        <p className="text-gray-700 text-justify text-lg mt-7 w-[85%]">
          Our platform helps you find trusted local stores and share your experience with the world.
          Sign up to start rating or managing your own store today. Thank You. </p>
      </div>

      {/* Right Image */}
      <div className="md:w-1/2">
        <img
          src={heroImg}
          alt="Store rating"
          className="w-full h-auto rounded-3xl shadow"
        />
      </div>
    </div>
  );
};

export default Hero;
