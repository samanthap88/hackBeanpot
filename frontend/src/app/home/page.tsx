"use client"
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {useQuery } from "convex/react";
import { api } from '../../../convex/generated/api';
import {MapPinIcon,GlobeIcon,MailIcon,TwitterIcon,LinkedinIcon,FacebookIcon,SearchIcon,LockIcon,SunIcon,MoonIcon,} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useInvestors } from "../InvestorsContext";
import {useSession } from "@clerk/nextjs";
import { useDarkMode } from "../DarkModeContext";
import { useRouter } from 'next/navigation';
import { userIsSubscribed } from "@/hooks/userIsSubscribed"; 
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

interface ContactDetails {
  "Partner Name": string;
  Email: string;
  Website: string;
}
interface Investor {
  "Investor Name": string;
  "Fund Focus Areas": string;
  Location: string;
  "Contact Details": ContactDetails;
  "Likelihood to Invest": string;
  "Match Reason": string;
}

interface HomeProps {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  result: any;
}

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

export default function Home(result:any) {
  const [investorsData, setInvestorsData] = useState<Investor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFocus, setSelectedFocus] = useState<string | null>(null);
  const { isDarkMode, setIsDarkMode } = useDarkMode(); 
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const router = useRouter();

  const { investors } = useInvestors();
  
  const lastSearch = useQuery(api.functions.getInvestors);


  useEffect(() => {

    const timeoutId = setTimeout(() => {
      if (lastSearch && lastSearch.length === 0) {
        router.push('/form');
        
      } else {
        console.log("Last search data:", lastSearch);
      }
    }, 1000); 

    return () => clearTimeout(timeoutId);

  }, [lastSearch])


  useEffect(() => {
    result = investors

    if (investors.length === 0 ) {

      if (lastSearch && lastSearch.length != 0 ) {
        result = lastSearch[lastSearch.length -1 ]
        lastSearch[lastSearch.length -1 ].data = lastSearch[lastSearch.length -1 ].data.replace(/```json\n|\n```/g, ''); 
        const parsedData = JSON.parse(lastSearch[lastSearch.length -1 ].data);

        setInvestorsData(parsedData); 
    }
    } else {

      // Check if result.result is an array
      if (Array.isArray(investors)) {
        setInvestorsData(investors); // Set the investors data
      } else {
        // If result.result is a string, attempt to parse it
        try {
          const parsedData = JSON.parse(result.result);
          if (Array.isArray(parsedData)) {
            setInvestorsData(parsedData);
          } else {
            console.error("Parsed result is not an array:", parsedData);
          }
        } catch (error) {
          console.error("Error parsing result:", error);
        }
      }
    }
  }, [result, investors, lastSearch]);



  
  

  const uniqueFocusAreas = Array.from(
    new Set(
      investorsData.flatMap((investor:any) =>
        investor["Fund Focus Areas"].split(", ")
      )
    )
  );
  const filteredInvestors = investorsData.filter(
    (investor:any) =>
      investor["Investor Name"]
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) &&
      (!selectedFocus || investor["Fund Focus Areas"].includes(selectedFocus))
  );

  return (

    <div>  
       
        
        

        <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      } transition-colors duration-300`}>
      <div className="p-4 sm:p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-center">
            Investor Dashboard
          </h1>
          
        </div>

        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-64">
            <Input
              type="text"
              placeholder="Search investors..."
              className={`pl-10 pr-4 py-2 ${
                isDarkMode
                  ? "bg-gray-800 text-gray-100 border-gray-700"
                  : "bg-white text-gray-900 border-gray-300"
              }`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedFocus(null)}
              className={`${
                !selectedFocus
                  ? "bg-blue-600 text-white"
                  : isDarkMode
                  ? "text-blue-400 border-blue-400"
                  : "text-blue-600 border-blue-600"
              }`}
            >
              All
            </Button>
            {uniqueFocusAreas.map((focus:any) => (
              <Button
                key={focus}
                variant="outline"
                size="sm"
                onClick={() => setSelectedFocus(focus)}
                className={`${
                  selectedFocus === focus
                    ? "bg-blue-600 text-white"
                    : isDarkMode
                    ? "text-blue-400 border-blue-400"
                    : "text-blue-600 border-blue-600"
                }`}
              >
                {focus}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredInvestors.map((investor:any, index:any) => (
              <motion.div
                key={investor["Investor Name"]}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card
                  className={`${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                  } shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col`}
                >
                  <CardHeader
                    className={`${
                      isDarkMode
                        ? "bg-gray-750 border-gray-700"
                        : "bg-gray-50 border-gray-200"
                    } border-b`}
                  >
                    <CardTitle className="flex flex-col gap-2">
                      <div className="flex justify-between items-start w-full">
                        <span
                          className={`text-lg font-semibold ${
                            isDarkMode ? "text-gray-100" : "text-gray-800"
                          } break-words pr-2`}
                        >
                          
                             {investor["Investor Name"]}
                        </span>
                        
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 flex-grow relative">
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      } mb-4`}
                    >
                      
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {investor["Fund Focus Areas"]
                        .split(", ")
                        .map((area:any, idx:any) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className={`${
                              isDarkMode
                                ? "bg-blue-900 text-blue-100"
                                : "bg-blue-100 text-blue-800"
                            } text-xs`}
                          >
                            {area}
                          </Badge>
                        ))}
                    </div>
                    <div
                      className={`flex items-center mb-2 ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      <MapPinIcon className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm">
                        {investor.Location !== "nan"
                          ? investor.Location
                          : "Not specified"}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {investor["Contact Details"].Website && (
                        <a
                          href={investor["Contact Details"].Website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center ${
                            isDarkMode ? "text-blue-400" : "text-blue-600"
                          } hover:underline text-sm`}
                        >
                          <GlobeIcon className="w-4 h-4 mr-2" />
                          Website
                        </a>
                      )}
                      {investor["Contact Details"].Email !== "nan" && (
                        <a
                          href={`mailto:${investor["Contact Details"].Email}`}
                          className={`flex items-center ${
                            isDarkMode ? "text-blue-400" : "text-blue-600"
                          } hover:underline text-sm`}
                        >
                          <MailIcon className="w-4 h-4 mr-2" />
                          {investor["Contact Details"].Email}
                        </a>
                      )}
                    </div>
                   
                    
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>

    </div>


      
      

  );
}
