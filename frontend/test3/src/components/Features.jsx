import React, { useState } from 'react';
import { Stethoscope, Clock, Shield, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Features = () => {
  const features = [
    {
      icon: <Stethoscope size={48} />,
      title: "Dosha Analysis",
      description: "Advanced Prakriti and Vikriti assessment tools based on Ayurvedic principles",
      backContent: "Understand your unique constitution (Vata, Pitta, Kapha) and receive personalized dietary and lifestyle recommendations."
    },
    {
      icon: <Clock size={48} />,
      title: "24/7 Vaidya Access",
      description: "Round-the-clock access to certified Ayurvedic practitioners and wellness experts",
      backContent: "Connect with experienced Vaidyas for consultations on diet, herbs, and lifestyle modifications. Emergency support available 24/7."
    },
    {
      icon: <Shield size={48} />,
      title: "Sacred Privacy",
      description: "Protecting your personal health journey with utmost confidentiality",
      backContent: "Your health data is treated with the same sanctity as traditional physician-patient relationships. Complete HIPAA compliance."
    },
    {
      icon: <Activity size={48} />,
      title: "Holistic Wellness Tracking",
      description: "Monitor your Ayurvedic wellness journey with comprehensive analytics",
      backContent: "Track your dosha balance, digestive fire (Agni), and overall well-being. Get insights based on seasonal changes (Ritucharya)."
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 100,
      scale: 0.9
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.8
      }
    }
  };

  const FeatureCard = ({ feature }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
      <motion.div
        className="relative h-64 w-full max-w-lg mx-auto perspective-1000"
        variants={item}
        onHoverStart={() => setIsFlipped(true)}
        onHoverEnd={() => setIsFlipped(false)}
      >
        <AnimatePresence mode="wait">
          {!isFlipped ? (
            <motion.div
              key="front"
              className="absolute w-full h-full flex flex-col items-center p-8 bg-white rounded-xl shadow-lg"
              initial={false}
              animate={{
                rotateY: 0,
                transition: { duration: 0.6, ease: "easeOut" }
              }}
              exit={{
                rotateY: 90,
                transition: { duration: 0.3, ease: "easeIn" }
              }}
              style={{
                backfaceVisibility: "hidden",
              }}
            >
              <div className="flex-shrink-0 p-6 mb-4 bg-blue-50 rounded-xl">
                <div className="text-blue-600">
                  {feature.icon}
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="back"
              className="absolute w-full h-full p-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg flex items-center justify-center text-white"
              initial={{ rotateY: -90 }}
              animate={{
                rotateY: 0,
                transition: { duration: 0.6, ease: "easeOut" }
              }}
              exit={{
                rotateY: 90,
                transition: { duration: 0.3, ease: "easeIn" }
              }}
              style={{
                backfaceVisibility: "hidden",
              }}
            >
              <p className="text-lg leading-relaxed text-center">
                {feature.backContent}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <section id="features" className="py-24 min-h-screen w-full bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 12
          }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Why Choose VedaHelp?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the timeless wisdom of Ayurveda enhanced by modern technology
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto"
          variants={container}
          initial="hidden"
          animate="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;