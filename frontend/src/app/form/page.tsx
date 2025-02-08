"use client";

import React from 'react';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from "framer-motion";
import { Home } from 'lucide-react';

import {
  FaChevronRight,
  FaChevronLeft,
  FaCheck,
  FaRocket,
  FaBriefcase,
  FaFileAlt,
  FaMapMarkerAlt,
  FaSearch,
  FaCoffee,
  FaMagic,
  FaUserTie,
  FaSignOutAlt,
  FaCreditCard,
} from "react-icons/fa";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { SignInButton, SignOutButton, useSession } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from '../../../convex/generated/api';
import { useInvestors } from '../InvestorsContext';
import { RedirectToSignIn } from '@clerk/clerk-react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const steps = [
  { name: "Industry", icon: FaBriefcase },
  { name: "Stage", icon: FaRocket },
  { name: "Description", icon: FaFileAlt },
  { name: "Location", icon: FaMapMarkerAlt },
];

const loadingMessages = [
  { text: "Summoning unicorns to review your startup...", icon: FaMagic },
  { text: "Teaching AI to speak 'Venture Capitalist'...", icon: FaUserTie },
  { text: "Polishing the crystal ball for accurate predictions...", icon: FaSearch },
  { text: "Convincing Elon Musk to retweet your pitch...", icon: FaRocket },
  { text: "Searching for investors under couch cushions...", icon: FaSearch },
  { text: "Bribing the algorithm with virtual cookies...", icon: FaCoffee },
  { text: "Sending carrier pigeons to Silicon Valley...", icon: FaRocket },
  { text: "Consulting the ancient startup oracles...", icon: FaMagic },
  { text: "Aligning the stars for your funding round...", icon: FaMagic },
  { text: "Hacking into the matrix for better matches...", icon: FaSearch },
];

