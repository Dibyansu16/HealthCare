// modification ver-4
import React, { useState } from 'react';
import { Heart, Video, Pill, Users, Car, Activity, MapPin, Calendar, Phone, Search, Menu, X, ChevronRight, Clock, Star, Send, Bot, MessageCircle, Filter, TrendingUp, Bed, CheckCircle, AlertCircle, ArrowLeft, User, Mail, CreditCard, Home, Globe, Building2, UserCircle, FileText, Upload, Navigation, DollarSign, Car as Ambulance, Map, Camera, AlertTriangle, Languages } from 'lucide-react';
import doc1 from '../src/assets/doc1.avif'
import doc2 from '../src/assets/doc2.jpg'
import doc3 from '../src/assets/doc3.jpg'
import doc4 from '../src/assets/doc4.jpg'
import doc5 from '../src/assets/doc5.jpg'
import doc6 from '../src/assets/sur1.webp'

const THEMES = {
    default: {
  name: "Classic Niramaya",
  primary: "from-orange-500 to-red-600",
  bg: "bg-gradient-to-br from-orange-50 via-white to-red-50",
  text: "text-gray-900",
  emergency: "from-red-500 to-orange-500",
  emergencyLight: "bg-red-50", // Added for consistency
  consult: "from-blue-500 to-cyan-500",
  consultLight: "bg-blue-50", // Added for consistency
  doctors: "from-green-500 to-teal-500",
  doctorsLight: "bg-green-50", // Added for consistency
  icuBg: "bg-slate-100",      // Original Live Tracking BG
  medicines: "from-purple-500 to-pink-500",
  medicinesLight: "bg-purple-50" // Added for consistency
},
   option1: {
    name: "Corporate Blue",
    primary: "from-[#2563EB] to-[#1E3A8A]", // Primary Blue to Dark Navy
    bg: "bg-[#F8FAFC]",
    text: "text-[#1E293B]",
    emergency: "from-[#DC2626] to-[#991b1b]",
    emergencyLight: "bg-[#FEF2F2]",
    consult: "from-[#06B6D4] to-[#0891b2]",
    consultLight: "bg-[#ECFEFF]",
    doctors: "from-[#10B981] to-[#059669]",
    doctorsLight: "bg-[#ECFDF5]",
    icuBg: "bg-[#F1F5F9]",
    medicines: "from-[#7C3AED] to-[#5b21b6]",
    medicinesLight: "bg-[#F5F3FF]"
  },
  option2: {
    name: "Modern Indigo",
    primary: "from-[#4338CA] to-[#06B6D4]", // Indigo to Electric Cyan
    bg: "bg-[#F8FAFC]",
    text: "text-[#111827]",
    emergency: "from-[#EF4444] to-[#b91c1c]",
    emergencyLight: "bg-[#FEE2E2]",
    consult: "from-[#22D3EE] to-[#0891b2]",
    consultLight: "bg-[#ECFEFF]",
    doctors: "from-[#059669] to-[#065f46]",
    doctorsLight: "bg-[#D1FAE5]",
    icuBg: "bg-[#EFF6FF]",
    medicines: "from-[#8B5CF6] to-[#6d28d9]",
    medicinesLight: "bg-[#F3E8FF]"
  },
  option3: {
    name: "Soft Sky",
    primary: "from-[#3B82F6] to-[#0EA5E9]", // Soft Blue to Sky Blue
    bg: "bg-[#F1F5F9]",
    text: "text-[#334155]",
    emergency: "from-[#F97316] to-[#ea580c]",
    emergencyLight: "bg-[#FFF7ED]",
    consult: "from-[#22D3EE] to-[#0ea5e9]",
    consultLight: "bg-[#ECFEFF]",
    doctors: "from-[#34D399] to-[#10b981]",
    doctorsLight: "bg-[#F0FDF4]",
    icuBg: "bg-[#FAFAFA]",
    medicines: "from-[#A78BFA] to-[#7c3aed]",
    medicinesLight: "bg-[#F5F3FF]"
  }
};
export default function EnhancedHealthcarePlatform() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', message: 'Hello! I\'m your health assistant. How can I help you today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  
  // New states for authentication and features
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null); // 'hospital' or 'user'
  const [language, setLanguage] = useState('english'); // 'english' or 'odia'
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginType, setLoginType] = useState('user'); // 'user' or 'hospital'
  const [submitted, setSubmitted] = useState(false);
  const [emergencyData, setEmergencyData] = useState(null);
  const [activeAdmission, setActiveAdmission] = useState(null);
  const [showSignupModal,setShowSignupModal]=useState(false);
  const [signupType,setSignupType] = useState('user')
  //set thems changing colours 
  const [themeKey, setThemeKey] = useState('default');
  const theme = THEMES[themeKey];
  
  //const [signupForm,setSignupForm] = use
  // Mock authenticated user data

  const [userData, setUserData] = useState({
    name: 'Rajesh Kumar',
    age: 35,
    phone: '+91 9876543210',
    email: 'rajesh.kumar@email.com',
    permanentLocation: 'Bhubaneswar, Odisha',
    currentLocation: 'Cuttack, Odisha',
    healthCard: 'AYUSHMAN-1234567890',
    bloodGroup: 'O+',
    pastReports: [
      { date: '2025-01-15', type: 'Blood Test', result: 'Normal', doctor: 'Dr. Priya Sharma' },
      { date: '2024-12-10', type: 'ECG', result: 'Normal', doctor: 'Dr. Amit Patel' }
    ]
  });

  // Mock hospital data
  const [hospitalData, setHospitalData] = useState({
    name: 'City General Hospital',
    type: 'Government',
    totalBeds: 150,
    availableBeds: 23,
    icuBeds: 20,
    icuAvailable: 5,
    location: {
      address: 'Station Road, Bhubaneswar, Odisha - 751001',
      lat: 20.2961,
      lng: 85.8245
    },
    contact: {
      phone: '1800-XXX-0001',
      emergency: '108',
      email: 'info@citygeneral.gov.in'
    },
    doctors: [
      { name: 'Dr. Priya Sharma', specialty: 'General Physician', experience: '12 years' },
      { name: 'Dr. Amit Patel', specialty: 'Cardiologist', experience: '18 years' },
      { name: 'Dr. Rajesh Kumar', specialty: 'Pediatrician', experience: '15 years' }
    ],
    milestones: [
      { year: 2023, achievement: 'First hospital in Odisha to perform robotic surgery' },
      { year: 2024, achievement: 'Treated 50,000+ patients with 95% success rate' }
    ],
    specializations: ['Cardiology', 'Neurology', 'Oncology', 'Pediatrics', 'Emergency Care']
  });

  // Translations
  const translations = {
    english: {
      home: 'Home',
      doctors: 'Doctors',
      services: 'Services',
      health: 'Health',
      icu: 'ICU',
      emergency: 'Emergency',
      login: 'Login',
      logout: 'Logout',
      profile: 'Profile',
      admission: 'My Admission',
      searchPlaceholder: 'Search doctors, specialties, services...',
      quickAccess: 'Quick Access',
      findDoctors: 'Find Doctors',
      consultOnline: 'Consult Online',
      medicines: 'Medicines',
      emergencyService: 'Emergency',
      ambulance: 'Ambulance & ICU',
      homeDelivery: 'Home delivery',
      videoAudio: 'Video & Audio',
      nearbySpecialists: 'Nearby specialists',
      healthcareSimple: 'Healthcare Made Simple',
      connectDoctors: 'Connect with doctors, track your health, and access medical services from anywhere',
      changeLanguage: 'Change Language'
    },
    odia: {
      home: 'ମୁଖ୍ୟ ପୃଷ୍ଠା',
      doctors: 'ଡାକ୍ତର',
      services: 'ସେବା',
      health: 'ସ୍ବାସ୍ଥ୍ୟ',
      icu: 'ଆଇସିୟୁ',
      emergency: 'ଜରୁରୀକାଳୀନ',
      login: 'ଲଗଇନ୍',
      logout: 'ଲଗଆଉଟ୍',
      profile: 'ପ୍ରୋଫାଇଲ୍',
      admission: 'ମୋର ଆଡମିଶନ୍',
      searchPlaceholder: 'ଡାକ୍ତର, ବିଶେଷଜ୍ଞତା, ସେବା ଖୋଜନ୍ତୁ...',
      quickAccess: 'ତୁରନ୍ତ ପ୍ରବେଶ',
      findDoctors: 'ଡାକ୍ତର ଖୋଜନ୍ତୁ',
      consultOnline: 'ଅନଲାଇନ୍ ପରାମର୍ଶ',
      medicines: 'ଔଷଧ',
      emergencyService: 'ଜରୁରୀକାଳୀନ',
      ambulance: 'ଆମ୍ବୁଲାନ୍ସ ଓ ଆଇସିୟୁ',
      homeDelivery: 'ଘର ବିତରଣ',
      videoAudio: 'ଭିଡିଓ ଓ ଅଡିଓ',
      nearbySpecialists: 'ନିକଟସ୍ଥ ବିଶେଷଜ୍ଞ',
      healthcareSimple: ' ସରଳ ସ୍ବାସ୍ଥ୍ୟସେବା ',
      connectDoctors: 'ଯେକୌଣସି ସ୍ଥାନରୁ ଡାକ୍ତରଙ୍କ ସହ ଯୋଗାଯୋଗ କରନ୍ତୁ, ଆପଣଙ୍କ ସ୍ବାସ୍ଥ୍ୟ ଟ୍ରାକ୍ କରନ୍ତୁ ଏବଂ ଚିକିତ୍ସା ସେବା ପାଆନ୍ତୁ',
      changeLanguage: 'ଭାଷା ପରିବର୍ତ୍ତନ କରନ୍ତୁ'
    }
  };

  const t = translations[language];

  // Mock Doctor Data
  const doctors = [
    { id: 1, name: 'Dr. Priya Sharma', specialty: 'Cardiologist', experience: '15 years', rating: 4.8, image: doc2, nextAvailable: 'Today, 3:00 PM', consultationFee: '₹500', hospital: 'AIIMS Bhubaneswar', availability: 'Mon-Fri: 9AM-5PM', education: 'MBBS, MD (Cardiology)', languages: 'English, Odia, Hindi' },
    { id: 2, name: 'Dr. Rajesh Kumar', specialty: 'Pediatrician', experience: '12 years', rating: 4.9, image: doc1, nextAvailable: 'Tomorrow, 10:00 AM', consultationFee: '₹400', hospital: 'Care Hospital', availability: 'Mon-Sat: 10AM-6PM', education: 'MBBS, MD (Pediatrics)', languages: 'English, Odia' },
    { id: 3, name: 'Dr. Anita Patel', specialty: 'Dermatologist', experience: '10 years', rating: 4.7, image: doc4, nextAvailable: 'Today, 5:00 PM', consultationFee: '₹600', hospital: 'Apollo Hospital', availability: 'Tue-Sun: 11AM-7PM', education: 'MBBS, MD (Dermatology)', languages: 'English, Hindi' },
    { id: 4, name: 'Dr. Sanjay Mohanty', specialty: 'Orthopedic', experience: '18 years', rating: 4.9, image: doc3, nextAvailable: 'Tomorrow, 2:00 PM', consultationFee: '₹700', hospital: 'Kalinga Hospital', availability: 'Mon-Fri: 8AM-4PM', education: 'MBBS, MS (Orthopedics)', languages: 'English, Odia, Hindi' },
    { id: 5, name: 'Dr. Meera Das', specialty: 'Gynecologist', experience: '14 years', rating: 4.8, image: doc6, nextAvailable: 'Today, 4:00 PM', consultationFee: '₹550', hospital: 'SUM Hospital', availability: 'Mon-Sat: 9AM-5PM', education: 'MBBS, MD (Gynecology)', languages: 'English, Odia' },
    { id: 6, name: 'Dr. Vikram Singh', specialty: 'General Physician', experience: '8 years', rating: 4.6, image:doc5, nextAvailable: 'Today, 6:00 PM', consultationFee: '₹350', hospital: 'City Hospital', availability: 'Mon-Sun: 9AM-9PM', education: 'MBBS, MD', languages: 'English, Hindi, Odia' }
  ];

  // Health Services Data
  const healthServices = [
    { icon: Video, title: 'Video Consultation', description: 'Connect with doctors via video call', color: theme.consult },
    { icon: Pill, title: 'Medicine Delivery', description: 'Get medicines delivered to your doorstep', color: theme.medicines },
    { icon: Activity, title: 'Health Checkup', description: 'Book comprehensive health packages', color: theme.doctors },
    { icon: Car, title: 'Ambulance', description: '24/7 emergency ambulance service', color: theme.emergency }
  ];

  // ICU Data
  const icuData = [
    { hospital: 'AIIMS Bhubaneswar', total: 50, available: 8, location: '2.3 km away', lastUpdated: '5 mins ago', contact: '0674-xxx-xxxx', type: 'Government', specialization: 'Multi-specialty' },
    { hospital: 'Care Hospital', total: 30, available: 3, location: '3.1 km away', lastUpdated: '12 mins ago', contact: '0674-xxx-xxxx', type: 'Private', specialization: 'Cardiac Care' },
    { hospital: 'Apollo Hospital', total: 40, available: 12, location: '4.5 km away', lastUpdated: '8 mins ago', contact: '0674-xxx-xxxx', type: 'Private', specialization: 'Multi-specialty' },
    { hospital: 'Kalinga Hospital', total: 25, available: 0, location: '1.8 km away', lastUpdated: '3 mins ago', contact: '0674-xxx-xxxx', type: 'Private', specialization: 'Trauma Care' },
    { hospital: 'SUM Hospital', total: 35, available: 5, location: '5.2 km away', lastUpdated: '15 mins ago', contact: '0674-xxx-xxxx', type: 'Private', specialization: 'Multi-specialty' }
  ];

  // Filter functions
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });
//=================================================================================================================================

