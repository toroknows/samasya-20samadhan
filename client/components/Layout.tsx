import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, Home, Menu, X, Heart, Sparkles, Instagram, Facebook, Search } from "lucide-react";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // CHANGED: Removed "Get Help" from navigation
  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Find Expert", href: "/mentor", icon: Users },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Global Background with gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900"></div>
      <div className="fixed inset-0 bg-black/20"></div>

      {/* Floating background elements */}
      <div className="fixed top-20 left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="fixed bottom-20 right-20 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
      <div className="fixed top-1/2 left-10 w-24 h-24 bg-blue-500/10 rounded-full blur-xl animate-float" style={{animationDelay: '4s'}}></div>

      <div className="relative z-10">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-lg border-b border-purple-200 shadow-lg">
        <div className="container px-4 sm:px-6">
          <div className="flex h-16 sm:h-18 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div className="text-xl sm:text-2xl font-bold">
                  <span className="text-purple-600">Samasya</span>
                  <span className="text-pink-500">Samadhan</span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation & Search */}
            <div className="hidden md:flex items-center space-x-6">
              <nav className="flex items-center space-x-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const active =