export default function EnhancedOnboardingWidget() {
  const userCredits = useQuery(api.functions.getUserCredits);
  const { isSignedIn } = useSession();
  const createFormInput = useMutation(api.functions.createFormData);
  const storeInvestorData = useMutation(api.functions.storeInvestorData);
  const investorList = useQuery(api.functions.getInvestors);
  const { setInvestors2 } = useInvestors();

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    income: "",
    householdSize: "",
    age: "",
    employment: "",
    location: "" 
  });
  const [investors, setInvestors] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const lastSearch = useQuery(api.functions.getInvestors) || [] ;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const router = useRouter();

  useEffect(() => {
    console.log(investors)
    if (!isLoading && investors) {
        console.log(investors)
        let cleanedData = investors.replace(/`/g, '').replace(/\bjson\b/gi, '');
        setInvestors2(JSON.parse(cleanedData));
        router.push("/home");
    }
  }, [isLoading, investors, router]);

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value, // Dynamically update the form field based on name
    });
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < steps.length - 1) {
      handleNext();
      return;
    }

    if (userCredits !== undefined && userCredits <= 0) {
      alert("You have no credits left. Please upgrade to continue using the service.");
      return;
    }

    setIsLoading(true);
    setInvestors(null);
    setLoadingProgress(0);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const response = await fetch('https://ripe-tania-aloangels-0652a7cd.koyeb.app/find_investors', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch investors');
      }

      const data = await response.json();
      setInvestors(data.investors);

      await storeInvestorData({ investors: data.investors });
      await createFormInput(formData);

      console.log(formData);
    } catch (error) {
      console.error("Error during form submission:", error);
      alert("An error occurred while processing your request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && currentStep < steps.length - 1) {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStep]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
        setLoadingProgress((prevProgress) => Math.min(prevProgress + 10, 100));
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const currentLoadingMessage = loadingMessages[loadingMessageIndex];

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background design elements */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute left-[10%] top-[20%] w-72 h-72 text-gray-200 opacity-30 animate-float" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,89.1,-0.5C88.1,15.3,83.5,30.6,75.2,43.9C66.9,57.3,54.8,68.6,40.7,76.6C26.6,84.5,10.3,89.1,-4.4,85.9C-19.1,82.7,-32.1,71.8,-45.7,62.4C-59.3,53,-73.4,45.1,-79.1,33C-84.8,20.9,-82,4.6,-76.2,-9.2C-70.4,-23,-61.6,-34.4,-51.1,-43.9C-40.6,-53.3,-28.5,-60.9,-15.3,-70.3C-2.1,-79.7,11.1,-91,25.5,-89.9C39.9,-88.8,55.5,-75.4,44.7,-76.4Z" transform="translate(100 100)" />
        </svg>
        <svg className="absolute right-[10%] bottom-[20%] w-64 h-64 text-gray-200 opacity-30 animate-float-reverse" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M39.9,-65.7C54.1,-60.5,69.3,-54,79.1,-42.4C88.9,-30.8,93.3,-14.4,91.4,0.8C89.4,16,81.1,31.9,71.5,46.7C61.9,61.5,51,75.1,37.2,80.5C23.4,85.9,6.7,83.1,-8.9,79.1C-24.5,75.1,-39,69.9,-51.6,61.6C-64.2,53.3,-75,41.9,-79.8,28.3C-84.6,14.7,-83.4,-1.1,-78.9,-15.3C-74.4,-29.5,-66.5,-42.1,-55.3,-48.9C-44.1,-55.7,-29.6,-56.7,-17.1,-63.9C-4.6,-71.1,6,-84.5,17.7,-85.8C29.5,-87.1,42.3,-76.3,39.9,-65.7Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="absolute top-4 right-4 z-20 flex gap-4 ">
        {lastSearch.length != 0  && (
        <a href="/home">

          <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-lg shadow-md p-3 flex items-center space-x-2">
            <Home/>

            <span className="font-bold text-gray-800 hidden lg:block">Dashboard</span>
          </div>
          
  

        </a>
)}
        
        {isSignedIn ? (
          <SignOutButton>
            <div  className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-lg shadow-md p-3 flex items-center space-x-2">
              <FaSignOutAlt className="mr-2 text-black" />
              <p className='font-bold text-gray-800 hidden lg:block'>Sign Out</p>

            </div>
          </SignOutButton>
        ) : (
          <SignInButton />
        )}
      </div>
      <div className="absolute top-4 left-4 z-20">
        <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-lg shadow-md p-3 flex items-center space-x-2">
          <FaCreditCard className="text-blue-500" />
          <span className="font-bold text-gray-800">Credits: {userCredits !== undefined ? userCredits : 'Loading...'}</span>
        </div>
      </div>


      {isSignedIn && !isLoading && (
  <div className="w-full max-w-lg z-10">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="backdrop-blur-md bg-white/90 rounded-2xl shadow-xl overflow-hidden border border-gray-200"
    >
      <div className="p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-2">
          Benefits Matcher
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Find the best government benefits for your needs
        </p>

        <div className="flex justify-between mb-6">
          {steps.map((step, index) => (
            <div key={step.name} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
                  index <= currentStep ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-400"
                }`}
              >
                <step.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className={`text-xs mt-1 ${index <= currentStep ? "text-blue-600" : "text-gray-400"}`}>
                {step.name}
              </span>
            </div>
          ))}
        </div>

        <Progress value={((currentStep + 1) / steps.length) * 100} className="mb-6" />

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 0 && (
                <div className="space-y-4">
                  <Label htmlFor="age" className="text-gray-700">Your Age</Label>
                  <Input id="age" name="age" type="number" value={formData.age} 
                    onChange={(e) => handleInputChange(e.target.name, e.target.value)} required />
                </div>
              )}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <Label htmlFor="income" className="text-gray-700">Household Income</Label>
                  <Input id="income" name="income" type="number" value={formData.income} 
                    onChange={(e) => handleInputChange(e.target.name, e.target.value)} required />
                </div>
              )}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <Label htmlFor="location" className="text-gray-700">Your Location</Label>
                  <Input id="location" name="location" value={formData.location} 
                    onChange={(e) => handleInputChange(e.target.name, e.target.value)} required />
                </div>
              )}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <Label htmlFor="householdSize" className="text-gray-700">Household Size</Label>
                  <Input id="householdSize" name="householdSize" type="number" value={formData.householdSize} 
                    onChange={(e) => handleInputChange(e.target.name, e.target.value)} required />
                </div>
              )}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <Label htmlFor="employment" className="text-gray-700">Employment Status</Label>
                  <Select name="employment" value={formData.employment} 
                    onValueChange={(value) => handleInputChange("employment", value)} required>
                    <SelectTrigger id="employment" className="bg-white border-gray-300 text-gray-800">
                      <SelectValue placeholder="Select Employment Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Employed">Employed</SelectItem>
                      <SelectItem value="Unemployed">Unemployed</SelectItem>
                      <SelectItem value="Student">Student</SelectItem>
                      <SelectItem value="Retired">Retired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-between">
            <Button type="button" onClick={handlePrevious} disabled={currentStep === 0}>
              <FaChevronLeft className="w-5 h-5 mr-2" /> Back
            </Button>
            <Button type="submit" className={currentStep === steps.length - 1 ? "bg-green-600" : "bg-blue-600"}>
              {currentStep === steps.length - 1 ? "Complete" : "Next"}
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  </div>
)}
    </div>
  );
}