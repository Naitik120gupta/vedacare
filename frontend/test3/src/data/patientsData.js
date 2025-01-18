const patientsData = {
  1: {
    id: 1,
    name: "Rohan Sharma",
    age: 25,
    doctorName: "Dr. Asha Gupta",
    date: "2024-01-25",
    problem: "Severe headache and fever",
    status: "Pending",
    lastVisit: "2024-01-15",
    symptoms: [
      "High temperature (39°C)",
      "Persistent headache",
      "Fatigue",
      "Body aches"
    ],
    medications: {
      immediate: "Tulsi and Ginger tea - 3 times daily",
      followUp: "Giloy extract - 10ml twice daily for 5 days"
    },
    questions: [
      {
        question: "How long have you been experiencing these symptoms?",
        answer: "Started 3 days ago"
      },
      {
        question: "Have you tried any home remedies?",
        answer: "Tried steam inhalation and turmeric milk"
      },
      {
        question: "Are you allergic to any herbs or spices?",
        answer: "No known allergies"
      }
    ]
  },
  2: {
    id: 2,
    name: "Anjali Verma",
    age: 34,
    doctorName: "Dr. Sanjay Patel",
    date: "2024-01-26",
    problem: "Chronic back pain",
    status: "In Treatment",
    lastVisit: "2024-01-20",
    symptoms: [
      "Lower back pain",
      "Difficulty in movement",
      "Pain radiating to legs",
      "Morning stiffness"
    ],
    medications: {
      immediate: "Ashwagandha churna - 1 tsp with warm milk before bedtime",
      followUp: "Nirgundi oil massage - twice daily for 7 days"
    },
    questions: [
      {
        question: "When did the pain start?",
        answer: "About 2 weeks ago after lifting heavy bags"
      },
      {
        question: "Have you tried any traditional treatments?",
        answer: "Yes, did some yoga stretches and warm compress"
      },
      {
        question: "Do you follow a balanced Vata-pacifying diet?",
        answer: "Not strictly, but I avoid cold and dry foods"
      }
    ]
  },
  3: {
    id: 3,
    name: "Arjun Nair",
    age: 29,
    doctorName: "Dr. Meera Menon",
    date: "2024-01-24",
    problem: "Seasonal allergies",
    status: "Completed",
    lastVisit: "2024-01-10",
    symptoms: [
      "Runny nose",
      "Itchy eyes",
      "Sneezing",
      "Congestion"
    ],
    medications: {
      immediate: "Haridra (turmeric) capsules - once daily",
      followUp: "Anu taila nasal drops - 2 drops in each nostril daily for 2 weeks"
    },
    questions: [
      {
        question: "Are your symptoms worse at any particular time?",
        answer: "Yes, especially in the morning and when near flowering plants"
      },
      {
        question: "Have you identified any specific triggers?",
        answer: "Dust and seasonal pollen"
      },
      {
        question: "Have you tried any Ayurvedic treatments before?",
        answer: "Yes, started using Chyawanprash this winter"
      }
    ]
  },
  4: {
    id: 4,
    name: "Priya Desai",
    age: 37,
    doctorName: "Dr. Kiran Joshi",
    date: "2024-01-23",
    problem: "Anxiety and insomnia",
    status: "In Treatment",
    lastVisit: "2024-01-18",
    symptoms: [
      "Difficulty sleeping",
      "Racing thoughts",
      "Restlessness",
      "Fatigue"
    ],
    medications: {
      immediate: "Brahmi and Shankhpushpi syrup - 10ml twice daily",
      followUp: "Jatamansi powder - 1 tsp with warm water at night"
    },
    questions: [
      {
        question: "How long have you been experiencing sleep issues?",
        answer: "For about a month now"
      },
      {
        question: "Do you practice meditation or pranayama?",
        answer: "Occasionally, but not regularly"
      },
      {
        question: "Have you made any dietary changes recently?",
        answer: "Started skipping dinner due to late working hours"
      }
    ]
  },
  5: {
    id: 5,
    name: "Vikas Reddy",
    age: 40,
    doctorName: "Dr. Latha Shetty",
    date: "2024-01-28",
    problem: "Digestive issues",
    status: "Pending",
    lastVisit: "2024-01-18",
    symptoms: [
      "Bloating",
      "Acidity",
      "Irregular bowel movements",
      "Stomach cramps"
    ],
    medications: {
      immediate: "Ajwain and fennel seeds water - twice daily",
      followUp: "Triphala powder - 1 tsp with warm water before bedtime"
    },
    questions: [
      {
        question: "Have you made any recent dietary changes?",
        answer: "Yes, started eating more spicy and oily food recently"
      },
      {
        question: "Do you have a history of digestive problems?",
        answer: "Yes, mild issues in the past but not severe"
      },
      {
        question: "Have you tried any remedies?",
        answer: "Drinking jeera (cumin) water"
      }
    ]
  },
  6: {
    id: 6,
    name: "Riya Kapoor",
    age: 22,
    doctorName: "Dr. Preeti Malhotra",
    date: "2024-01-29",
    problem: "Acne and skin issues",
    status: "In Treatment",
    lastVisit: "2024-01-20",
    symptoms: [
      "Pimples on face",
      "Oily skin",
      "Dark spots",
      "Itchiness"
    ],
    medications: {
      immediate: "Neem tablets - twice daily after meals",
      followUp: "Aloe vera gel application - twice daily for a week"
    },
    questions: [
      {
        question: "When did the acne issues start?",
        answer: "Around 6 months ago"
      },
      {
        question: "Do you have a balanced diet?",
        answer: "Not really, I eat a lot of junk food"
      },
      {
        question: "Have you tried any skincare products?",
        answer: "Yes, but they didn’t work well"
      }
    ]
  },
  7: {
    id: 7,
    name: "Manoj Tiwari",
    age: 50,
    doctorName: "Dr. Ravi Tripathi",
    date: "2024-01-30",
    problem: "Joint pain and stiffness",
    status: "In Treatment",
    lastVisit: "2024-01-22",
    symptoms: [
      "Knee pain",
      "Stiffness in joints",
      "Difficulty walking",
      "Swelling in joints"
    ],
    medications: {
      immediate: "Maharasnadi kadha - 15ml twice daily",
      followUp: "Sesame oil massage - daily for 2 weeks"
    },
    questions: [
      {
        question: "How long have you been experiencing joint pain?",
        answer: "For the past 3 years"
      },
      {
        question: "Have you consulted any specialists before?",
        answer: "Yes, but the prescribed painkillers had side effects"
      },
      {
        question: "Do you practice any physical exercises?",
        answer: "Light walking only"
      }
    ]
  },
  8: {
    id: 8,
    name: "Kavita Rao",
    age: 45,
    doctorName: "Dr. Ramesh Iyer",
    date: "2024-01-31",
    problem: "Menopausal symptoms",
    status: "In Treatment",
    lastVisit: "2024-01-25",
    symptoms: [
      "Hot flashes",
      "Mood swings",
      "Night sweats",
      "Fatigue"
    ],
    medications: {
      immediate: "Shatavari churna - 1 tsp with milk twice daily",
      followUp: "Ashwagandha capsules - once daily"
    },
    questions: [
      {
        question: "How long have you been experiencing these symptoms?",
        answer: "For about 6 months"
      },
      {
        question: "Do you feel excessively tired during the day?",
        answer: "Yes, especially in the afternoons"
      },
      {
        question: "Have you tried any dietary changes?",
        answer: "Started including more soy-based foods"
      }
    ]
  },
  9: {
    id: 9,
    name: "Rahul Gupta",
    age: 30,
    doctorName: "Dr. Aparna Dixit",
    date: "2024-02-01",
    problem: "Obesity and low energy",
    status: "Pending",
    lastVisit: "2024-01-15",
    symptoms: [
      "Rapid weight gain",
      "Low stamina",
      "Frequent hunger pangs",
      "Lethargy"
    ],
    medications: {
      immediate: "Trikatu powder - 1 tsp with honey before meals",
      followUp: "Guggulu tablets - twice daily for a month"
    },
    questions: [
      {
        question: "How long have you been experiencing weight issues?",
        answer: "For the past 2 years"
      },
      {
        question: "Do you exercise regularly?",
        answer: "No, I have a sedentary lifestyle"
      },
      {
        question: "What is your usual diet like?",
        answer: "Mostly high-carb and processed foods"
      }
    ]
  },
  10: {
    id: 10,
    name: "Sneha Kulkarni",
    age: 26,
    doctorName: "Dr. Deepak Joshi",
    date: "2024-02-02",
    problem: "Hair fall and dandruff",
    status: "In Treatment",
    lastVisit: "2024-01-22",
    symptoms: [
      "Excessive hair fall",
      "Itchy scalp",
      "Dryness",
      "Dandruff"
    ],
    medications: {
      immediate: "Bhringraj oil application - thrice weekly",
      followUp: "Amla juice - 30ml daily on an empty stomach"
    },
    questions: [
      {
        question: "When did the hair fall start?",
        answer: "About 3 months ago"
      },
      {
        question: "Do you have any scalp infections?",
        answer: "No, but there’s excessive dryness"
      },
      {
        question: "What products do you use for hair care?",
        answer: "Regular shampoo and conditioner"
      }
    ]
  },
  11: {
    id: 11,
    name: "Rajesh Tiwari",
    age: 50,
    doctorName: "Dr. Prakash Shetty",
    date: "2024-02-03",
    problem: "Diabetes management",
    status: "In Treatment",
    lastVisit: "2024-01-25",
    symptoms: [
      "Frequent urination",
      "Increased thirst",
      "Fatigue",
      "Slow wound healing"
    ],
    medications: {
      immediate: "Methi (fenugreek) seeds water - daily morning",
      followUp: "Vijaysar powder - 1 tsp with warm water twice daily"
    },
    questions: [
      {
        question: "How long have you been diabetic?",
        answer: "Diagnosed 5 years ago"
      },
      {
        question: "Is your blood sugar level under control?",
        answer: "Fluctuates often despite medication"
      },
      {
        question: "What is your current diet plan?",
        answer: "Low sugar but still struggle with cravings"
      }
    ]
  },
  12: {
    id: 12,
    name: "Suman Das",
    age: 38,
    doctorName: "Dr. Anil Kumar",
    date: "2024-02-04",
    problem: "Constipation",
    status: "Pending",
    lastVisit: "2024-01-28",
    symptoms: [
      "Irregular bowel movements",
      "Abdominal discomfort",
      "Bloating",
      "Dry stool"
    ],
    medications: {
      immediate: "Isabgol (psyllium husk) - 1 tsp with warm water at night",
      followUp: "Triphala powder - 1 tsp with warm water daily"
    },
    questions: [
      {
        question: "How often do you have bowel movements?",
        answer: "Once every 2-3 days"
      },
      {
        question: "Have you made any dietary changes recently?",
        answer: "Reduced fiber intake unintentionally"
      },
      {
        question: "Do you drink enough water daily?",
        answer: "No, I drink very little water"
      }
    ]
  },
  13: {
    id: 13,
    name: "Meera Singh",
    age: 42,
    doctorName: "Dr. Kavitha Reddy",
    date: "2024-02-05",
    problem: "Chronic fatigue",
    status: "Pending",
    lastVisit: "2024-01-20",
    symptoms: [
      "Lack of energy",
      "Difficulty concentrating",
      "Irritability",
      "Unrefreshing sleep"
    ],
    medications: {
      immediate: "Ashwagandha and Guduchi tea - twice daily",
      followUp: "Brahmi capsules - once daily for a month"
    },
    questions: [
      {
        question: "How long have you been feeling fatigued?",
        answer: "For the past year"
      },
      {
        question: "Do you sleep well at night?",
        answer: "Not really, I often wake up tired"
      },
      {
        question: "Have you tried any remedies for this?",
        answer: "Only basic vitamins, no significant results"
      }
    ]
  },
  14: {
    id: 14,
    name: "Kiran Agarwal",
    age: 60,
    doctorName: "Dr. Shalini Singh",
    date: "2024-02-06",
    problem: "Arthritis",
    status: "In Treatment",
    lastVisit: "2024-01-28",
    symptoms: [
      "Joint pain",
      "Swelling in knees",
      "Difficulty climbing stairs",
      "Morning stiffness"
    ],
    medications: {
      immediate: "Rasana and Shallaki capsules - twice daily",
      followUp: "Mahanarayan oil massage - twice daily for 2 weeks"
    },
    questions: [
      {
        question: "When were you diagnosed with arthritis?",
        answer: "About 7 years ago"
      },
      {
        question: "Do you find any specific activities worsen your pain?",
        answer: "Yes, prolonged standing or walking"
      },
      {
        question: "Have you tried physical therapy?",
        answer: "Not regularly, but occasionally"
      }
    ]
  },
  15: {
    id: 15,
    name: "Tanvi Mehta",
    age: 20,
    doctorName: "Dr. Radhika Shah",
    date: "2024-02-07",
    problem: "Stress-induced headaches",
    status: "Pending",
    lastVisit: "2024-01-30",
    symptoms: [
      "Frequent headaches",
      "Neck tension",
      "Irritability",
      "Sleep disturbances"
    ],
    medications: {
      immediate: "Chandanadi taila application on forehead",
      followUp: "Jatamansi capsules - once daily for a month"
    },
    questions: [
      {
        question: "How often do you experience headaches?",
        answer: "Almost every day"
      },
      {
        question: "Do you spend long hours on screens?",
        answer: "Yes, due to online classes"
      },
      {
        question: "Have you tried relaxation techniques?",
        answer: "No, but I’m open to trying yoga"
      }
    ]
  }
  
};

// Helper functions to work with the data
export const getAllPatients = () => Object.values(patientsData);
export const getPatientById = (id) => patientsData[id] || null;

export default patientsData;