// ─────────────────────────────────────────────────────────────────────────────
// ALL fetch calls use RELATIVE paths — no hardcoded ports or URLs needed.
//
// This works because:
//   DEV MODE  (npm run dev):  vite.config.js proxies /translate, /chat → :8000
//   PROD MODE (npm run build): FastAPI serves the built files AND handles the routes
//   NGROK:                    Team opens ngrok URL, all requests stay on same domain
//
// You never need to change this file when switching between local/ngrok/team sharing
// ─────────────────────────────────────────────────────────────────────────────

const HEADERS = {
  "Content-Type": "application/json",
  "ngrok-skip-browser-warning": "true",
};

const handleSendMessage = async () => {
  if (!chatInput.trim()) return;

  const usrmsg = chatInput;
  setChatMessages([...chatMessages, { type: "user", message: usrmsg }]);
  setChatInput("");

  // Add empty bot message — we'll update it as tokens/sentences stream in
  setChatMessages((prev) => [...prev, { type: "bot", message: "" }]);

  try {
    if (language === "odia") {
      // ── ODIA PATH ────────────────────────────────────────────────────────

      // Step 1: Translate user Odia input → English (not streaming, fast)
      const transInRes = await fetch("/translate", {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({ text: usrmsg, direction: "to_en" }),
      });
      if (!transInRes.ok) throw new Error(`Translate→EN failed: ${transInRes.status}`);
      const { translated_text: englishInput } = await transInRes.json();

      // Show user their message was understood
      console.log("[odia] english input to llama:", englishInput);

      // Step 2+3 combined: Ollama streams English → FastAPI translates
      // each sentence → streams Odia sentences back one by one
      const res = await fetch("/chat/stream-odia", {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({
          model: "llama3",
          prompt: `System: You are a helpful healthcare assistant. Give clear, concise responses in 2-4 sentences. User: ${englishInput}`,
        }),
      });

      if (!res.ok) throw new Error(`Stream-odia failed: ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value);
        const lines = text.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const data = JSON.parse(line.slice(6));

            if (data.done) break;

            if (data.sentence) {
              // Append each Odia sentence as it arrives
              accumulated += (accumulated ? " " : "") + data.sentence;
              setChatMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  type: "bot",
                  message: accumulated,
                };
                return updated;
              });
            }
          } catch {
            continue;
          }
        }
      }

    } else {
      // ── ENGLISH PATH ─────────────────────────────────────────────────────
      // Stream raw tokens from Ollama, display word by word

      const res = await fetch("/chat/stream", {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({
          model: "llama3",
          prompt: `System: You are a helpful healthcare assistant. Give clear, concise responses. User: ${usrmsg}`,
        }),
      });

      if (!res.ok) throw new Error(`Stream failed: ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value);
        const lines = text.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const data = JSON.parse(line.slice(6));

            if (data.done) break;

            if (data.token) {
              accumulated += data.token;
              setChatMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  type: "bot",
                  message: accumulated,
                };
                return updated;
              });
            }
          } catch {
            continue;
          }
        }
      }
    }

  } catch (err) {
    console.error("handleSendMessage error:", err);
    setChatMessages((prev) => {
      const updated = [...prev];
      updated[updated.length - 1] = {
        type: "bot",
        message: "Sorry, something went wrong. Please try again.",
      };
      return updated;
    });
  }
};


  //=================================================================================================================================

