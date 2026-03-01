import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import Layout from "@/components/Layout";
import ProblemSubmissionModal from "@/components/ProblemSubmissionModal";
import AIResponseChat from "@/components/AIResponseChat";
import {
  ArrowRight,
  Users,
  Star,
  Brain,
  Heart,
  GraduationCap,
  Globe,
  Dumbbell,
  Smile,
  DollarSign,
  Mic,
  MicOff,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Index() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    urgency: "",
    contactEmail: "",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [aiAnalysisOpen, setAiAnalysisOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [isListening, setIsListening] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{
    title: string;
    icon: any;
    color: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Problem submitted:", formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const startListening = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        (window as any).webkitSpeechRecognition ||
        (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "hi-IN"; // Hindi language

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setFormData((prev) => ({
          ...prev,
          description:
            prev.description + (prev.description ? " " : "") + transcript,
        }));
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        if (event.error === "not-allowed") {
          alert("माइक्रोफोन की अनुमति दें (Please allow microphone access)");
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert(
        "आपका browser speech recognition को support नहीं करता (Your browser does not support speech recognition)",
      );
    }
  };

  const stats = [
    { number: "500+", label: "Problems Solved" },
    { number: "100+", label: "Happy People" },
    { number: "100%", label: "Safe & Private" },
    { number: "24h", label: "Quick Response" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 relative">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            {/* Friendly Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-purple-300 mb-8 shadow-lg">
              <Smile className="w-4 h-4 text-purple-600 mr-2" />
              <span className="text-sm font-medium text-purple-700">
                Safe, Anonymous & Caring
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              Hey, we get it.{" "}
              <span className="text-purple-300">Every problem</span> has a
              solution
            </h1>

            {/* Engaging subtitle */}
            <div className="max-w-4xl mx-auto mb-12 text-center px-4">
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed mb-6">
                Don't worry, we are here for you. Whatever challenge you're
                facing, you don't have to go through it alone.
              </p>
            </div>

            {/* Quick Input Prompt */}
            <div className="max-w-3xl mx-auto mb-10 relative">
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>

              <div className="relative bg-white/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl border-2 border-purple-200/60 p-6 sm:p-8 md:p-10 shadow-2xl transition-all duration-300 hover:shadow-3xl mx-4 sm:mx-0">
                
                <div className="relative">
                  <div className="text-center mb-6">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2">
                      What's on your mind today?
                    </h3>
                  </div>

                  {/* Textarea */}
                  <div className="relative mb-6">
                    <textarea
                      placeholder="Type anything... stress, family issues, work problems, exam pressure... No judgment, just support. ✨"
                      className="w-full h-32 sm:h-36 px-4 sm:px-6 py-4 sm:py-5 pr-12 sm:pr-16 rounded-xl sm:rounded-2xl border-2 border-purple-200 bg-purple-50/40 focus:border-purple-500 focus:ring-4 focus:ring-purple-200/50 focus:bg-white outline-none resize-none text-gray-700 placeholder-gray-400 transition-all duration-300 text-sm sm:text-base leading-relaxed shadow-inner"
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                    />
                    {/* Microphone Button */}
                    <button
                      type="button"
                      onClick={startListening}
                      disabled={isListening}
                      className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isListening
                          ? "bg-red-500 text-white animate-pulse"
                          : "bg-purple-500 hover:bg-purple-600 text-white"
                      }`}
                    >
                      {isListening ? (
                        <MicOff className="w-4 h-4" />
                      ) : (
                        <Mic className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Button
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl sm:rounded-2xl py-3 sm:py-4 px-6 sm:px-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-base sm:text-lg font-semibold min-h-[48px]"
                      onClick={() => {
                        if (formData.description.trim()) {
                          setSelectedCategory({
                            title: "General Support",
                            icon: Heart,
                            color: "bg-purple-100 text-purple-600",
                          });
                          setModalOpen(true);
                        } else {
                          document
                            .getElementById("problem-categories")
                            ?.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                    >
                      <Heart className="mr-3 h-5 w-5" />
                      Get Help With This
                    </Button>
                    <Button
                      variant="outline"
                      className="border-2 border-purple-400 text-purple-600 hover:bg-purple-50 hover:border-purple-500 rounded-xl sm:rounded-2xl py-3 sm:py-4 px-6 sm:px-8 transition-all duration-300 hover:scale-105 text-base sm:text-lg font-semibold bg-white/70 min-h-[48px]"
                      asChild
                    >
                      <Link to="/mentor">
                        <Users className="mr-2 h-5 w-5" />
                        Browse Experts
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Simple Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto px-4 mt-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/20"
                >
                  <div className="text-xl sm:text-2xl font-bold text-purple-300 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm text-white/80">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem Categories - CHANGED: Simplified cards */}
      <section id="problem-categories" className="py-20 relative bg-black/10">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              What's on your mind?
            </h2>
            <p className="text-lg text-white/80">
              Select a category to get started
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
            {[
              {
                icon: Brain,
                title: "Mental Health",
                description: "Stress, anxiety, or feeling overwhelmed.",
                color: "bg-purple-500",
              },
              {
                icon: Dumbbell,
                title: "Physical Wellness",
                description: "Sleep problems, energy issues, or health.",
                color: "bg-green-500",
              },
              {
                icon: Heart,
                title: "Relationships",
                description: "Family drama, breakups, or feeling lonely.",
                color: "bg-red-500",
              },
              {
                icon: GraduationCap,
                title: "Work & Study",
                description: "Exam pressure, career confusion, or burnout.",
                color: "bg-blue-500",
              },
              {
                icon: DollarSign,
                title: "Financial Stress",
                description: "Money worries, debt issues, budgeting.",
                color: "bg-emerald-500",
              },
              {
                icon: Globe,
                title: "Life Stuff",
                description: "Motivation, habits, or figuring things out.",
                color: "bg-orange-500",
              },
            ].map((category, index) => {
              const Icon = category.icon;
              return (
                <Card
                  key={index}
                  className="hover:-translate-y-2 transition-transform duration-300 cursor-pointer border-none bg-white shadow-xl rounded-2xl overflow-hidden group"
                  onClick={() => {
                    setSelectedCategory({
                      title: category.title,
                      icon: category.icon,
                      color: `text-${category.color.split('-')[1]}-600 bg-${category.color.split('-')[1]}-100`,
                    });
                    setModalOpen(true);
                  }}
                >
                  <div className={`h-2 w-full ${category.color}`}></div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <div className={`p-3 rounded-xl ${category.color} bg-opacity-10`}>
                        <Icon className={`h-6 w-6 text-gray-800`} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {category.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center text-sm font-semibold text-purple-600 group-hover:text-pink-500 transition-colors">
                      Get Help <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 relative">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              How it works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Tell us what's up",
                description: "Share what's bothering you. It's completely anonymous.",
              },
              {
                step: "2",
                title: "We match you up",
                description: "Our team finds the right person based on your needs.",
              },
              {
                step: "3",
                title: "Get support",
                description: "Chat with someone who gets it and get advice.",
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-white mb-6 text-xl font-bold border border-white/30">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-white/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Submission Modal */}
      <ProblemSubmissionModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedCategory(null);
        }}
        selectedCategory={selectedCategory?.title}
        categoryIcon={selectedCategory?.icon}
        categoryColor={selectedCategory?.color}
        problemDescription={formData.description}
        onSubmitSuccess={(data) => {
          setSubmittedData(data);
          setAiAnalysisOpen(true);
        }}
      />

      {/* AI Chat Response */}
      <AIResponseChat
        isOpen={aiAnalysisOpen}
        onClose={() => {
          setAiAnalysisOpen(false);
          setSubmittedData(null);
        }}
        problemText={submittedData?.description || ""}
        category={submittedData?.category || ""}
        userInfo={submittedData || {}}
        onConnectExpert={(expertId) => {
          console.log("Connecting with expert:", expertId);
          setAiAnalysisOpen(false);
          setSubmittedData(null);
        }}
      />
    </Layout>
  );
}
