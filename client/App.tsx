import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Experts from "./pages/Experts";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* CHANGED: Added the basename here so it works on GitHub Pages */}
      <BrowserRouter basename="/samasya-20samadhan/">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/mentor" element={<Experts />} />
          <Route 
            path="/submit" 
            element={
              <Placeholder 
                title="Submit Problem" 
                description="Detailed problem submission form with file uploads and expert matching"
                suggestedAction={{ text: "Submit from Homepage", href: "/#submit-problem" }}
              />
            } 
          />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/help"
            element={
              <Placeholder
                title="Help Center"
                description="Frequently asked questions and support resources"
              />
            }
          />
          <Route 
            path="/contact" 
            element={
              <Placeholder 
                title="Contact Us" 
                description="Get in touch with our support team"
              />
            } 
          />
          <Route 
            path="/faq" 
            element={
              <Placeholder 
                title="FAQ" 
                description="Answers to common questions about our platform"
              />
            } 
          />
          <Route 
            path="/privacy" 
            element={
              <Placeholder 
                title="Privacy Policy" 
                description="How we protect and handle your personal information"
              />
            } 
          />
          <Route 
            path="/terms" 
            element={
              <Placeholder 
                title="Terms of Service" 
                description="Terms and conditions for using our platform"
              />
            } 
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
