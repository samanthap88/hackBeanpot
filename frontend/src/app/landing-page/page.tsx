"use client"

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Moon, Sun, Rocket, Zap, Target, ChevronRight, Percent, CheckCircle, Menu } from 'lucide-react'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import waitlist from '@zootools/waitlist-js'

import {Search, Handshake } from 'lucide-react';

export default function EnhancedDynamicLandingPage() {

  const [darkMode, setDarkMode] = useState(false)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const clickPopup = (event:any) => {
  event.preventDefault();


  waitlist.openPopup("JLsjU7BVUrHo0csFWpTq")
}

  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <div id="home" className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-300`}>

      <motion.div
        className={`${darkMode ? 'bg-gray-800' : 'bg-white'} fixed top-0 left-0 right-0 shadow-lg z-50 transition-colors duration-300`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <div className="container mx-auto flex justify-between items-center p-4">
          <motion.p
            className="text-xl font-bold"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            VentureMate
          </motion.p>
          <div className="space-x-4 hidden lg:flex items-center">
            {['Home', 'Features', 'Pricing', 'Get Started'].map((item, index) => (
              <motion.a
                key={item}
                href={item === 'Get Started' ?  '/form': `#${item.toLowerCase()}`}
                className={`relative inline-block group ${
                  item === 'Get Started'
                    ? 'bg-indigo-500 text-white px-4 py-2 rounded-md'
                    : darkMode
                    ? 'hover:text-indigo-400'
                    : 'hover:text-indigo-600'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: item === 'Get Started' ? 0 : index * 0.1 }}
              >
                {item}
                {item !== 'Get Started' && (
                <span className={`absolute left-0 bottom-0 h-[2px] w-full ${darkMode ? 'bg-indigo-400' : 'bg-indigo-600'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></span>
                )}
              </motion.a>
            ))}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button onClick={toggleDarkMode} variant="ghost" size="icon" className="ml-4">
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </motion.div>
          </div>
          <div className="lg:hidden flex items-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button onClick={toggleDarkMode} variant="ghost" size="icon" className="mr-2">
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </motion.div>
            <Sheet>
              <SheetTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button variant="ghost" size="icon">
                    <Menu />
                  </Button>
                </motion.div>
              </SheetTrigger>
              <SheetContent className={darkMode ? 'bg-gray-800 text-white' : 'bg-white'}>
                <SheetClose asChild>
                  <div className='flex flex-col gap-4 mt-8'>
                    {['Home', 'Features', 'Pricing','Get Started'].map((item, index
                      
                    ) => (
                      <motion.a
                      key={item}
                      href={item === 'Get Started' ?  '/form': `#${item.toLowerCase()}`}
                      className={`relative inline-block group ${
                        item === 'Get Started'
                          ? 'bg-indigo-500 text-white px-4 py-2 rounded-md'
                          : darkMode
                          ? 'hover:text-indigo-400'
                          : 'hover:text-indigo-600'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: item === 'Get Started' ? 0 : index * 0.1 }}
                    >
                      {item}
                      {item !== 'Get Started' && (
                      <span className={`absolute left-0 bottom-0 h-[2px] w-full ${darkMode ? 'bg-indigo-400' : 'bg-indigo-600'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></span>
                      )}
                    </motion.a>
                    ))}
                  </div>
                </SheetClose>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.div>


      <section className="relative overflow-hidden pt-32 pb-16 px-4">
        <motion.div className="absolute inset-0 z-0">
          <motion.div
            className="absolute top-[10vh] left-[10vw] w-[20vw] h-[20vw] bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
            animate={{
              scale: [1, 1.2, 1],
              x: [-20, 20, -20],
              y: [10, -20, 10],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
          <motion.div
            className="absolute top-[25vh] right-[10vw] w-[25vw] h-[25vw] bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-60"
            animate={{
              scale: [1, 1.3, 1],
              x: [20, -20, 20],
              y: [-10, 20, -10],
              rotate: [0, -90, 0],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
          <motion.div
            className="absolute bottom-[15vh] left-[30vw] w-[30vw] h-[30vw] bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"
            animate={{
              scale: [1, 1.1, 1],
              x: [-30, 30, -30],
              y: [20, -30, 20],
              rotate: [0, 60, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
          <motion.div
            className="absolute top-[40vh] right-[25vw] w-[15vw] h-[15vw] bg-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-50"
            animate={{
              scale: [1, 1.4, 1],
              x: [-20, 30, -10],
              y: [-30, 30, -10],
              rotate: [0, 120, 0],
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
          <motion.div
            className="absolute bottom-[5vh] right-[10vw] w-[12vw] h-[12vw] bg-indigo-700 rounded-full mix-blend-multiply filter blur-xl opacity-60"
            animate={{
              scale: [1, 1.3, 1],
              x: [15, -15, 15],
              y: [-20, 20, -10],
              rotate: [0, -45, 0],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
        </motion.div>

        <div className="container mx-auto text-center relative z-10">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Revolutionize Your Startup Journey
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            AI-Powered Matchmaking for Startups and Investors
          </motion.p>
          <motion.div 
        className="container mx-auto px-4 py-8" 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className={`max-w-2xl mx-auto ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-3xl p-6 shadow-2xl`}> 
          <div className="relative aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-lg">
            <video 
              id="demo-video"
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/final.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <a href="/home">
              <Button size="lg" className={`mr-4 ${darkMode ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-indigo-600 hover:bg-indigo-700'} text-white`}>
                Get Started Now - It's Free
              </Button>
            </a>
            
          </motion.div>
        </div>
      </section>



      <motion.section
      id="features"
        ref={ref}
        className="container mx-auto px-4 py-16"
        variants={staggerChildren}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <h2 className={`text-3xl md:text-4xl font-bold mb-12 text-center ${darkMode ? 'text-indigo-300' : 'text-indigo-900'}`}>
          Ignite Your Startup's Potential
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Rocket, title: "Blast Off with AI", content: "Our cutting-edge AI propels your startup to new heights, connecting you with the perfect investors at light speed." },
            { icon: Zap, title: "Electrify Your Network", content: "Spark powerful connections and energize your startup's growth with our vast network of eager investors." },
            { icon: Target, title: "Precision Matchmaking", content: "Hit the bullseye every time with our laser-focused investor matching, tailored to your unique startup DNA." }
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
            >
              <Card className={`h-full border ${darkMode ? 'border-indigo-700 bg-gray-800' : 'border-indigo-200 bg-white'} shadow-lg flex flex-col justify-center items-center transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group`}>
                <CardHeader className='flex flex-col items-center gap-4'>
                  <motion.div
                    className={`rounded-full p-4 flex justify-center items-center transition-colors duration-300 ${darkMode ? 'bg-indigo-900 group-hover:bg-indigo-800' : 'bg-indigo-100 group-hover:bg-indigo-600'}`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className={`w-8 h-8 ${darkMode ? 'text-indigo-400 group-hover:text-white' : 'text-indigo-600 group-hover:text-white'} transition-colors duration-300`} />
                  </motion.div>
                  <CardTitle className={`text-xl font-bold ${darkMode ? 'text-indigo-300' : 'text-indigo-900'}`}>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className={`text-center ${darkMode ? 'text-gray-300' : 'text-indigo-600'}`}>
                  {feature.content}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

     {/* How It Works Section */}
<section id="howItWorks" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-r from-indigo-50 to-blue-50'}`}>
  <h2 className={`text-3xl md:text-4xl font-bold mb-12 text-center ${darkMode ? 'text-indigo-300' : 'text-indigo-900'}`}>How It Works</h2>
  <div className="relative">
    <div className={`absolute left-1/2 transform -translate-x-1/2 h-full w-1 ${darkMode ? 'bg-indigo-700' : 'bg-indigo-200'}`}></div>
    {[
      { step: 1, title: "Input your startup details", description: "Provide comprehensive information about your startup", icon: Rocket },
      { step: 2, title: "Our AI analyzes and matches", description: "Advanced algorithms process your data to find ideal investors", icon: Search },
      { step: 3, title: "Connect with top-matching investors", description: "Receive a curated list of investors tailored to your startup", icon: Handshake }
    ].map((item, index) => (
      <motion.div
        key={item.step}
        className={`flex items-center mb-12 ${item.step % 2 === 0 ? 'flex-row-reverse' : ''}`}
        initial={{ opacity: 0, x: item.step % 2 === 0 ? 50 : -50, scale: 0.8 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
      >
        <div className="w-1/2 px-4 flex items-center">
          <item.icon className={`hidden lg:block w-8 h-8 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
          <div className="ml-4">
            <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-indigo-300' : 'text-indigo-900'}`}>{item.title}</h3>
            <p className={darkMode ? 'text-gray-300' : 'text-indigo-600'}>{item.description}</p>
          </div>
        </div>
        <motion.div
          className={`w-10 h-10 ${darkMode ? 'bg-indigo-700' : 'bg-indigo-600'} rounded-full flex items-center justify-center z-10 text-white font-bold`}
          initial={{ rotate: 0 }}
          whileInView={{ rotate: 360 }}
          transition={{ duration: 1 }}
        >
          {item.step}
        </motion.div>
        <div className="w-1/2 px-4"></div>
      </motion.div>
    ))}
  </div>
</section>


      <section className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-indigo-100'}`}>
        <div className="container mx-auto px-4">
          <motion.h2
            className={`text-3xl md:text-4xl font-bold mb-12 text-center ${darkMode ? 'text-indigo-300' : 'text-indigo-900'}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Predict Your Investment Success
          </motion.h2>
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-8"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className={`flex items-center justify-center w-32 lg:w-64 h-32 lg:h-64 rounded-full ${darkMode ? 'bg-indigo-900' : 'bg-indigo-600'}`}
              variants={fadeInUp}
            >
              <Percent className="w-16 lg:w-32 h-16 lg:h-32 text-white" />
            </motion.div>
            <motion.div
              className="max-w-md text-center md:text-left"
              variants={fadeInUp}
            >
              <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-indigo-300' : 'text-indigo-900'}`}>Investment Likelihood Score</h3>
              <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-indigo-800'}`}>
                Our advanced AI analyzes your startup's profile and provides a percentage likelihood of investment from each potential investor. This unique feature gives you invaluable insights to focus your efforts on the most promising opportunities.
              </p>
              <Button className={`${darkMode ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-indigo-600 hover:bg-indigo-700'} text-white`}>
                Get Your Score
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>


      <section id="pricing" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <motion.h2
            className={`text-3xl md:text-4xl font-bold mb-12 text-center ${darkMode ? 'text-indigo-300' : 'text-indigo-900'}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Choose Your Launch Pad
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { name: "Startup Booster", price: "Free", features: ["AI-powered investor matching","Likelihood Scores", "Limited Credits","Basic analytics"] },
              { name: "Scale-up Accelerator", price: "$29", features: ["Analytics dashboard","Access to all features", "10x amount matches", "Priority support"] },
              { name: "Unicorn Launcher", price: "Custom", features: ["Full-suite AI tools", "Dedicated account manager", "Customized solutions", "Direct investor introductions"] }
            ].map((plan, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className={`h-full border ${darkMode ? 'border-indigo-700 bg-gray-800' : 'border-indigo-200 bg-white'} shadow-lg flex flex-col justify-between transition-all duration-300 transform hover:scale-105 hover:shadow-2xl`}>
                  <CardHeader>
                    <CardTitle className={`text-2xl font-bold ${darkMode ? 'text-indigo-300' : 'text-indigo-900'}`}>{plan.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`text-4xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{plan.price}<span className="text-sm font-normal">/month</span></p>
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-indigo-800'}`}>
                          <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className={`w-full ${darkMode ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-indigo-600 hover:bg-indigo-700'} text-white`}>
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      <section id="waitlist" className={`py-20 ${darkMode ? 'bg-indigo-900' : 'bg-indigo-600'} relative overflow-hidden`}>
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            backgroundImage: [
              'radial-gradient(circle, #4f46e5 0%, transparent 60%)',
              'radial-gradient(circle, #818cf8 0%, transparent 60%)',
              'radial-gradient(circle, #4f46e5 0%, transparent 60%)'
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Skyrocket Your Startup?
          </motion.h2>
          <motion.p
            className="text-xl mb-8 text-indigo-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <a href="/form">
              <Button size="lg" className="bg-white hover:bg-indigo-100 text-indigo-900" >
                Get Started
              </Button>

            </a>

            
          </motion.div>
        </div>
      </section>


      <footer className={`${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-indigo-900 text-indigo-100'} py-12`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { title: "Product", links: ["Features", "Pricing", "FAQ"] },
              { title: "Company", links: ["About Us", "Careers", "Contact"] },
              { title: "Resources", links: ["Blog", "Guides", "Events"] },
              { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] }
            ].map((column, index) => (
              <div key={index}>
                <h3 className="font-bold mb-4 text-white">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-indigo-300 hover:text-white'} transition-colors`}>{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className={`mt-12 pt-8 border-t ${darkMode ? 'border-gray-700 text-gray-400' : 'border-indigo-800 text-indigo-400'} text-center`}>
            © {new Date().getFullYear()} VentureMate. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
