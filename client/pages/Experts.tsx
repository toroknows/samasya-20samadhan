import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Clock,
  Video,
  MapPin,
  Award,
  Brain,
  Heart,
  GraduationCap,
  DollarSign,
  Dumbbell,
  Globe,
  MessageSquare
} from "lucide-react";

export default function Experts() {
  const experts = [
    {
      id: "venkatesh-sontakke",
      name: "Venkatesh Sontakke",
      specialty: "Senior Psychologist & Life Coach",
      experience: "15 years experience",
      rating: 5.0,
      reviewCount: 456,
      responseTime: "1 hour",
      languages: ["Hindi", "English", "Marathi"],
      location: "Pune, Maharashtra",
      price: "₹1200 / session",
      bio: "Expert psychologist specializing in mental health, relationships, career guidance, and life transformation. Helping people find clarity and purpose.",
      categories: ["Mental Health", "Relationships", "Work & Study", "Life Stuff"],
    },
    {
      id: "dr-priya-sharma",
      name: "Dr. Priya Sharma",
      specialty: "Clinical Psychologist",
      experience: "8 years experience",
      rating: 4.9,
      reviewCount: 247,
      responseTime: "2 hours",
      languages: ["Hindi", "English"],
      location: "Mumbai, Maharashtra",
      price: "₹800 / session",
      bio: "Specialized in anxiety, depression, and stress management.",
      categories: ["Mental Health"],
    },
    {
      id: "rajesh-singh",
      name: "Rajesh Singh",
      specialty: "Career Counselor",
      experience: "12 years experience",
      rating: 4.8,
      reviewCount: 189,
      responseTime: "4 hours",
      languages: ["Hindi", "English", "Punjabi"],
      location: "Delhi, India",
      price: "₹600 / session",
      bio: "Expert in career guidance and workplace stress.",
      categories: ["Work & Study"],
    },
    {
      id: "dr-kavita-patel",
      name: "Dr. Kavita Patel",
      specialty: "Relationship Counselor",
      experience: "10 years experience",
      rating: 4.9,
      reviewCount: 312,
      responseTime: "3 hours",
      languages: ["Hindi", "English", "Gujarati"],
      location: "Ahmedabad, Gujarat",
      price: "₹900 / session",
      bio: "Specializes in couples therapy and family counseling.",
      categories: ["Relationships"],
    },
  ];

  const handleConnectExpert = (expertId: string) => {
    alert(`Connecting with expert: ${expertId}. This would open chat/video call interface.`);
  };

  return (
    <Layout>
      <section className="py-20 md:py-32 relative">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Find Your Perfect <span className="text-purple-300">Expert</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-12 max-w-3xl mx-auto">
              Connect with verified professionals who understand your challenges and can guide you towards solutions.
            </p>
          </div>

          {/* CHANGED: Moved Categories to right below the heading */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Browse by Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
              {[
                { name: "Mental Health", icon: Brain, color: "bg-purple-100 text-purple-600" },
                { name: "Relationships", icon: Heart, color: "bg-red-100 text-red-600" },
                { name: "Work & Study", icon: GraduationCap, color: "bg-blue-100 text-blue-600" },
                { name: "Financial Stress", icon: DollarSign, color: "bg-emerald-100 text-emerald-600" },
                { name: "Physical Wellness", icon: Dumbbell, color: "bg-green-100 text-green-600" },
                { name: "Life Stuff", icon: Globe, color: "bg-orange-100 text-orange-600" },
              ].map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.name}
                    className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all duration-300"
                  >
                    <Icon className="w-6 h-6 mx-auto mb-2" />
                    <div className="text-xs font-medium">{category.name}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Experts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mt-12">
            {experts.map((expert) => (
              <Card key={expert.id} className="bg-white/95 backdrop-blur-sm border border-white/20 hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  {/* Expert Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {expert.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900">{expert.name}</h3>
                        <Award className="w-4 h-4 text-blue-500" />
                      </div>
                      <p className="text-purple-700 font-medium text-sm">{expert.specialty}</p>
                      <p className="text-gray-600 text-xs">{expert.experience}</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{expert.rating}</span>
                      <span className="text-gray-500 text-sm">({expert.reviewCount})</span>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
                    {expert.bio}
                  </p>

                  {/* Details */}
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Response: {expert.responseTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{expert.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{expert.languages.join(", ")}</span>
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {expert.categories.map((category) => (
                      <Badge key={category} variant="secondary" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>

                  {/* CHANGED: Removed Availability Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="font-bold text-purple-700">{expert.price}</div>
                    </div>
                  </div>

                  {/* CHANGED: Removed Message button, made Connect button full width */}
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleConnectExpert(expert.id)}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      <Video className="w-4 h-4 mr-2" />
                      Connect
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Can't Find the Right Expert?
            </h3>
            <p className="text-white/80 mb-8">
              Tell us about your specific needs and we'll help you find the perfect match.
            </p>
            <Button 
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-full shadow-lg"
              asChild
            >
              <a href="/#problem-categories">
                Tell Us Your Problem
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
