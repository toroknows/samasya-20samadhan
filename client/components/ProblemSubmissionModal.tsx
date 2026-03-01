import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Check } from "lucide-react";

interface ProblemSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory?: string;
  categoryIcon?: any;
  categoryColor?: string;
  onSubmitSuccess?: (formData: any) => void;
  problemDescription?: string; // Text from the main textarea
}

export default function ProblemSubmissionModal({
  isOpen,
  onClose,
  selectedCategory,
  categoryIcon: IconComponent,
  categoryColor,
  onSubmitSuccess,
  problemDescription = "",
}: ProblemSubmissionModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    countryCode: "+91", // CHANGED: Added default country code
    phoneNumber: "",
    location: "",
    duration: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Problem submitted:", formData);
    setIsSubmitted(true);
    
    // After showing success message, trigger AI analysis
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      
      // Trigger AI analysis with the combined data
      if (onSubmitSuccess) {
        onSubmitSuccess({
          ...formData,
          // Combine country code and phone number
          fullPhoneNumber: `${formData.countryCode} ${formData.phoneNumber}`,
          category: selectedCategory,
          description: problemDescription,
        });
      }
      
      // Reset form
      setFormData({
        name: "",
        age: "",
        countryCode: "+91",
        phoneNumber: "",
        location: "",
        duration: "",
      });
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md mx-4">
          <div className="text-center py-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Thank you!
            </h3>
            <p className="text-gray-600 mb-4">
              Our AI is analyzing your problem and preparing the best suggestions for you...
            </p>
            <div className="text-sm text-gray-500">
              We're also finding the perfect expert for you ✨
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto mx-4">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-4">
            {IconComponent && (
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${categoryColor}`}>
                <IconComponent className="h-5 w-5" />
              </div>
            )}
            <div>
              <DialogTitle className="text-lg sm:text-xl">
                Help for {selectedCategory} Problems
              </DialogTitle>
              <DialogDescription className="text-sm sm:text-base">
                Just provide some basic information, our AI will handle the rest
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Show problem preview */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Your Problem:</strong> "{selectedCategory}"
            <br />
            <span className="text-blue-600">
              {problemDescription ? problemDescription.substring(0, 150) + '...' : 'What you wrote'}
            </span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          {/* Essential Information */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
            <h4 className="font-semibold text-purple-900 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Your Information
            </h4>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Name *
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                    className="h-11"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-sm font-medium">
                    Age *
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    min="13"
                    max="100"
                    placeholder="Your age"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    required
                    className="h-11"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* CHANGED: Country Code + Phone Number Layout */}
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-sm font-medium">
                    Mobile Number *
                  </Label>
                  <div className="flex gap-2">
                    <Select
                      value={formData.countryCode}
                      onValueChange={(value) => handleInputChange("countryCode", value)}
                    >
                      <SelectTrigger className="w-[90px] h-11">
                        <SelectValue placeholder="Code" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="+91">+91 (IN)</SelectItem>
                        <SelectItem value="+1">+1 (US/CA)</SelectItem>
                        <SelectItem value="+44">+44 (UK)</SelectItem>
                        <SelectItem value="+61">+61 (AU)</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      placeholder="XXXXX XXXXX"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                      required
                      className="h-11 flex-1"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-medium">
                    Location *
                  </Label>
                  <Input
                    id="location"
                    placeholder="City, State"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    required
                    className="h-11"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration" className="text-sm font-medium">
                  How long have you been facing this problem? *
                </Label>
                <Select
                  onValueChange={(value) => handleInputChange("duration", value)}
                  required
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="few-days">A few days</SelectItem>
                    <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
                    <SelectItem value="1-month">About a month</SelectItem>
                    <SelectItem value="2-3-months">2-3 months</SelectItem>
                    <SelectItem value="6-months">6 months</SelectItem>
                    <SelectItem value="1-year">About a year</SelectItem>
                    <SelectItem value="more-than-year">More than a year</SelectItem>
                    <SelectItem value="several-years">Several years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div className="text-sm">
                <p className="font-medium text-green-900 mb-1">🔒 Privacy & Security</p>
                <p className="text-green-700">
                  All your information will be kept completely safe and confidential. Our AI will understand your problem and provide the best suggestions and experts.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 min-h-[48px] text-sm sm:text-base"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 min-h-[48px] text-sm sm:text-base"
            >
              🤖 Get AI Help
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
