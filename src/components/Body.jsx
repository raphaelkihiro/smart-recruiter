import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
function Body () {
  return (
    <>
    <section className="bg-[#193451] text-white py-16 px-4 md:px-8 lg:px-12">
      <div className="max-w-screen-xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">

        <div className="md:w-1/2 text-center md:text-left">

          <h1 className="text-4xl font-bold text-cyan-400 mb-4">
             Smart Hiring Starts Here
          </h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            Empower your recruitment process with coding challenges, live analytics, and AI-generated feedback — all in one platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-4">
            <Link
              to="/login"
              className="bg-cyan-400 text-[#0D1B2A] font-semibold px-6 py-3 rounded-md hover:bg-cyan-500 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="border border-cyan-400 text-cyan-400 px-6 py-3 rounded-md hover:bg-cyan-400 hover:text-[#0D1B2A] transition"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="md:w-1/2">
          <img
            src="https://www.ismartrecruit.com/upload/blog/main_image/Executive_Recruiter_Roles_and_Responsibilities.webp"
            alt="Tech hiring illustration"
            className="rounded-xl shadow-lg w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Mission Statement or Tagline */}
      <p className="mt-16 text-center text-lg text-gray-300 max-w-3xl mx-auto">
        Our mission is to simplify technical hiring — smarter, faster, and bias-free.
      </p>
      <div className="mt-12 text-center">
        <p className="text-gray-300 mb-2">Follow us on social media</p>
        <div className="flex justify-center gap-6 text-cyan-400 text-2xl">
          <a
            href="https://www.facebook.com/helenwoodwardanimalcenter/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="hover:text-green-800 transition" />
          </a>
          <a
            href="https://www.instagram.com/kspca/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="hover:text-pink-600 transition" />
          </a>
          <a
            href="https://x.com/HWAC/status/1799153446420902359"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="hover:text-blue-500 transition" />
          </a>
          <a
            href="https://www.youtube.com/watch?v=DbNNXpeGC7g&t=9s"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube className="hover:text-red-600 transition" />
          </a>
        </div>
      </div>
    </section>
    </>
  );
};

export default Body;
