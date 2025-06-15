import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#141e30] to-[#243b55] text-white">
    <Navbar />
    <main className="flex-grow flex items-center justify-center px-6">
      <div className="text-center max-w-xl">
        <h1 className="text-7xl font-extrabold mb-6 text-emerald-400 drop-shadow-md">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-white/80 mb-6 text-base md:text-lg">
          The page you’re looking for doesn’t exist or might have been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all duration-300"
        >
          Back to Home
        </Link>
      </div>
    </main>
    <Footer />
  </div>
);

export default NotFound;