/*const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    
    const usrmsg = chatInput;
    setChatMessages([...chatMessages, { type: 'user', message: usrmsg }]);
    setChatInput('');
    setChatMessages(prev => [...prev, { type: 'bot', message: 'thinking..' }]);

    try {
        let finalBotResponse = "";

        if (language === 'odia') {
            // === ODIA PATH ===
            
            // 1. Translate Odia User Msg -> English
            const transInRes = await fetch('http://127.0.0.1:8000/translate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: usrmsg, direction: 'to_en' })
            });
            const transInData = await transInRes.json();
            const englishInput = transInData.translated_text;

            // 2. Call Ollama with English Input
            const ollamaRes = await fetch('/api/ollama/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'llama3',
                    prompt: `System: You are a helpful healthcare assistant. User: ${englishInput}`,
                    stream: false
                })
            });
            const ollamaData = await ollamaRes.json();
            const englishResponse = ollamaData.response;

            // 3. Translate English Response -> Odia
            const transOutRes = await fetch('http://127.0.0.1:8000/translate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: englishResponse, direction: 'to_or' })
            });
            const transOutData = await transOutRes.json();
            finalBotResponse = transOutData.translated_text;

        } else {
            // === ENGLISH PATH (Standard flow) ===
            
            const response = await fetch('/api/ollama/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'llama3',
                    prompt: `System: You are a helpful healthcare assistant. User: ${usrmsg}`,
                    stream: false
                })
            });
            const data = await response.json();
            finalBotResponse = data.response;
        }

        // === UPDATE UI (Works for both languages) ===
        setChatMessages(prev => {
            const newmsg = [...prev];
            newmsg[newmsg.length - 1] = { ...newmsg[newmsg.length - 1], message: finalBotResponse };
            return newmsg;
        });

    } catch (error) {
        console.error("Chat Error:", error);
        setChatMessages(prev => {
            const upmsg = [...prev];
            upmsg[upmsg.length - 1] = { ...upmsg[upmsg.length - 1], message: "Sorry, I'm having trouble connecting." };
            return upmsg;
        });
    }
};*/
//======================================================================================================================================================
    
      
      
      
      
      /*{
      setChatMessages([...chatMessages, { type: 'user', message: chatInput }]);
      setTimeout(() => {
        setChatMessages(prev => [...prev, {
          type: 'bot',
          message: 'I understand your concern. Let me help you with that. For accurate diagnosis and treatment, I recommend scheduling a video consultation with one of our specialists.'
        }]);
      }, 1000);
      setChatInput('');
    }*/
  

  // Component Functions
  function HomePage() {
    return (
      <div className={theme.bg}>
        {/* Hero Section */}
        <div className={`relative ${theme.bg} overflow-hidden`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center space-y-8">
              <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-bold ${theme.text} animate-fade-in-up`}>
                {t.healthcareSimple}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
                {t.connectDoctors}
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative animate-fade-in-up animation-delay-400">
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  className="w-full px-6 py-4 rounded-full border-2 border-gray-200 focus:border-orange-500 focus:outline-none pl-14 shadow-lg"
                />
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              </div>

              {/* Quick Action Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                {[
                  { icon: Users, title: t.findDoctors, subtitle: t.nearbySpecialists, action: () => setCurrentPage('doctors'), gradient: theme.doctors, bgLight: theme.doctorsLight },
                  { icon: Video, title: t.consultOnline, subtitle: t.videoAudio, action: () => setCurrentPage('services'), gradient: theme.consult, bgLight: theme.consultLight },
                  { icon: Pill, title: t.medicines, subtitle: t.homeDelivery, action: () => setCurrentPage('services'), gradient: theme.medicines, bgLight: theme.medicinesLight },
                  { icon: Car, title: t.emergencyService, subtitle: t.ambulance, action: () => setCurrentPage('emergency'), gradient: theme.emergency, bgLight: theme.emergencyLight }
                ].map((card, index) => (
                  <button
                    key={index}
                    onClick={card.action}
                    className={`${card.bgLight} p-6 rounded-2xl hover:shadow-xl transition-all hover:scale-105 text-left group animate-fade-in-up`}
                    style={{ animationDelay: `${(index + 2) * 100}ms` }}
                  >
                    <div className={`w-14 h-14 bg-gradient-to-br ${card.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform`}>
                      <card.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className={`font-bold text-lg ${theme.text} mb-1`}>{card.title}</h3>
                    <p className="text-sm text-gray-600">{card.subtitle}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Featured Doctors */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className={`text-3xl font-bold ${theme.text}`}>{language === 'odia' ? 'ବୈଶିଷ୍ଟ୍ୟ ଡାକ୍ତର' : 'Featured Doctors'}</h2>
              <p className="text-gray-600 mt-2">{language === 'odia' ? 'ଆମର ସର୍ବୋତ୍ତମ ଚିକିତ୍ସା ପ୍ରଫେସନାଲ୍ସ' : 'Our best medical professionals'}</p>
            </div>
            <button
              onClick={() => setCurrentPage('doctors')}
              className={`px-6 py-3 bg-gradient-to-r ${theme.primary} text-white rounded-full hover:shadow-lg transition-all flex items-center space-x-2`}
            >
              <span>{language === 'odia' ? 'ସମସ୍ତ ଦେଖନ୍ତୁ' : 'View All'}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.slice(0, 3).map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group">
                <div className={`h-2 bg-gradient-to-r ${theme.primary}`} />
                <div className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <img src={doctor.image} alt={doctor.name} className="w-20 h-20 rounded-full object-cover ring-4 ring-white shadow-lg" />
                    <div className="flex-1">
                      <h3 className={`font-bold text-lg ${theme.text} group-hover:text-orange-600 transition-colors`}>{doctor.name}</h3>
                      <p className="text-gray-600 text-sm">{doctor.specialty}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-semibold">{doctor.rating}</span>
                        <span className="text-sm text-gray-500">• {doctor.experience}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{doctor.nextAvailable}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{doctor.hospital}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedDoctor(doctor);
                      setCurrentPage('doctors');
                    }}
                    className={`w-full py-3 bg-gradient-to-r ${theme.primary} text-white rounded-xl font-semibold hover:shadow-lg transition-all`}
                  >
                    {language === 'odia' ? 'ବୁକ୍ କରନ୍ତୁ' : 'Book Appointment'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Health Services Section */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className={`text-3xl font-bold ${theme.text} mb-4`}>{language === 'odia' ? 'ଆମର ସେବା' : 'Our Services'}</h2>
              <p className="text-gray-600">{language === 'odia' ? 'ସମ୍ପୂର୍ଣ୍ଣ ସ୍ବାସ୍ଥ୍ୟସେବା ସମାଧାନ' : 'Comprehensive healthcare solutions'}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {healthServices.map((service, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-xl transition-all text-center">
                    <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className={`font-bold text-lg ${theme.text} mb-2`}>{service.title}</h3>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`${theme.bg} py-16`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { number: '50K+', label: language === 'odia' ? 'ସନ୍ତୁଷ୍ଟ ରୋଗୀ' : 'Happy Patients' },
                { number: '500+', label: language === 'odia' ? 'ବିଶେଷଜ୍ଞ ଡାକ୍ତର' : 'Expert Doctors' },
                { number: '24/7', label: language === 'odia' ? 'ସେବା ଉପଲବ୍ଧ' : 'Service Available' },
                { number: '100+', label: language === 'odia' ? 'ଆଇସିୟୁ ଶଯ୍ୟା' : 'ICU Beds' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`text-4xl font-bold bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent mb-2`}>
                    {stat.number}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  function DoctorsPage() {
    return (
      <div className={`min-h-screen ${theme.bg} py-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className={`text-4xl font-bold ${theme.text} mb-2`}>{language === 'odia' ? 'ବିଶେଷଜ୍ଞ ଡାକ୍ତର ଖୋଜନ୍ତୁ' : 'Find Expert Doctors'}</h1>
            <p className="text-gray-600">{language === 'odia' ? 'ଆମର ଯୋଗ୍ୟ ଡାକ୍ତରଙ୍କ ସହ ପରାମର୍ଶ କରନ୍ତୁ' : 'Book appointments with our qualified doctors'}</p>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={language === 'odia' ? 'ଡାକ୍ତର ନାମ କିମ୍ବା ବିଶେଷଜ୍ଞତା ଖୋଜନ୍ତୁ' : 'Search by doctor name or specialty'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="all">{language === 'odia' ? 'ସମସ୍ତ ବିଶେଷଜ୍ଞତା' : 'All Specialties'}</option>
                  <option value="Cardiologist">{language === 'odia' ? 'ହୃଦ୍‌ରୋଗ ବିଶେଷଜ୍ଞ' : 'Cardiologist'}</option>
                  <option value="Pediatrician">{language === 'odia' ? 'ଶିଶୁ ଚିକିତ୍ସକ' : 'Pediatrician'}</option>
                  <option value="Dermatologist">{language === 'odia' ? 'ଚର୍ମ ବିଶେଷଜ୍ଞ' : 'Dermatologist'}</option>
                  <option value="Orthopedic">{language === 'odia' ? 'ଅସ୍ଥି ବିଶେଷଜ୍ଞ' : 'Orthopedic'}</option>
                  <option value="Gynecologist">{language === 'odia' ? 'ସ୍ତ୍ରୀରୋଗ ବିଶେଷଜ୍ଞ' : 'Gynecologist'}</option>
                  <option value="General Physician">{language === 'odia' ? 'ସାଧାରଣ ଚିକିତ୍ସକ' : 'General Physician'}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Doctors Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
                <div className={`h-2 bg-gradient-to-r ${theme.primary}`} />
                <div className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <img src={doctor.image} alt={doctor.name} className="w-20 h-20 rounded-full object-cover ring-4 ring-white shadow-lg" />
                    <div className="flex-1">
                      <h3 className={`font-bold text-lg ${theme.text}`}>{doctor.name}</h3>
                      <p className="text-gray-600 text-sm">{doctor.specialty}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-semibold">{doctor.rating}</span>
                        <span className="text-sm text-gray-500">• {doctor.experience}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4 text-sm">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{doctor.hospital}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{language === 'odia' ? 'ପରବର୍ତ୍ତୀ ଉପଲବ୍ଧ' : 'Next Available'}: {doctor.nextAvailable}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <DollarSign className="w-4 h-4" />
                      <span>{language === 'odia' ? 'ପରାମର୍ଶ ଶୁଳ୍କ' : 'Consultation'}: {doctor.consultationFee}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedDoctor(doctor)}
                    className={`w-full py-3 bg-gradient-to-r ${theme.primary} text-white rounded-xl font-semibold hover:shadow-lg transition-all`}
                  >
                    {language === 'odia' ? 'ବୁକ୍ କରନ୍ତୁ' : 'Book Appointment'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Modal */}
        {selectedDoctor && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className={`bg-gradient-to-r ${theme.primary} p-6 text-white sticky top-0`}>
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-4">
                    <img src={selectedDoctor.image} alt={selectedDoctor.name} className="w-16 h-16 rounded-full ring-4 ring-white/30" />
                    <div>
                      <h2 className="text-2xl font-bold">{selectedDoctor.name}</h2>
                      <p className="opacity-90">{selectedDoctor.specialty} • {selectedDoctor.experience}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Star className="w-4 h-4 fill-white" />
                        <span className="font-semibold">{selectedDoctor.rating}</span>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setSelectedDoctor(null)} className="text-white/80 hover:text-white">
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Doctor Details */}
                <div className="space-y-4 mb-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <div className="text-sm text-gray-600 mb-1">{language === 'odia' ? 'ଶିକ୍ଷା' : 'Education'}</div>
                      <div className="font-semibold">{selectedDoctor.education}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <div className="text-sm text-gray-600 mb-1">{language === 'odia' ? 'ଭାଷା' : 'Languages'}</div>
                      <div className="font-semibold">{selectedDoctor.languages}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <div className="text-sm text-gray-600 mb-1">{language === 'odia' ? 'ହସ୍ପିଟାଲ' : 'Hospital'}</div>
                      <div className="font-semibold">{selectedDoctor.hospital}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <div className="text-sm text-gray-600 mb-1">{language === 'odia' ? 'ଉପଲବ୍ଧତା' : 'Availability'}</div>
                      <div className="font-semibold">{selectedDoctor.availability}</div>
                    </div>
                  </div>
                </div>

                {/* Booking Steps */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-6">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                          bookingStep >= step ? `bg-gradient-to-r ${theme.primary} text-white` : 'bg-gray-200 text-gray-500'
                        }`}>
                          {step}
                        </div>
                        {step < 3 && <div className={`h-1 w-20 ${bookingStep > step ? `bg-gradient-to-r ${theme.primary}` : 'bg-gray-200'}`} />}
                      </div>
                    ))}
                  </div>

                  {bookingStep === 1 && (
                    <div className="space-y-4">
                      <h3 className="font-bold text-lg">{language === 'odia' ? 'ପ୍ରକାର ଚୟନ କରନ୍ତୁ' : 'Choose Consultation Type'}</h3>
                      {[
                        { type: 'video', title: language === 'odia' ? 'ଭିଡିଓ କନସଲଟେସନ' : 'Video Consultation', price: selectedDoctor.consultationFee, icon: Video },
                        { type: 'clinic', title: language === 'odia' ? 'କ୍ଲିନିକ ଭିଜିଟ' : 'Clinic Visit', price: selectedDoctor.consultationFee, icon: MapPin }
                      ].map((option) => (
                        <button key={option.type} className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-orange-500 transition-all text-left flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-12 h-12 bg-gradient-to-br ${theme.consult} rounded-xl flex items-center justify-center`}>
                              <option.icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold">{option.title}</div>
                              <div className="text-sm text-gray-600">{option.price}</div>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </button>
                      ))}
                      <button
                        onClick={() => setBookingStep(2)}
                        className={`w-full py-3 bg-gradient-to-r ${theme.primary} text-white rounded-xl font-semibold hover:shadow-lg transition-all`}
                      >
                        {language === 'odia' ? 'ଆଗକୁ' : 'Continue'}
                      </button>
                    </div>
                  )}

                  {bookingStep === 2 && (
                    <div className="space-y-4">
                      <h3 className="font-bold text-lg">{language === 'odia' ? 'ତାରିଖ ଓ ସମୟ' : 'Select Date & Time'}</h3>
                      <div className="grid grid-cols-3 gap-3">
                        {['Today', 'Tomorrow', 'Feb 18'].map((date) => (
                          <button key={date} className="p-3 border-2 border-gray-200 rounded-xl hover:border-orange-500 transition-all">
                            <div className="font-semibold text-sm">{date}</div>
                          </button>
                        ))}
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {['10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'].map((time) => (
                          <button key={time} className="p-3 border-2 border-gray-200 rounded-xl hover:border-orange-500 transition-all text-sm font-semibold">
                            {time}
                          </button>
                        ))}
                      </div>
                      <div className="flex space-x-3">
                        <button onClick={() => setBookingStep(1)} className="flex-1 py-3 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50">
                          {language === 'odia' ? 'ପଛକୁ' : 'Back'}
                        </button>
                        <button
                          onClick={() => setBookingStep(3)}
                          className={`flex-1 py-3 bg-gradient-to-r ${theme.primary} text-white rounded-xl font-semibold hover:shadow-lg transition-all`}
                        >
                          {language === 'odia' ? 'ଆଗକୁ' : 'Continue'}
                        </button>
                      </div>
                    </div>
                  )}

                  {bookingStep === 3 && (
                    <div className="space-y-4">
                      <h3 className="font-bold text-lg">{language === 'odia' ? 'ନିଶ୍ଚିତ କରନ୍ତୁ' : 'Confirm Booking'}</h3>
                      <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">{language === 'odia' ? 'ଡାକ୍ତର' : 'Doctor'}</span>
                          <span className="font-semibold">{selectedDoctor.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{language === 'odia' ? 'ପ୍ରକାର' : 'Type'}</span>
                          <span className="font-semibold">{language === 'odia' ? 'ଭିଡିଓ କନସଲଟେସନ' : 'Video Consultation'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{language === 'odia' ? 'ତାରିଖ ଓ ସମୟ' : 'Date & Time'}</span>
                          <span className="font-semibold">Tomorrow, 10:00 AM</span>
                        </div>
                        <div className="border-t border-gray-200 pt-3 flex justify-between">
                          <span className="font-bold">{language === 'odia' ? 'ମୋଟ' : 'Total'}</span>
                          <span className="font-bold text-xl">{selectedDoctor.consultationFee}</span>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <button onClick={() => setBookingStep(2)} className="flex-1 py-3 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50">
                          {language === 'odia' ? 'ପଛକୁ' : 'Back'}
                        </button>
                        <button
                          onClick={() => {
                            setSelectedDoctor(null);
                            setBookingStep(1);
                            alert(language === 'odia' ? 'ବୁକିଂ ସଫଳ!' : 'Booking Confirmed!');
                          }}
                          className={`flex-1 py-3 bg-gradient-to-r ${theme.primary} text-white rounded-xl font-semibold hover:shadow-lg transition-all`}
                        >
                          {language === 'odia' ? 'ପେମେଣ୍ଟ କରନ୍ତୁ' : 'Proceed to Payment'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  function ServicesPage() {
    return (
      <div className={`min-h-screen ${theme.bg} py-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className={`text-4xl font-bold ${theme.text} mb-2`}>{language === 'odia' ? 'ଆମର ସେବା' : 'Our Services'}</h1>
            <p className="text-gray-600">{language === 'odia' ? 'ବ୍ୟାପକ ସ୍ବାସ୍ଥ୍ୟସେବା ସମାଧାନ' : 'Comprehensive healthcare solutions for your needs'}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Video,
                title: language === 'odia' ? 'ଅନଲାଇନ୍ ପରାମର୍ଶ' : 'Online Consultation',
                description: language === 'odia' ? 'ଯେକୌଣସି ସ୍ଥାନରୁ ଡାକ୍ତରଙ୍କ ସହ ଭିଡିଓ କଲ କରନ୍ତୁ' : 'Connect with doctors via video call from anywhere',
                features: [
                  language === 'odia' ? 'ଅର୍ହ ଡାକ୍ତର' : 'Qualified doctors',
                  language === 'odia' ? 'ତୁରନ୍ତ ପରାମର୍ଶ' : 'Instant consultation',
                  language === 'odia' ? 'ଡିଜିଟାଲ ପ୍ରେସକ୍ରିପସନ' : 'Digital prescription'
                ],
                gradient: theme.consult,
                bgLight: theme.consultLight
              },
              {
                icon: Pill,
                title: language === 'odia' ? 'ଔଷଧ ବିତରଣ' : 'Medicine Delivery',
                description: language === 'odia' ? 'ଆପଣଙ୍କ ଦ୍ୱାରରେ ଔଷଧ ପାଆନ୍ତୁ' : 'Get medicines delivered to your doorstep',
                features: [
                  language === 'odia' ? 'ଦ୍ରୁତ ବିତରଣ' : 'Fast delivery',
                  language === 'odia' ? 'ପ୍ରାମାଣିକ ଔଷଧ' : 'Genuine medicines',
                  language === 'odia' ? 'ସହଜ ପୁନଃଅର୍ଡର' : 'Easy reorder'
                ],
                gradient: theme.medicines,
                bgLight: theme.medicinesLight
              },
              {
                icon: Activity,
                title: language === 'odia' ? 'ସ୍ବାସ୍ଥ୍ୟ ଯାଞ୍ଚ' : 'Health Checkup',
                description: language === 'odia' ? 'ବିସ୍ତୃତ ସ୍ବାସ୍ଥ୍ୟ ପ୍ୟାକେଜ୍ ବୁକ୍ କରନ୍ତୁ' : 'Book comprehensive health checkup packages',
                features: [
                  language === 'odia' ? 'ସମ୍ପୂର୍ଣ୍ଣ ବଡି ଯାଞ୍ଚ' : 'Full body checkup',
                  language === 'odia' ? 'ଘରେ ସଂଗ୍ରହ' : 'Home collection',
                  language === 'odia' ? 'ଅନଲାଇନ୍ ରିପୋର୍ଟ' : 'Online reports'
                ],
                gradient: theme.doctors,
                bgLight: theme.doctorsLight
              },
              {
                icon: Car,
                title: language === 'odia' ? 'ଆମ୍ବୁଲାନ୍ସ ସେବା' : 'Ambulance Service',
                description: language === 'odia' ? '24/7 ଜରୁରୀକାଳୀନ ଆମ୍ବୁଲାନ୍ସ' : '24/7 emergency ambulance service',
                features: [
                  language === 'odia' ? 'ଦ୍ରୁତ ପ୍ରତିକ୍ରିୟା' : 'Quick response',
                  language === 'odia' ? 'ଆଧୁନିକ ଯନ୍ତ୍ରପାତି' : 'Modern equipment',
                  language === 'odia' ? 'ପ୍ରଶିକ୍ଷିତ ପାରାମେଡିକ୍' : 'Trained paramedics'
                ],
                gradient: theme.emergency,
                bgLight: theme.emergencyLight
              }
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
                <div className={`h-2 bg-gradient-to-r ${service.gradient}`} />
                <div className="p-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className={`text-2xl font-bold ${theme.text} mb-3`}>{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center space-x-3">
                        <div className={`w-6 h-6 bg-gradient-to-br ${service.gradient} rounded-full flex items-center justify-center flex-shrink-0`}>
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 bg-gradient-to-r ${service.gradient} text-white rounded-xl font-semibold hover:shadow-lg transition-all`}>
                    {language === 'odia' ? 'ଆରମ୍ଭ କରନ୍ତୁ' : 'Get Started'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function HealthTrackingPage() {
    return (
      <div className={`min-h-screen ${theme.bg} py-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className={`text-4xl font-bold ${theme.text} mb-2`}>{language === 'odia' ? 'ସ୍ବାସ୍ଥ୍ୟ ଟ୍ରାକିଂ' : 'Health Tracking'}</h1>
            <p className="text-gray-600">{language === 'odia' ? 'ଆପଣଙ୍କ ସ୍ବାସ୍ଥ୍ୟ ମେଟ୍ରିକ୍ସ ମନିଟର କରନ୍ତୁ' : 'Monitor your health metrics and wellness'}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: language === 'odia' ? 'ହୃଦସ୍ପନ୍ଦନ' : 'Heart Rate', value: '72 bpm', icon: Heart, color: theme.emergency, status: language === 'odia' ? 'ସାମାନ୍ୟ' : 'Normal' },
              { label: language === 'odia' ? 'ରକ୍ତଚାପ' : 'Blood Pressure', value: '120/80', icon: Activity, color: theme.doctors, status: language === 'odia' ? 'ସାମାନ୍ୟ' : 'Normal' },
              { label: language === 'odia' ? 'ଓଜନ' : 'Weight', value: '70 kg', icon: TrendingUp, color: theme.consult, status: language === 'odia' ? 'ଲକ୍ଷ୍ୟରେ' : 'On Track' },
              { label: language === 'odia' ? 'ପଦକ୍ଷେପ' : 'Steps', value: '8,432', icon: Activity, color: theme.medicines, status: language === 'odia' ? 'ସକ୍ରିୟ' : 'Active' }
            ].map((metric, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${metric.color} rounded-xl flex items-center justify-center`}>
                    <metric.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`text-xs px-3 py-1 ${metric.color === theme.emergency ? theme.emergencyLight : metric.color === theme.doctors ? theme.doctorsLight : metric.color === theme.consult ? theme.consultLight : theme.medicinesLight} rounded-full font-semibold`}>
                    {metric.status}
                  </span>
                </div>
                <div className="text-3xl font-bold mb-1">{metric.value}</div>
                <div className="text-gray-600 text-sm">{metric.label}</div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className={`text-2xl font-bold ${theme.text} mb-6`}>{language === 'odia' ? 'ସାମ୍ପ୍ରତିକ ଗତିବିଧି' : 'Recent Activity'}</h2>
            <div className="space-y-4">
              {[
                { date: '2026-02-15', activity: language === 'odia' ? 'ରକ୍ତ ପରୀକ୍ଷା ସମ୍ପୂର୍ଣ୍ଣ' : 'Blood test completed', status: language === 'odia' ? 'ସମ୍ପୂର୍ଣ୍ଣ' : 'Completed', icon: CheckCircle, color: 'text-green-600' },
                { date: '2026-02-10', activity: language === 'odia' ? 'ECG ରିପୋର୍ଟ ଉପଲବ୍ଧ' : 'ECG report available', status: language === 'odia' ? 'ଦେଖନ୍ତୁ' : 'View', icon: FileText, color: 'text-blue-600' },
                { date: '2026-02-05', activity: language === 'odia' ? 'ଡାକ୍ତର ପରାମର୍ଶ' : 'Doctor consultation', status: language === 'odia' ? 'ସମ୍ପୂର୍ଣ୍ଣ' : 'Completed', icon: CheckCircle, color: 'text-green-600' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
                  <div className="flex items-center space-x-4">
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                    <div>
                      <div className={`font-semibold ${theme.text}`}>{item.activity}</div>
                      <div className="text-sm text-gray-600">{item.date}</div>
                    </div>
                  </div>
                  <button className={`px-4 py-2 bg-gradient-to-r ${theme.primary} text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all`}>
                    {item.status}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  function ICUAvailabilityPage() {
    return (
      <div className={`min-h-screen ${theme.bg} py-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className={`text-4xl font-bold ${theme.text} mb-2`}>{language === 'odia' ? 'ICU ଉପଲବ୍ଧତା' : 'ICU Bed Availability'}</h1>
            <p className="text-gray-600">{language === 'odia' ? 'ନିକଟସ୍ଥ ହସ୍ପିଟାଲରେ ରିଅଲ-ଟାଇମ୍ ICU ଶଯ୍ୟା ସ୍ଥିତି' : 'Real-time ICU bed status in nearby hospitals'}</p>
          </div>

          <div className={`${theme.icuBg} rounded-2xl p-6 mb-8`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${theme.emergency} rounded-xl flex items-center justify-center`}>
                  <Bed className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className={`text-2xl font-bold ${theme.text}`}>{language === 'odia' ? 'ସିଧାସଳଖ ଅଦ୍ୟତନ' : 'Live Updates'}</h2>
                  <p className="text-sm text-gray-600">{language === 'odia' ? 'ପ୍ରତି 5 ମିନିଟରେ ରିଫ୍ରେସ୍' : 'Refreshed every 5 minutes'}</p>
                </div>
              </div>
              <button className={`px-6 py-3 bg-gradient-to-r ${theme.primary} text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center space-x-2`}>
                <MapPin className="w-5 h-5" />
                <span>{language === 'odia' ? 'ନିକଟବର୍ତ୍ତୀ ଖୋଜନ୍ତୁ' : 'Find Nearest'}</span>
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {[
                { label: language === 'odia' ? 'ମୋଟ ହସ୍ପିଟାଲ' : 'Total Hospitals', value: icuData.length, icon: Building2 },
                { label: language === 'odia' ? 'ଉପଲବ୍ଧ ଶଯ୍ୟା' : 'Available Beds', value: icuData.reduce((sum, h) => sum + h.available, 0), icon: Bed },
                { label: language === 'odia' ? 'ମୋଟ କ୍ଷମତା' : 'Total Capacity', value: icuData.reduce((sum, h) => sum + h.total, 0), icon: Activity }
              ].map((stat, index) => (
                <div key={index} className="bg-white p-4 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <stat.icon className="w-8 h-8 text-gray-600" />
                    <div>
                      <div className={`text-3xl font-bold ${theme.text}`}>{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {icuData.map((hospital, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
                <div className={`h-2 ${hospital.available > 0 ? `bg-gradient-to-r ${theme.doctors}` : `bg-gradient-to-r ${theme.emergency}`}`} />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className={`text-xl font-bold ${theme.text}`}>{hospital.hospital}</h3>
                        <span className={`text-xs px-2 py-1 ${hospital.type === 'Government' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'} rounded-full font-semibold`}>
                          {hospital.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{hospital.specialization}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{hospital.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{language === 'odia' ? 'ଅଦ୍ୟତନ' : 'Updated'} {hospital.lastUpdated}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-4xl font-bold ${hospital.available > 0 ? 'text-green-600' : 'text-red-600'} mb-1`}>
                        {hospital.available}
                      </div>
                      <div className="text-sm text-gray-600">{language === 'odia' ? 'ଉପଲବ୍ଧ' : 'Available'}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">{language === 'odia' ? 'ମୋଟ କ୍ଷମତା' : 'Total Capacity'}</div>
                      <div className="flex items-center space-x-2">
                        <div className="h-2 bg-gray-200 rounded-full w-32">
                          <div
                            className={`h-2 rounded-full ${hospital.available > 0 ? `bg-gradient-to-r ${theme.doctors}` : 'bg-red-500'}`}
                            style={{ width: `${(hospital.available / hospital.total) * 100}%` }}
                          />
                        </div>
                        <span className={`text-sm font-semibold ${theme.text}`}>
                          {hospital.available}/{hospital.total}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className={`px-6 py-2 bg-gradient-to-r ${theme.primary} text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center space-x-2`}>
                        <Phone className="w-4 h-4" />
                        <span>{language === 'odia' ? 'କଲ କରନ୍ତୁ' : 'Call'}</span>
                      </button>
                      <button className="px-6 py-2 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-all flex items-center space-x-2">
                        <Navigation className="w-4 h-4" />
                        <span>{language === 'odia' ? 'ଦିଗ' : 'Directions'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function EmergencyPage({ submitted, setSubmitted, emergencyData, setEmergencyData }) {
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    location: '',
    emergencyType: '',
    description: '',
    bloodGroup: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmergencyData(formData);
    setSubmitted(true);
  };


  const hospitalInfo = emergencyData?.nearestHospital || {
  name: "City General Hospital",
  location: "Sector 5, Bhubaneswar",
  distance: "2.5 km"
};

  if (submitted && emergencyData) {
    return (
      <div className={`min-h-screen ${theme.bg} py-8`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`${theme.emergencyLight} rounded-3xl p-8 mb-8`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${theme.emergency} rounded-2xl flex items-center justify-center animate-pulse`}>
                  <AlertTriangle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className={`text-3xl font-bold ${theme.text}`}>{language === 'odia' ? 'ଜରୁରୀକାଳୀନ ସକ୍ରିୟ' : 'Emergency Active'}</h1>
                  <p className="text-gray-600">{language === 'odia' ? 'ସାହାଯ୍ୟ ଆସୁଛି' : 'Help is on the way'}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setEmergencyData(null);
                }}
                className="text-gray-600 hover:text-gray-900"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-6 rounded-2xl">
                <h3 className={`font-bold ${theme.text} mb-4`}>{language === 'odia' ? 'ରୋଗୀ ସୂଚନା' : 'Patient Information'}</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{language === 'odia' ? 'ନାମ' : 'Name'}:</span>
                    <span className="font-semibold">{emergencyData.patientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{language === 'odia' ? 'ଫୋନ୍' : 'Phone'}:</span>
                    <span className="font-semibold">{emergencyData.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{language === 'odia' ? 'ରକ୍ତ ଗ୍ରୁପ' : 'Blood Group'}:</span>
                    <span className="font-semibold">{emergencyData.bloodGroup || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{language === 'odia' ? 'ପ୍ରକାର' : 'Type'}:</span>
                    <span className="font-semibold">{emergencyData.emergencyType}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl">
                <h3 className={`font-bold ${theme.text} mb-4`}>{language === 'odia' ? 'ଆମ୍ବୁଲାନ୍ସ ସ୍ଥିତି' : 'Ambulance Status'}</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${theme.emergency} rounded-xl flex items-center justify-center`}>
                      <Ambulance className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">OD-05 AB 1234</div>
                      <div className="text-sm text-gray-600">{language === 'odia' ? 'ଆସୁଛି' : 'En Route'}</div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-xl">
                    <div className="text-sm text-gray-600 mb-1">{language === 'odia' ? 'ଆନୁମାନିକ ସମୟ' : 'Estimated Time'}</div>
                    <div className={`text-2xl font-bold ${theme.text}`}>8 - 12{language === 'odia' ? 'ମିନିଟ୍' : 'minutes'}</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
  <h3 className="text-xl font-bold text-gray-900 mb-4">
    {language === 'odia' ? 'ଲାଇଭ୍ ଆମ୍ବୁଲାନ୍ସ ଟ୍ରାକିଂ' : 'Live Ambulance Tracking'}
  </h3>
  <div className="bg-slate-100 rounded-3xl p-8 border-2 border-slate-200 relative overflow-hidden h-[300px] flex items-center justify-center">
    
    {/* 1. Map Grid Effect */}
    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
    
    {/* 2. Animated Route Line */}
    <div className="absolute w-[60%] h-1 bg-slate-300 top-1/2 left-[20%] -translate-y-1/2 rounded-full">
      <div className="h-full bg-red-500 animate-pulse" style={{ width: '45%' }}></div>
    </div>

    <div className="relative flex items-center justify-between w-full max-w-lg z-10">
      {/* 3. Your Location */}
      <div className="text-center">
        <div className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center mb-2 border-2 border-red-500 animate-pulse">
          <MapPin className="w-7 h-7 text-red-600" />
        </div>
        <p className="text-[10px] font-bold text-slate-500 uppercase">{language === 'odia' ? 'ଆପଣଙ୍କ ସ୍ଥାନ' : 'Your Location'}</p>
      </div>

      {/* 4. The Moving Ambulance */}
      <div className="absolute left-[35%] -mt-12 animate-bounce">
        <div className="bg-red-600 p-2 rounded-lg shadow-xl">
          <Ambulance className="w-6 h-6 text-white" />
        </div>
        <div className="w-2 h-2 bg-red-600/30 rounded-full blur-sm mx-auto mt-1"></div>
      </div>

      {/* 5. Destination Hospital */}
      <div className="text-center">
        <div className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center mb-2 border-2 border-green-500">
          <Building2 className="w-7 h-7 text-green-600" />
        </div>
        <p className="text-[10px] font-bold text-slate-500 uppercase">{hospitalInfo.name}</p>
      </div>
    </div>

    {/* 6. Tracking Badge */}
    <div className="absolute bottom-6 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-sm border border-slate-200 flex items-center space-x-2">
      <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
      <span className="text-xs font-bold text-slate-700">
        {language === 'odia' ? 'ଆମ୍ବୁଲାନ୍ସ ୨.୫ କିମି ଦୂରରେ ଅଛି' : 'Ambulance is 2.5 km away'}
      </span>
    </div>

  </div>
</div>

            <div className={`bg-white border-2 ${theme.emergency.includes('red') ? 'border-red-200' : 'border-orange-200'} p-6 rounded-2xl`}>
              <h3 className={`font-bold ${theme.text} mb-4`}>{language === 'odia' ? 'ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ନମ୍ବର' : 'Important Numbers'}</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { label: language === 'odia' ? 'ଆମ୍ବୁଲାନ୍ସ ଡ୍ରାଇଭର' : 'Ambulance Driver', number: '+91 98765-43210' },
                  { label: language === 'odia' ? 'ହସ୍ପିଟାଲ ଜରୁରୀକାଳୀନ' : 'Hospital Emergency', number: '108' },
                  { label: language === 'odia' ? 'ପୋଲିସ୍' : 'Police', number: '100' }
                ].map((contact, index) => (
                  <a
                    key={index}
                    href={`tel:${contact.number}`}
                    className={`flex items-center justify-between p-4 bg-gradient-to-r ${theme.emergency} text-white rounded-xl hover:shadow-lg transition-all`}
                  >
                    <div>
                      <div className="text-sm opacity-90">{contact.label}</div>
                      <div className="font-bold text-lg">{contact.number}</div>
                    </div>
                    <Phone className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme.bg} py-8`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`${theme.emergencyLight} rounded-3xl p-8 mb-8`}>
          <div className="flex items-center space-x-4 mb-6">
            <div className={`w-16 h-16 bg-gradient-to-br ${theme.emergency} rounded-2xl flex items-center justify-center animate-pulse`}>
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className={`text-3xl font-bold ${theme.text}`}>{language === 'odia' ? 'ଜରୁରୀକାଳୀନ ସେବା' : 'Emergency Services'}</h1>
              <p className="text-gray-600">{language === 'odia' ? '24/7 ଉପଲବ୍ଧ' : 'Available 24/7'}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[
              { number: '108', label: language === 'odia' ? 'ଆମ୍ବୁଲାନ୍ସ' : 'Ambulance' },
              { number: '102', label: language === 'odia' ? 'ବିପଦମୁକ୍ତ ମାତୃତ୍ୱ' : 'Free Maternity' },
              { number: '104', label: language === 'odia' ? 'ଜାତୀୟ ସ୍ୱାସ୍ଥ୍ୟ' : 'National Health' }
            ].map((emergency, index) => (
              <a
                key={index}
                href={`tel:${emergency.number}`}
                className={`bg-gradient-to-r ${theme.emergency} p-6 rounded-2xl text-white hover:shadow-2xl transition-all text-center`}
              >
                <div className="text-4xl font-bold mb-2">{emergency.number}</div>
                <div className="text-sm opacity-90">{emergency.label}</div>
              </a>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h2 className={`text-2xl font-bold ${theme.text} mb-6`}>{language === 'odia' ? 'ଜରୁରୀକାଳୀନ ଅନୁରୋଧ' : 'Request Emergency'}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-semibold ${theme.text} mb-2`}>
                  {language === 'odia' ? 'ରୋଗୀ ନାମ' : 'Patient Name'} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                  placeholder={language === 'odia' ? 'ପୂର୍ଣ୍ଣ ନାମ ଲେଖନ୍ତୁ' : 'Enter full name'}
                />
              </div>
              <div>
                <label className={`block text-sm font-semibold ${theme.text} mb-2`}>
                  {language === 'odia' ? 'ଫୋନ୍ ନମ୍ବର' : 'Phone Number'} *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                  placeholder="+91 XXXXX-XXXXX"
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-semibold ${theme.text} mb-2`}>
                {language === 'odia' ? 'ସ୍ଥାନ' : 'Location'} *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                  placeholder={language === 'odia' ? 'ଆପଣଙ୍କ ସ୍ଥାନ ଲେଖନ୍ତୁ' : 'Enter your location'}
                />
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-semibold ${theme.text} mb-2`}>
                  {language === 'odia' ? 'ଜରୁରୀକାଳୀନ ପ୍ରକାର' : 'Emergency Type'} *
                </label>
                <select
                  required
                  value={formData.emergencyType}
                  onChange={(e) => setFormData({ ...formData, emergencyType: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                >
                  <option value="">{language === 'odia' ? 'ଚୟନ କରନ୍ତୁ' : 'Select type'}</option>
                  <option value="accident">{language === 'odia' ? 'ଦୁର୍ଘଟଣା' : 'Accident'}</option>
                  <option value="cardiac">{language === 'odia' ? 'ହୃଦ୍‌ରୋଗ' : 'Cardiac'}</option>
                  <option value="stroke">{language === 'odia' ? 'ଷ୍ଟ୍ରୋକ' : 'Stroke'}</option>
                  <option value="breathing">{language === 'odia' ? 'ଶ୍ୱାସକ୍ରିୟା' : 'Breathing Issue'}</option>
                  <option value="other">{language === 'odia' ? 'ଅନ୍ୟାନ୍ୟ' : 'Other'}</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-semibold ${theme.text} mb-2`}>
                  {language === 'odia' ? 'ରକ୍ତ ଗ୍ରୁପ' : 'Blood Group'}
                </label>
                <select
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                >
                  <option value="">{language === 'odia' ? 'ଚୟନ କରନ୍ତୁ' : 'Select'}</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
            </div>

            <div>
              <label className={`block text-sm font-semibold ${theme.text} mb-2`}>
                {language === 'odia' ? 'ବିବରଣୀ' : 'Description'}
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="4"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none resize-none"
                placeholder={language === 'odia' ? 'ଜରୁରୀକାଳୀନ ବିଷୟରେ ବିସ୍ତୃତ ବିବରଣୀ ଦିଅନ୍ତୁ' : 'Describe the emergency situation'}
              />
            </div>

            <button
              type="submit"
              className={`w-full py-4 bg-gradient-to-r ${theme.emergency} text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all flex items-center justify-center space-x-3`}
            >
              <AlertTriangle className="w-6 h-6" />
              <span>{language === 'odia' ? 'ଆମ୍ବୁଲାନ୍ସ କଲ କରନ୍ତୁ' : 'Call Ambulance Now'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

 function UserProfilePage() {
    return (
      <div className={`min-h-screen ${theme.bg} py-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className={`text-4xl font-bold ${theme.text} mb-2`}>{language === 'odia' ? 'ମୋର ପ୍ରୋଫାଇଲ୍' : 'My Profile'}</h1>
            <p className="text-gray-600">{language === 'odia' ? 'ଆପଣଙ୍କ ସୂଚନା ପରିଚାଳନା କରନ୍ତୁ' : 'Manage your personal information'}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <div className="text-center mb-6">
                  <div className={`w-24 h-24 mx-auto bg-gradient-to-br ${theme.primary} rounded-full flex items-center justify-center mb-4`}>
                    <User className="w-12 h-12 text-white" />
                  </div>
                  <h2 className={`text-2xl font-bold ${theme.text} mb-1`}>{userData.name}</h2>
                  <p className="text-gray-600">{userData.bloodGroup} • {userData.age} {language === 'odia' ? 'ବର୍ଷ' : 'years'}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <Phone className="w-5 h-5 text-gray-600" />
                    <div>
                      <div className="text-xs text-gray-500">{language === 'odia' ? 'ଫୋନ୍' : 'Phone'}</div>
                      <div className={`font-semibold ${theme.text}`}>{userData.phone}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <Mail className="w-5 h-5 text-gray-600" />
                    <div>
                      <div className="text-xs text-gray-500">{language === 'odia' ? 'ଇମେଲ୍' : 'Email'}</div>
                      <div className={`font-semibold ${theme.text} text-sm`}>{userData.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <div>
                      <div className="text-xs text-gray-500">{language === 'odia' ? 'ସ୍ବାସ୍ଥ୍ୟ କାର୍ଡ' : 'Health Card'}</div>
                      <div className={`font-semibold ${theme.text} text-sm`}>{userData.healthCard}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Location Info */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className={`text-xl font-bold ${theme.text} mb-4 flex items-center space-x-2`}>
                  <MapPin className="w-6 h-6" />
                  <span>{language === 'odia' ? 'ସ୍ଥାନ ସୂଚନା' : 'Location Information'}</span>
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-sm text-gray-600 mb-1">{language === 'odia' ? 'ସ୍ଥାୟୀ ଠିକଣା' : 'Permanent Address'}</div>
                    <div className={`font-semibold ${theme.text}`}>{userData.permanentLocation}</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-sm text-gray-600 mb-1">{language === 'odia' ? 'ବର୍ତ୍ତମାନ ଠିକଣା' : 'Current Location'}</div>
                    <div className={`font-semibold ${theme.text}`}>{userData.currentLocation}</div>
                  </div>
                </div>
              </div>

              {/* Past Reports */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className={`text-xl font-bold ${theme.text} mb-4 flex items-center space-x-2`}>
                  <FileText className="w-6 h-6" />
                  <span>{language === 'odia' ? 'ପୂର୍ବ ରିପୋର୍ଟ' : 'Past Medical Reports'}</span>
                </h3>
                <div className="space-y-3">
                  {userData.pastReports.map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${theme.consult} rounded-xl flex items-center justify-center`}>
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className={`font-semibold ${theme.text}`}>{report.type}</div>
                          <div className="text-sm text-gray-600">{report.date} • {report.doctor}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-3 py-1 ${report.result === 'Normal' ? theme.doctorsLight : theme.emergencyLight} rounded-full font-semibold`}>
                          {report.result}
                        </span>
                        <button className={`px-4 py-2 bg-gradient-to-r ${theme.primary} text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all`}>
                          {language === 'odia' ? 'ଦେଖନ୍ତୁ' : 'View'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className={`text-xl font-bold ${theme.text} mb-4`}>{language === 'odia' ? 'ତ୍ୱରିତ କାର୍ଯ୍ୟ' : 'Quick Actions'}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { icon: Upload, label: language === 'odia' ? 'ରିପୋର୍ଟ ଅପଲୋଡ୍' : 'Upload Report', color: theme.consult },
                    { icon: Calendar, label: language === 'odia' ? 'ବୁକିଂ ଦେଖନ୍ତୁ' : 'View Bookings', color: theme.doctors },
                    { icon: CreditCard, label: language === 'odia' ? 'ବିଲିଂ' : 'Billing History', color: theme.medicines },
                    { icon: User, label: language === 'odia' ? 'ପ୍ରୋଫାଇଲ୍ ସମ୍ପାଦନ' : 'Edit Profile', color: theme.primary }
                  ].map((action, index) => (
                    <button
                      key={index}
                      className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-orange-500 hover:shadow-lg transition-all"
                    >
                      <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center`}>
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className={`font-semibold ${theme.text}`}>{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function HospitalProfilePage() {
    return (
      <div className={`min-h-screen ${theme.bg} py-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hospital Header */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start space-x-4">
                <div className={`w-20 h-20 bg-gradient-to-br ${theme.primary} rounded-2xl flex items-center justify-center`}>
                  <Building2 className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h1 className={`text-3xl font-bold ${theme.text} mb-2`}>{hospitalData.name}</h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className={`px-3 py-1 bg-gradient-to-r ${theme.primary} text-white rounded-full font-semibold`}>
                      {hospitalData.type}
                    </span>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{hospitalData.location.address}</span>
                    </div>
                  </div>
                </div>
              </div>
              <button className={`px-6 py-3 bg-gradient-to-r ${theme.primary} text-white rounded-xl font-semibold hover:shadow-lg transition-all`}>
                {language === 'odia' ? 'ପ୍ରୋଫାଇଲ୍ ସମ୍ପାଦନ' : 'Edit Profile'}
              </button>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className={`text-3xl font-bold bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent mb-1`}>
                  {hospitalData.totalBeds}
                </div>
                <div className="text-sm text-gray-600">{language === 'odia' ? 'ମୋଟ ଶଯ୍ୟା' : 'Total Beds'}</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className={`text-3xl font-bold bg-gradient-to-r ${theme.doctors} bg-clip-text text-transparent mb-1`}>
                  {hospitalData.availableBeds}
                </div>
                <div className="text-sm text-gray-600">{language === 'odia' ? 'ଉପଲବ୍ଧ ଶଯ୍ୟା' : 'Available Beds'}</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className={`text-3xl font-bold bg-gradient-to-r ${theme.emergency} bg-clip-text text-transparent mb-1`}>
                  {hospitalData.icuBeds}
                </div>
                <div className="text-sm text-gray-600">{language === 'odia' ? 'ICU ଶଯ୍ୟା' : 'ICU Beds'}</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className={`text-3xl font-bold bg-gradient-to-r ${theme.consult} bg-clip-text text-transparent mb-1`}>
                  {hospitalData.icuAvailable}
                </div>
                <div className="text-sm text-gray-600">{language === 'odia' ? 'ICU ଉପଲବ୍ଧ' : 'ICU Available'}</div>
              </div>
            </div>
          </div>

          {/* Hospital Details */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className={`text-2xl font-bold ${theme.text} mb-6 flex items-center space-x-2`}>
                <Phone className="w-6 h-6" />
                <span>{language === 'odia' ? 'ଯୋଗାଯୋଗ ସୂଚନା' : 'Contact Information'}</span>
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <div>
                    <div className="text-xs text-gray-500">{language === 'odia' ? 'ମୁଖ୍ୟ ଫୋନ୍' : 'Main Phone'}</div>
                    <div className={`font-semibold ${theme.text}`}>{hospitalData.contact.phone}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <div>
                    <div className="text-xs text-gray-500">{language === 'odia' ? 'ଜରୁରୀକାଳୀନ' : 'Emergency'}</div>
                    <div className={`font-semibold ${theme.text}`}>{hospitalData.contact.emergency}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <div>
                    <div className="text-xs text-gray-500">{language === 'odia' ? 'ଇମେଲ୍' : 'Email'}</div>
                    <div className={`font-semibold ${theme.text} text-sm`}>{hospitalData.contact.email}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Specializations */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className={`text-2xl font-bold ${theme.text} mb-6 flex items-center space-x-2`}>
                <Activity className="w-6 h-6" />
                <span>{language === 'odia' ? 'ବିଶେଷତା' : 'Specializations'}</span>
              </h2>
              <div className="flex flex-wrap gap-3">
                {hospitalData.specializations.map((spec, index) => (
                  <span
                    key={index}
                    className={`px-4 py-2 bg-gradient-to-r ${theme.primary} text-white rounded-full text-sm font-semibold`}
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Doctors */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
            <h2 className={`text-2xl font-bold ${theme.text} mb-6 flex items-center space-x-2`}>
              <UserCircle className="w-6 h-6" />
              <span>{language === 'odia' ? 'ଆମର ଡାକ୍ତର' : 'Our Doctors'}</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {hospitalData.doctors.map((doctor, index) => (
                <div key={index} className="p-4 border-2 border-gray-200 rounded-xl hover:border-orange-500 transition-all">
                  <div className={`w-12 h-12 bg-gradient-to-br ${theme.primary} rounded-xl flex items-center justify-center mb-3`}>
                    <UserCircle className="w-7 h-7 text-white" />
                  </div>
                  <h3 className={`font-bold ${theme.text} mb-1`}>{doctor.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">{doctor.specialty}</p>
                  <p className="text-xs text-gray-500">{doctor.experience}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Milestones */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
            <h2 className={`text-2xl font-bold ${theme.text} mb-6 flex items-center space-x-2`}>
              <Star className="w-6 h-6" />
              <span>{language === 'odia' ? 'ମାଇଲଷ୍ଟୋନ୍' : 'Milestones & Achievements'}</span>
            </h2>
            <div className="space-y-4">
              {hospitalData.milestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className={`w-12 h-12 bg-gradient-to-br ${theme.primary} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white font-bold">{milestone.year}</span>
                  </div>
                  <div className="flex-1">
                    <p className={`font-semibold ${theme.text}`}>{milestone.achievement}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  function AdmissionPage() {
    if (!activeAdmission) {
      return (
        <div className={`min-h-screen ${theme.bg} flex items-center justify-center py-8`}>
          <div className="text-center">
            <div className={`w-24 h-24 mx-auto bg-gradient-to-br ${theme.primary} rounded-full flex items-center justify-center mb-6`}>
              <Bed className="w-12 h-12 text-white" />
            </div>
            <h2 className={`text-2xl font-bold ${theme.text} mb-2`}>
              {language === 'odia' ? 'କୌଣସି ସକ୍ରିୟ ଆଡମିଶନ୍ ନାହିଁ' : 'No Active Admission'}
            </h2>
            <p className="text-gray-600 mb-6">
              {language === 'odia' ? 'ଆପଣଙ୍କର ବର୍ତ୍ତମାନ କୌଣସି ଚାଲୁଥିବା ଆଡମିଶନ୍ ନାହିଁ' : 'You don\'t have any ongoing hospital admissions'}
            </p>
            <button
              onClick={() => setCurrentPage('home')}
              className={`px-8 py-3 bg-gradient-to-r ${theme.primary} text-white rounded-xl font-semibold hover:shadow-lg transition-all`}
            >
              {language === 'odia' ? 'ହୋମକୁ ଯାଆନ୍ତୁ' : 'Go to Home'}
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className={`min-h-screen ${theme.bg} py-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className={`text-4xl font-bold ${theme.text} mb-2`}>{language === 'odia' ? 'ମୋର ଆଡମିଶନ୍' : 'My Admission'}</h1>
            <p className="text-gray-600">{language === 'odia' ? 'ଆପଣଙ୍କ ବର୍ତ୍ତମାନର ଆଡମିଶନ୍ ସୂଚନା' : 'Your current admission details'}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Admission Status Card */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className={`text-2xl font-bold ${theme.text} mb-2`}>{activeAdmission.hospital}</h2>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span className={`px-3 py-1 ${activeAdmission.status === 'stable' ? theme.doctorsLight : theme.emergencyLight} rounded-full font-semibold`}>
                        {activeAdmission.status === 'stable' ? (language === 'odia' ? 'ସ୍ଥିର' : 'Stable') : (language === 'odia' ? 'ନିରୀକ୍ଷଣ ଅଧୀନ' : 'Under Observation')}
                      </span>
                      <span>•</span>
                      <span>{language === 'odia' ? 'କୋଠରୀ' : 'Room'}: {activeAdmission.room}</span>
                    </div>
                  </div>
                  <div className={`w-16 h-16 bg-gradient-to-br ${theme.primary} rounded-2xl flex items-center justify-center`}>
                    <Bed className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-sm text-gray-600 mb-1">{language === 'odia' ? 'ଆଡମିଟ୍ ତାରିଖ' : 'Admitted On'}</div>
                    <div className={`font-semibold ${theme.text}`}>{activeAdmission.admissionDate}</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-sm text-gray-600 mb-1">{language === 'odia' ? 'ଡାକ୍ତର' : 'Doctor'}</div>
                    <div className={`font-semibold ${theme.text}`}>{activeAdmission.doctor}</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-sm text-gray-600 mb-1">{language === 'odia' ? 'ଆନୁମାନିକ ଡିସଚାର୍ଜ' : 'Est. Discharge'}</div>
                    <div className={`font-semibold ${theme.text}`}>{activeAdmission.estimatedDischarge}</div>
                  </div>
                </div>

                <div className="p-4 border-2 border-gray-200 rounded-xl">
                  <h3 className={`font-bold ${theme.text} mb-2`}>{language === 'odia' ? 'ନିର୍ଣ୍ଣୟ' : 'Diagnosis'}</h3>
                  <p className="text-gray-600">{activeAdmission.diagnosis}</p>
                </div>
              </div>

              {/* Treatment Plan */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className={`text-2xl font-bold ${theme.text} mb-6`}>{language === 'odia' ? 'ଚିକିତ୍ସା ଯୋଜନା' : 'Treatment Plan'}</h2>
                <div className="space-y-4">
                  {activeAdmission.treatments.map((treatment, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                      <div className={`w-10 h-10 bg-gradient-to-br ${theme.primary} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className={`font-semibold ${theme.text} mb-1`}>{treatment.name}</div>
                        <div className="text-sm text-gray-600">{treatment.frequency}</div>
                      </div>
                      <span className="text-xs px-3 py-1 bg-white rounded-full border-2 border-gray-200 font-semibold">
                        {treatment.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Vitals Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className={`font-bold text-lg ${theme.text} mb-4`}>{language === 'odia' ? 'ସାମ୍ପ୍ରତିକ ଭିଟାଲ୍ସ' : 'Current Vitals'}</h3>
                <div className="space-y-4">
                  {activeAdmission.vitals.map((vital, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">{vital.name}</span>
                        <span className={`text-sm font-semibold ${theme.text}`}>{vital.value}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className={`h-2 rounded-full bg-gradient-to-r ${theme.doctors}`} style={{ width: vital.percentage }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500 flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{language === 'odia' ? 'ଶେଷ ଅଦ୍ୟତନ' : 'Last updated'}: {activeAdmission.lastVitalsUpdate}</span>
                </div>
              </div>

              {/* Billing Summary */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className={`font-bold text-lg ${theme.text} mb-4`}>{language === 'odia' ? 'ବିଲ୍ ସାରାଂଶ' : 'Billing Summary'}</h3>
                <div className="space-y-3">
                  {activeAdmission.billing.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.item}</span>
                      <span className={`font-semibold ${theme.text}`}>{item.amount}</span>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-gray-200 flex justify-between">
                    <span className={`font-bold ${theme.text}`}>{language === 'odia' ? 'ମୋଟ' : 'Total'}</span>
                    <span className={`font-bold text-xl ${theme.text}`}>{activeAdmission.totalBill}</span>
                  </div>
                </div>
              </div>

              {/* Contact Card */}
              <div className={`bg-gradient-to-br ${theme.primary} p-6 rounded-2xl text-white`}>
                <h3 className="font-bold text-lg mb-4">{language === 'odia' ? 'ଜରୁରୀକାଳୀନ ଯୋଗାଯୋଗ' : 'Emergency Contact'}</h3>
                <button className="w-full py-3 bg-white text-gray-900 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>{language === 'odia' ? 'ନର୍ସ ଷ୍ଟେସନ୍ କଲ୍ କରନ୍ତୁ' : 'Call Nurse Station'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function LoginModal() {
    const [formData, setFormData] = useState({
      identifier: '',
      password: ''
    });

    const handleLogin = (e) => {
      e.preventDefault();
      setIsAuthenticated(true);
      setUserType(loginType);
      setShowLoginModal(false);
      
      // For demo: simulate admission
      if (loginType === 'user') {
        setActiveAdmission({
          hospital: 'AIIMS Bhubaneswar',
          room: '304-A',
          admissionDate: '2026-02-14',
          estimatedDischarge: '2026-02-20',
          doctor: 'Dr. Priya Sharma',
          diagnosis: 'Dengue Fever - Under Treatment',
          status: 'stable',
          treatments: [
            { name: 'IV Fluids', frequency: 'Every 6 hours', status: 'Ongoing' },
            { name: 'Antipyretics', frequency: 'As needed', status: 'Active' },
            { name: 'Blood Tests', frequency: 'Daily', status: 'Scheduled' }
          ],
          vitals: [
            { name: 'Temperature', value: '99.2°F', percentage: '65%' },
            { name: 'Blood Pressure', value: '120/80', percentage: '80%' },
            { name: 'Heart Rate', value: '78 bpm', percentage: '75%' },
            { name: 'Oxygen Level', value: '98%', percentage: '98%' }
          ],
          lastVitalsUpdate: '2 hours ago',
          billing: [
            { item: 'Room Charges', amount: '₹12,000' },
            { item: 'Medicines', amount: '₹5,400' },
            { item: 'Tests', amount: '₹3,200' }
          ],
          totalBill: '₹20,600'
        });
      }
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl max-w-md w-full p-8 relative">
          <button
            onClick={() => setShowLoginModal(false)}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center mb-8">
            <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${theme.primary} rounded-2xl flex items-center justify-center mb-4`}>
              <User className="w-8 h-8 text-white" />
            </div>
            <h2 className={`text-3xl font-bold ${theme.text} mb-2`}>{language === 'odia' ? 'ଲଗଇନ୍' : 'Login'}</h2>
            <p className="text-gray-600">
              {loginType === 'user' 
                ? (language === 'odia' ? 'ଆପଣଙ୍କ ଆକାଉଣ୍ଟରେ ଲଗଇନ୍ କରନ୍ତୁ' : 'Login to your account')
                : (language === 'odia' ? 'ହସ୍ପିଟାଲ ପୋର୍ଟାଲ୍' : 'Hospital Portal')
              }
            </p>
          </div>

          {/* Toggle Login Type */}
          <div className="flex space-x-2 mb-6">
            <button
              onClick={() => setLoginType('user')}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                loginType === 'user'
                  ? `bg-gradient-to-r ${theme.primary} text-white`
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {language === 'odia' ? 'ୟୁଜର' : 'User'}
            </button>
            <button
              onClick={() => setLoginType('hospital')}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                loginType === 'hospital'
                  ? `bg-gradient-to-r ${theme.primary} text-white`
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {language === 'odia' ? 'ହସ୍ପିଟାଲ' : 'Hospital'}
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className={`block text-sm font-semibold ${theme.text} mb-2`}>
                {loginType === 'user' 
                  ? (language === 'odia' ? 'ଇମେଲ୍ / ଫୋନ୍' : 'Email / Phone')
                  : (language === 'odia' ? 'ହସ୍ପିଟାଲ ID' : 'Hospital ID')
                }
              </label>
              <input
                type="text"
                required
                value={formData.identifier}
                onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                placeholder={loginType === 'user' ? 'your@email.com' : 'HOSP-1234'}
              />
            </div>

            <div>
              <label className={`block text-sm font-semibold ${theme.text} mb-2`}>
                {language === 'odia' ? 'ପାସୱର୍ଡ' : 'Password'}
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className={`w-full py-3 bg-gradient-to-r ${theme.primary} text-white rounded-xl font-semibold hover:shadow-lg transition-all`}
            >
              {language === 'odia' ? 'ଲଗଇନ୍' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button className="text-sm text-gray-600 hover:text-orange-600">
              {language === 'odia' ? 'ପାସୱର୍ଡ ଭୁଲିଗଲେ?' : 'Forgot Password?'}
            </button>
            <div className="mt-2">
              <span className="text-sm text-gray-600">{language === 'odia' ? 'ନୂତନ ୟୁଜର?' : 'New user?'} </span>
              <button 
                onClick={() => {
                  setShowLoginModal(false);
                  setShowSignupModal(true);
                }}
                className="text-sm font-semibold text-orange-600 hover:text-orange-700"
              >
                {language === 'odia' ? 'ସାଇନ ଅପ୍ କରନ୍ତୁ' : 'Sign up'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function SignupModal() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleSignup = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert(language === 'odia' ? 'ପାସୱର୍ଡ ମେଲ ଖାଉନାହିଁ' : 'Passwords do not match');
      return;
    }
    // Handle signup logic here
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setShowSignupModal(false)}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${theme.primary} rounded-2xl flex items-center justify-center mb-4`}>
            <UserCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className={`text-3xl font-bold ${theme.text} mb-2`}>{language === 'odia' ? 'ସାଇନ ଅପ୍' : 'Sign Up'}</h2>
          <p className="text-gray-600">
            {language === 'odia' ? 'ଆପଣଙ୍କ ଆକାଉଣ୍ଟ ସୃଷ୍ଟି କରନ୍ତୁ' : 'Create your account'}
          </p>
        </div>

        {/* Toggle Signup Type */}
        <div className="flex space-x-2 mb-6">
          <button
            onClick={() => setSignupType('user')}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
              signupType === 'user'
                ? `bg-gradient-to-r ${theme.primary} text-white`
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {language === 'odia' ? 'ୟୁଜର' : 'User'}
          </button>
          <button
            onClick={() => setSignupType('hospital')}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
              signupType === 'hospital'
                ? `bg-gradient-to-r ${theme.primary} text-white`
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {language === 'odia' ? 'ହସ୍ପିଟାଲ' : 'Hospital'}
          </button>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className={`block text-sm font-semibold ${theme.text} mb-2`}>
              {signupType === 'user' 
                ? (language === 'odia' ? 'ପୂର୍ଣ୍ଣ ନାମ' : 'Full Name')
                : (language === 'odia' ? 'ହସ୍ପିଟାଲ ନାମ' : 'Hospital Name')
              }
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
              placeholder={signupType === 'user' ? 'Rajesh Kumar' : 'City General Hospital'}
            />
          </div>

          <div>
            <label className={`block text-sm font-semibold ${theme.text} mb-2`}>
              {language === 'odia' ? 'ଇମେଲ୍' : 'Email'}
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className={`block text-sm font-semibold ${theme.text} mb-2`}>
              {language === 'odia' ? 'ଫୋନ୍ ନମ୍ବର' : 'Phone Number'}
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
              placeholder="+91 XXXXX-XXXXX"
            />
          </div>

          <div>
            <label className={`block text-sm font-semibold ${theme.text} mb-2`}>
              {language === 'odia' ? 'ପାସୱର୍ଡ' : 'Password'}
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className={`block text-sm font-semibold ${theme.text} mb-2`}>
              {language === 'odia' ? 'ପାସୱର୍ଡ ନିଶ୍ଚିତ କରନ୍ତୁ' : 'Confirm Password'}
            </label>
            <input
              type="password"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 bg-gradient-to-r ${theme.primary} text-white rounded-xl font-semibold hover:shadow-lg transition-all`}
          >
            {language === 'odia' ? 'ସାଇନ ଅପ୍' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-sm text-gray-600">{language === 'odia' ? 'ଆଗରୁ ଆକାଉଣ୍ଟ ଅଛି?' : 'Already have an account?'} </span>
          <button 
            onClick={() => {
              setShowSignupModal(false);
              setShowLoginModal(true);
            }}
            className="text-sm font-semibold text-orange-600 hover:text-orange-700"
          >
            {language === 'odia' ? 'ଲଗଇନ୍ କରନ୍ତୁ' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
}

  // Main Render
  return (
    <div className={`min-h-screen ${theme.bg}`}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button onClick={() => setCurrentPage('home')} className="flex items-center space-x-2">
              <div className={`w-10 h-10 bg-gradient-to-br ${theme.primary} rounded-xl flex items-center justify-center`}>
                <Heart className="w-6 h-6 text-white" fill="white" />
              </div>
              <h1 className={`text-2xl font-bold bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent`}>Niramaya</h1>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <button onClick={() => setCurrentPage('home')} className={`font-semibold ${theme.text} hover:text-orange-600 transition-colors`}>{t.home}</button>
              <button onClick={() => setCurrentPage('doctors')} className={`font-semibold ${theme.text} hover:text-orange-600 transition-colors`}>{t.doctors}</button>
              <button onClick={() => setCurrentPage('services')} className={`font-semibold ${theme.text} hover:text-orange-600 transition-colors`}>{t.services}</button>
              <button onClick={() => setCurrentPage('health')} className={`font-semibold ${theme.text} hover:text-orange-600 transition-colors`}>{t.health}</button>
              <button onClick={() => setCurrentPage('icu')} className={`font-semibold ${theme.text} hover:text-orange-600 transition-colors`}>{t.icu}</button>
              <button onClick={() => setCurrentPage('emergency')} className={`flex items-center space-x-1 font-semibold text-red-600 hover:text-red-700 transition-colors`}>
                <AlertTriangle className="w-4 h-4" />
                <span>{t.emergency}</span>
              </button>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === 'english' ? 'odia' : 'english')}
                className={`hidden md:flex items-center space-x-2 px-4 py-2 border-2 border-gray-200 rounded-xl hover:border-orange-500 transition-colors ${theme.text}`}
              >
                <Languages className="w-4 h-4" />
                <span className="text-sm font-semibold">{language === 'english' ? 'ଓଡ଼ିଆ' : 'English'}</span>
              </button>

              {/* Auth Buttons */}
              {!isAuthenticated ? (
                <>
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className={`hidden md:block px-6 py-2 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-all ${theme.text}`}
                  >
                    {t.login}
                  </button>
                  <button
                    onClick={() => setShowSignupModal(true)}
                    className={`hidden md:block px-6 py-2 bg-gradient-to-r ${theme.primary} text-white rounded-xl font-semibold hover:shadow-lg transition-all`}
                  >
                    {language === 'odia' ? 'ସାଇନ ଅପ୍' : 'Sign Up'}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setCurrentPage(userType === 'user' ? 'user-profile' : 'hospital-profile')}
                  className={`hidden md:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r ${theme.primary} text-white rounded-xl font-semibold hover:shadow-lg transition-all`}
                >
                  <User className="w-5 h-5" />
                  <span>{t.profile}</span>
                </button>
              )}

              {/* Mobile Menu Button */}
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-3">
              <button onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }} className={`block w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 font-semibold ${theme.text}`}>{t.home}</button>
              <button onClick={() => { setCurrentPage('doctors'); setIsMenuOpen(false); }} className={`block w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 font-semibold ${theme.text}`}>{t.doctors}</button>
              <button onClick={() => { setCurrentPage('services'); setIsMenuOpen(false); }} className={`block w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 font-semibold ${theme.text}`}>{t.services}</button>
              <button onClick={() => { setCurrentPage('health'); setIsMenuOpen(false); }} className={`block w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 font-semibold ${theme.text}`}>{t.health}</button>
              <button onClick={() => { setCurrentPage('icu'); setIsMenuOpen(false); }} className={`block w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 font-semibold ${theme.text}`}>{t.icu}</button>
              <button onClick={() => { setCurrentPage('emergency'); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 font-semibold text-red-600">{t.emergency}</button>
              
              <button
                onClick={() => setLanguage(language === 'english' ? 'odia' : 'english')}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-semibold flex items-center justify-center space-x-2"
              >
                <Languages className="w-5 h-5" />
                <span>{language === 'english' ? 'Switch to ଓଡ଼ିଆ' : 'Switch to English'}</span>
              </button>

              {!isAuthenticated ? (
                <>
                  <button
                    onClick={() => {
                      setShowLoginModal(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl font-semibold"
                  >
                    {t.login}
                  </button>
                  <button
                    onClick={() => {
                      setShowSignupModal(true);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full px-4 py-3 bg-gradient-to-r ${theme.primary} text-white rounded-xl font-semibold`}
                  >
                    {language === 'odia' ? 'ସାଇନ ଅପ୍' : 'Sign Up'}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setCurrentPage(userType === 'user' ? 'user-profile' : 'hospital-profile');
                      setIsMenuOpen(false);
                    }}
                    className={`w-full px-4 py-3 bg-gradient-to-r ${theme.primary} text-white rounded-xl font-semibold`}
                  >
                    {t.profile}
                  </button>
                  {userType === 'user' && activeAdmission && (
                    <button
                      onClick={() => {
                        setCurrentPage('admission');
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-4 py-3 bg-blue-100 text-blue-700 rounded-xl font-semibold"
                    >
                      {t.admission}
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setIsAuthenticated(false);
                      setUserType(null);
                      setActiveAdmission(null);
                      setCurrentPage('home');
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-4 py-3 bg-red-100 text-red-700 rounded-xl font-semibold"
                  >
                    {t.logout}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Page Content */}
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'doctors' && <DoctorsPage />}
      {currentPage === 'services' && <ServicesPage />}
      {currentPage === 'health' && <HealthTrackingPage />}
      {currentPage === 'icu' && <ICUAvailabilityPage />}
      {/* Change this line near the bottom of your file */}
{/* Around line 1640-1650 */}
{currentPage === 'emergency' && (
  <EmergencyPage 
    submitted={submitted} 
    setSubmitted={setSubmitted} 
    emergencyData={emergencyData} 
    setEmergencyData={setEmergencyData} 
  />
)}
      {currentPage === 'user-profile' && <UserProfilePage />}
      {currentPage === 'hospital-profile' && <HospitalProfilePage />}
      {currentPage === 'admission' && <AdmissionPage />}

      {/* Login Modal */}
      {/* Login Modal */}
      {showLoginModal && <LoginModal />}

      {/* Add this line here */}
      {showSignupModal && <SignupModal />}


      {/* Chatbot Button */}
      <button
        onClick={() => setIsChatbotOpen(!isChatbotOpen)}
        className={`fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r ${theme.primary} text-white rounded-full shadow-2xl hover:scale-110 transition-all z-50 flex items-center justify-center`}
      >
        {isChatbotOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chatbot Window */}
      {isChatbotOpen && (
        <div className="fixed bottom-24 right-6 w-96 bg-white rounded-3xl shadow-2xl z-50 overflow-hidden animate-fade-in-up">
          <div className={`bg-gradient-to-r ${theme.primary} p-4 text-white`}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{language === 'odia' ? 'ସ୍ବାସ୍ଥ୍ୟ ସହାୟକ' : 'Health Assistant'}</h3>
                <p className="text-xs opacity-90">{language === 'odia' ? 'ଅନଲାଇନ୍' : 'Online'} • {language === 'odia' ? 'ସାହାଯ୍ୟ ପାଇଁ ଏଠାରେ' : 'Here to help'}</p>
              </div>
            </div>
          </div>

          <div className="chat-container h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                    msg.type === 'user'
                      ? `bg-gradient-to-r ${theme.primary} text-white`
                      : 'bg-white text-gray-900 shadow-md'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={language === 'odia' ? 'ମୋତେ କିଛି ପଚାରନ୍ତୁ...' : 'Ask me anything...'}
                className="flex-1 px-4 py-2 rounded-full border-2 border-gray-200 focus:border-orange-500 focus:outline-none text-sm"
              />
              <button
                onClick={handleSendMessage}
                className={`w-10 h-10 bg-gradient-to-r ${theme.primary} text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className={`w-10 h-10 bg-gradient-to-br ${theme.primary} rounded-xl flex items-center justify-center`}>
                  <Heart className="w-6 h-6 text-white" fill="white" />
                </div>
                <h3 className={`heading text-xl font-bold bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent`}>Niramaya</h3>
              </div>
              <p className="text-sm text-gray-600">
                {language === 'odia' ? 'ଗ୍ରାମାଞ୍ଚଳ ଭାରତର ପ୍ରତ୍ୟେକ କୋଣରେ ଗୁଣାତ୍ମକ ସ୍ବାସ୍ଥ୍ୟସେବା ଆଣିବା' : 'Bringing quality healthcare to every corner of rural India.'}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-4">{language === 'odia' ? 'ତ୍ୱରିତ ଲିଙ୍କ' : 'Quick Links'}</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><button onClick={() => setCurrentPage('doctors')} className="hover:text-orange-600 transition-colors">{t.findDoctors}</button></li>
                <li><button onClick={() => setCurrentPage('services')} className="hover:text-orange-600 transition-colors">{t.services}</button></li>
                <li><button onClick={() => setCurrentPage('health')} className="hover:text-orange-600 transition-colors">{t.health}</button></li>
                <li><button onClick={() => setCurrentPage('icu')} className="hover:text-orange-600 transition-colors">{t.icu}</button></li>
              </ul>
            </div>

            <div>
                   <h4 className="font-bold text-gray-900 mb-4">{language === 'odia' ? 'ସମର୍ଥନ' : 'Support'}</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                      <li>
                           <a href="#" 
                          onClick={(e) => { e.preventDefault(); setThemeKey('default'); }} 
                          className="hover:text-orange-600 transition-colors">
                         {language === 'odia' ? 'ସହାୟତା କେନ୍ଦ୍ର' : 'Help Center'} 
         </a>
                     </li>
                     <li>
                          <a href="#" 
                          onClick={(e) => { e.preventDefault(); setThemeKey('option1'); }} 
                          className="hover:text-orange-600 transition-colors">
                          {language === 'odia' ? 'ଯୋଗାଯୋଗ' : 'Contact Us'} 
                        </a>
                    </li>
                    <li>
                          <a href="#" 
                          onClick={(e) => { e.preventDefault(); setThemeKey('option2'); }} 
                          className="hover:text-orange-600 transition-colors">
                          {language === 'odia' ? 'ଗୋପନୀୟତା ନୀତି' : 'Privacy Policy'} 
                      </a>
                    </li>
                    <li>
                          <a href="#" 
                          onClick={(e) => { e.preventDefault(); setThemeKey('option3'); }} 
                         className="hover:text-orange-600 transition-colors">
                         {language === 'odia' ? 'ନିୟମ ଓ ସର୍ତ୍ତ' : 'Terms & Conditions'} 
                   </a>
                  </li>
                  </ul>
           </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-4">{t.emergency}</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="w-4 h-4 text-red-600" />
                  <span className="font-semibold text-red-600">108 - {language === 'odia' ? 'ଆମ୍ବୁଲାନ୍ସ' : 'Ambulance'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
            <p>© 2026 Niramaya. {language === 'odia' ? 'ଗ୍ରାମୀଣ ସମ୍ପ୍ରଦାୟ ପାଇଁ ❤️ ସହିତ ନିର୍ମିତ' : 'Made with ❤️ for rural communities.'}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
