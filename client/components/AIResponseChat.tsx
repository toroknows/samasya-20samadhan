import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  User,
  MessageSquare,
  Star,
  Clock,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  detectLanguage,
  formatResponseByLanguage,
} from "@/lib/languageDetection";
import { getAIResponses } from "@/lib/aiResponses";

interface AIResponseChatProps {
  isOpen: boolean;
  onClose: () => void;
  problemText: string;
  category: string;
  userInfo: any;
  onConnectExpert: (expertId: string) => void;
}

interface Expert {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  responseTime: string;
  languages: string[];
  availability: string;
}

export default function AIResponseChat({
  isOpen,
  onClose,
  problemText,
  category,
  userInfo,
  onConnectExpert,
}: AIResponseChatProps) {
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [showExperts, setShowExperts] = useState(false);
  const [aiResponseText, setAiResponseText] = useState("");
  const [experts, setExperts] = useState<Expert[]>([]);

  // ---------- Experts ----------
  const generateExperts = (cat: string): Expert[] => {
    const expertsMap: { [key: string]: Expert[] } = {
      "Mental Health": [
        {
          id: "venkatesh-sontakke",
          name: "Venkatesh Sontakke",
          specialty: "Senior Psychologist & Life Coach",
          rating: 5.0,
          responseTime: "Usually responds in 1 hour",
          languages: ["Hindi", "English", "Marathi"],
          availability: "Available today",
        },
        {
          id: "dr-sharma",
          name: "Dr. Priya Sharma",
          specialty: "Anxiety & Stress Specialist",
          rating: 4.9,
          responseTime: "Usually responds in 2 hours",
          languages: ["Hindi", "English"],
          availability: "Available today",
        },
        {
          id: "counselor-singh",
          name: "Rajesh Singh",
          specialty: "Workplace Stress Expert",
          rating: 4.8,
          responseTime: "Usually responds in 4 hours",
          languages: ["Hindi", "English", "Punjabi"],
          availability: "Available tomorrow",
        },
      ],
      Relationships: [
        {
          id: "venkatesh-sontakke",
          name: "Venkatesh Sontakke",
          specialty: "Relationship & Life Expert",
          rating: 5.0,
          responseTime: "Usually responds in 1 hour",
          languages: ["Hindi", "English", "Marathi"],
          availability: "Available today",
        },
        {
          id: "dr-patel",
          name: "Dr. Kavita Patel",
          specialty: "Relationship Counselor",
          rating: 4.9,
          responseTime: "Usually responds in 3 hours",
          languages: ["Hindi", "English", "Gujarati"],
          availability: "Available today",
        },
      ],
      "Work & Study": [
        {
          id: "venkatesh-sontakke",
          name: "Venkatesh Sontakke",
          specialty: "Career & Study Guidance Expert",
          rating: 5.0,
          responseTime: "Usually responds in 1 hour",
          languages: ["Hindi", "English", "Marathi"],
          availability: "Available today",
        },
        {
          id: "career-coach",
          name: "Arun Kumar",
          specialty: "Career Development Coach",
          rating: 4.8,
          responseTime: "Usually responds in 5 hours",
          languages: ["Hindi", "English"],
          availability: "Available today",
        },
      ],
      "Financial Stress": [
        {
          id: "financial-advisor",
          name: "Sunita Agarwal",
          specialty: "Financial Planning Expert",
          rating: 4.7,
          responseTime: "Usually responds in 6 hours",
          languages: ["Hindi", "English"],
          availability: "Available tomorrow",
        },
      ],
      "Physical Wellness": [
        {
          id: "health-expert",
          name: "Dr. Rahul Verma",
          specialty: "Wellness & Lifestyle Coach",
          rating: 4.8,
          responseTime: "Usually responds in 4 hours",
          languages: ["Hindi", "English"],
          availability: "Available today",
        },
      ],
      "Life Stuff": [
        {
          id: "venkatesh-sontakke",
          name: "Venkatesh Sontakke",
          specialty: "Life Transformation Expert",
          rating: 5.0,
          responseTime: "Usually responds in 1 hour",
          languages: ["Hindi", "English", "Marathi"],
          availability: "Available today",
        },
        {
          id: "life-coach",
          name: "Meera Joshi",
          specialty: "Life Direction Coach",
          rating: 4.9,
          responseTime: "Usually responds in 3 hours",
          languages: ["Hindi", "English"],
          availability: "Available today",
        },
      ],
    };

    return expertsMap[cat] || expertsMap["Mental Health"];
  };

  // ---------- AI response (language-aware) ----------
  const generateAIResponse = async (problem: string, cat: string, user: any) => {
    const detectedLang = detectLanguage(problem);
    console.log("Detected language:", detectedLang);

    const responses = await getAIResponses(problem); // returns: {category, greeting, analysis, recommendation, summary, language}
    const categoryFromAI = responses.category || cat || "Mental Health";

    // Build variants
    const variants = {
      hindi: `
🪔 ${responses.greeting}
📖 ${responses.analysis}
✅ ${responses.recommendation}
✨ ${responses.summary}
    `.trim(),
      hinglish: `
👋 ${responses.greeting}
🔍 ${responses.analysis}
💡 ${responses.recommendation}
📝 ${responses.summary}
    `.trim(),
      english: `
👋 ${responses.greeting}
🔍 ${responses.analysis}
💡 ${responses.recommendation}
📝 ${responses.summary}
    `.trim(),
    };

    // Select text based on detected language
    const text = formatResponseByLanguage(detectedLang, variants);

    // Set experts for the AI-picked category
    setExperts(generateExperts(categoryFromAI));

    return text;
  };

  // ---------- Fetch and type the AI response when the modal opens ----------
  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;
    setIsTyping(true);
    setDisplayedText("");
    setShowExperts(false);
    setExperts([]);

    (async () => {
      try {
        const text = await generateAIResponse(problemText, category, userInfo);
        if (cancelled) return;
        setAiResponseText(text);
      } catch (err) {
        if (cancelled) return;
        setAiResponseText("⚠️ Sorry, something went wrong while generating the response.");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isOpen, problemText, category, userInfo]);

  // ---------- Typing animation ----------
  useEffect(() => {
    if (!isOpen || !isTyping || !aiResponseText) return;

    let index = 0;
    const timer = setInterval(() => {
      if (index < aiResponseText.length) {
        setDisplayedText(aiResponseText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setIsTyping(false);
        setTimeout(() => setShowExperts(true), 1000);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [isOpen, isTyping, aiResponseText]);

  // ---------- Re-generate ----------
  const handleRegenerate = async () => {
    setIsTyping(true);
    setDisplayedText("");
    setShowExperts(false);
    setExperts([]);
    try {
      const text = await generateAIResponse(problemText, category, userInfo);
      setAiResponseText(text);
    } catch {
      setAiResponseText("⚠️ Sorry, something went wrong while generating the response.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">SamasyaSamadhan AI</h3>
              <p className="text-sm text-gray-500">आपकी समस्या का समाधान</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* User Message */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <div className="bg-purple-50 rounded-2xl rounded-tl-sm p-4">
                <p className="text-sm font-medium text-purple-700 mb-2">
                  {userInfo?.name ?? "You"} ({category})
                </p>
                <p className="text-gray-700 leading-relaxed">{problemText}</p>
              </div>
            </div>
          </div>

          {/* AI Response */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <div className="bg-gray-50 rounded-2xl rounded-tl-sm p-4">
                {isTyping && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <span className="text-xs text-gray-500">AI typing...</span>
                  </div>
                )}
                <div className="prose prose-sm max-w-none">
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {displayedText}
                  </div>
                  {!isTyping && (
                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-200">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs"
                        onClick={() => {
                          navigator.clipboard.writeText(displayedText).catch(() => {});
                        }}
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        Copy
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs">
                        <ThumbsUp className="w-3 h-3 mr-1" />
                        Helpful
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs">
                        <ThumbsDown className="w-3 h-3 mr-1" />
                        Not helpful
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Expert Recommendations */}
          {showExperts && experts.length > 0 && (
            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                🔥 आपके लिए Perfect Experts:
              </h4>
              <div className="space-y-4">
                {experts.map((expert, index) => (
                  <Card
                    key={expert.id}
                    className={`hover:shadow-lg transition-all ${
                      index === 0 ? "ring-2 ring-purple-200 bg-purple-50" : ""
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h5 className="font-semibold text-gray-900">
                              {expert.name}
                            </h5>
                            {index === 0 && (
                              <Badge className="bg-purple-100 text-purple-700">
                                Best Match
                              </Badge>
                            )}
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm font-medium">
                                {expert.rating}
                              </span>
                            </div>
                          </div>

                          <p className="text-purple-700 font-medium text-sm mb-2">
                            {expert.specialty}
                          </p>

                          <div className="flex items-center gap-4 text-xs text-gray-600">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {expert.responseTime}
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="w-3 h-3" />
                              {expert.languages.join(", ")}
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {expert.availability}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Chat
                          </Button>
                          <Button
                            onClick={() => onConnectExpert(expert.id)}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                            size="sm"
                          >
                            Connect Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!isTyping && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500">
                💡 क्या यह response helpful था? आपका feedback हमारे लिए जरूरी है।
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleRegenerate}>
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Re-generate
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
