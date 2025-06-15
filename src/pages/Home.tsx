import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Button from "../components/common/Button";

// Set your summit date here
const eventDate = new Date("2025-08-01T09:00:00");

const getRemainingTime = () => {
  const now = new Date().getTime();
  const distance = eventDate.getTime() - now;
  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  };
};

const Home = () => {
  const [timeLeft, setTimeLeft] = useState(getRemainingTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getRemainingTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#141e30] to-[#243b55] text-white">
      <Navbar />

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="flex flex-col md:flex-row items-center justify-between px-6 py-20 max-w-7xl mx-auto gap-12">
          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg">
              Welcome to <br className="hidden md:block" />
              <span className="text-emerald-400">Summit Management</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-md">
              Be part of our annual TUCASA summit and connect with peers, grow
              spiritually, and be transformed!
            </p>
            <Link to="/register">
              <Button className="bg-emerald-500 hover:bg-emerald-600 px-6 py-3 text-lg transition-all duration-300 rounded-xl shadow-lg">
                Register Now
              </Button>
            </Link>
          </div>

          {/* Hero Image */}
          <div className="flex-1">
            <img
              src="https://images.pexels.com/photos/5592489/pexels-photo-5592489.jpeg"
              alt="Summit"
              className="w-full max-w-md mx-auto drop-shadow-xl"
            />
          </div>
        </section>

        {/* Countdown Section */}
        <section className="py-16 text-center bg-white/5 border-t border-white/10">
          <h2 className="text-3xl font-bold text-emerald-300 mb-6">
            Countdown to the Summit
          </h2>
          <div className="flex justify-center gap-6 text-white text-2xl font-bold">
            {["days", "hours", "minutes", "seconds"].map((unit) => (
              <div
                key={unit}
                className="bg-black/30 border border-white/20 rounded-xl px-4 py-6 w-24 shadow-lg"
              >
                <div className="text-4xl text-emerald-400">
                  {timeLeft[unit as keyof typeof timeLeft]
                    .toString()
                    .padStart(2, "0")}
                </div>
                <div className="text-xs uppercase mt-2">{unit}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Highlights Section */}
        <section className="bg-white/10 backdrop-blur-md py-16 border-t border-white/10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6">
            {[
              {
                title: "Inspiring Sessions",
                desc: "Experience teachings and worship that elevate your faith.",
                icon: "🎤",
              },
              {
                title: "Network with Peers",
                desc: "Build lifelong friendships with fellow believers.",
                icon: "🤝",
              },
              {
                title: "Empowered Leadership",
                desc: "Grow into a bold Christian leader equipped for real impact.",
                icon: "🔥",
              },
            ].map(({ title, desc, icon }, index) => (
              <div
                key={index}
                className="bg-white/10 border border-white/20 p-6 rounded-2xl shadow-xl text-center"
              >
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="text-xl font-bold mb-2 text-emerald-300">
                  {title}
                </h3>
                <p className="text-white/80 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-white/5 border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-10 text-emerald-300">
              What Participants Say
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Rehema M.",
                  feedback:
                    "The summit changed my life. I connected deeply with God and met amazing people!",
                },
                {
                  name: "John K.",
                  feedback:
                    "I learned so much about leadership and faith. Every student should attend!",
                },
                {
                  name: "Sarah T.",
                  feedback:
                    "From the worship sessions to the workshops — everything was powerful and uplifting!",
                },
              ].map(({ name, feedback }, index) => (
                <div
                  key={index}
                  className="bg-white/10 border border-white/20 p-6 rounded-xl shadow-xl text-left"
                >
                  <p className="text-white/80 text-sm mb-4">"{feedback}"</p>
                  <h4 className="font-semibold text-emerald-300">{name}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gradient-to-t from-[#141e30] to-[#243b55] border-t border-white/10">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-10 text-emerald-300">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  question: "Who can attend the summit?",
                  answer:
                    "All TUCASA members and interested students from recognized universities are welcome.",
                },
                {
                  question: "Is accommodation provided?",
                  answer:
                    "Yes, accommodation and meals are included in the registration package.",
                },
                {
                  question: "What should I bring?",
                  answer:
                    "Bring your Bible, notebook, personal items, and a heart ready for revival!",
                },
              ].map(({ question, answer }, index) => (
                <div
                  key={index}
                  className="bg-white/5 p-6 rounded-xl border border-white/10"
                >
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {question}
                  </h3>
                  <p className="text-white/70 text-sm">{answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
