/* ============================================================
   FutureMatch AI — data.js
   Central data store. In a real product this would come from
   an API; here it is local JSON so the whole app runs offline.
   ============================================================ */

/* ---------- Careers ---------- */
const CAREERS = [
  {
    id: "software-developer",
    title: "Software Developer",
    icon: "fa-solid fa-code",
    field: "ICT",
    description: "Design, build and maintain applications and systems that power businesses across Kenya and beyond.",
    salaryRange: "KES 45,000 – 180,000 / month",
    demand: 92,
    skills: ["JavaScript", "Problem Solving", "Python", "Git", "Databases"],
    interests: ["Technology", "Building Things", "Problem Solving"],
    resources: [
      { name: "freeCodeCamp — Full Stack Curriculum", type: "Course" },
      { name: "ALX Software Engineering Programme", type: "Bootcamp" },
      { name: "The Odin Project", type: "Course" }
    ]
  },
  {
    id: "cybersecurity-analyst",
    title: "Cybersecurity Analyst",
    icon: "fa-solid fa-shield-halved",
    field: "ICT",
    description: "Protect organisations from digital threats by monitoring networks, investigating incidents and hardening systems.",
    salaryRange: "KES 50,000 – 200,000 / month",
    demand: 88,
    skills: ["Networking", "Linux", "Risk Analysis", "Ethical Hacking"],
    interests: ["Technology", "Security", "Investigation"],
    resources: [
      { name: "CompTIA Security+", type: "Certification" },
      { name: "TryHackMe — SOC Level 1", type: "Course" },
      { name: "Cisco Cybersecurity Essentials", type: "Course" }
    ]
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    icon: "fa-solid fa-chart-line",
    field: "ICT",
    description: "Turn raw data into insights that guide business and policy decisions using statistics and visualisation.",
    salaryRange: "KES 40,000 – 150,000 / month",
    demand: 85,
    skills: ["Excel", "SQL", "Statistics", "Data Visualization"],
    interests: ["Numbers", "Problem Solving", "Technology"],
    resources: [
      { name: "Google Data Analytics Certificate", type: "Certification" },
      { name: "Kaggle Micro-courses", type: "Course" },
      { name: "SQLBolt", type: "Course" }
    ]
  },
  {
    id: "ai-engineer",
    title: "AI Engineer",
    icon: "fa-solid fa-robot",
    field: "ICT",
    description: "Build and train machine learning models that automate tasks and power intelligent products.",
    salaryRange: "KES 70,000 – 250,000 / month",
    demand: 90,
    skills: ["Python", "Machine Learning", "Mathematics", "Data Structures"],
    interests: ["Technology", "Innovation", "Problem Solving"],
    resources: [
      { name: "DeepLearning.AI — ML Specialization", type: "Course" },
      { name: "Fast.ai Practical Deep Learning", type: "Course" },
      { name: "Kaggle Competitions", type: "Practice" }
    ]
  },
  {
    id: "cloud-engineer",
    title: "Cloud Engineer",
    icon: "fa-solid fa-cloud",
    field: "ICT",
    description: "Design and manage the cloud infrastructure that keeps modern applications running reliably at scale.",
    salaryRange: "KES 60,000 – 220,000 / month",
    demand: 83,
    skills: ["AWS", "Linux", "Networking", "DevOps"],
    interests: ["Technology", "Systems", "Building Things"],
    resources: [
      { name: "AWS Cloud Practitioner", type: "Certification" },
      { name: "KodeKloud DevOps Path", type: "Course" },
      { name: "Google Cloud Skills Boost", type: "Course" }
    ]
  },
  {
    id: "network-administrator",
    title: "Network Administrator",
    icon: "fa-solid fa-network-wired",
    field: "ICT",
    description: "Keep organisational networks fast, secure and available by configuring and maintaining infrastructure.",
    salaryRange: "KES 35,000 – 120,000 / month",
    demand: 74,
    skills: ["Networking", "Troubleshooting", "Linux", "Hardware"],
    interests: ["Technology", "Systems", "Hands-on Work"],
    resources: [
      { name: "Cisco CCNA", type: "Certification" },
      { name: "Network+ Study Guide", type: "Course" },
      { name: "Packet Tracer Labs", type: "Practice" }
    ]
  },
  {
    id: "electrical-technician",
    title: "Electrical Technician",
    icon: "fa-solid fa-bolt",
    field: "Engineering",
    description: "Install, maintain and repair electrical systems in homes, industries and infrastructure projects.",
    salaryRange: "KES 30,000 – 100,000 / month",
    demand: 78,
    skills: ["Circuit Design", "Wiring", "Safety Standards", "Hands-on Work"],
    interests: ["Hands-on Work", "Building Things", "Engineering"],
    resources: [
      { name: "NITA Electrical Trade Test", type: "Certification" },
      { name: "TVET Electrical Installation Course", type: "Course" },
      { name: "KEBS Electrical Safety Guide", type: "Reference" }
    ]
  },
  {
    id: "mechanical-technician",
    title: "Mechanical Technician",
    icon: "fa-solid fa-gears",
    field: "Engineering",
    description: "Diagnose, repair and maintain mechanical systems and machinery across industries and automotive sectors.",
    salaryRange: "KES 30,000 – 110,000 / month",
    demand: 76,
    skills: ["Mechanics", "Blueprint Reading", "Welding", "Hands-on Work"],
    interests: ["Hands-on Work", "Engineering", "Building Things"],
    resources: [
      { name: "NITA Mechanical Trade Test", type: "Certification" },
      { name: "TVET Automotive Engineering Course", type: "Course" },
      { name: "Machinery Maintenance Basics", type: "Course" }
    ]
  },
  {
    id: "digital-marketer",
    title: "Digital Marketer",
    icon: "fa-solid fa-bullhorn",
    field: "Business",
    description: "Grow brands online through content, social media, SEO and data-driven advertising campaigns.",
    salaryRange: "KES 35,000 – 130,000 / month",
    demand: 80,
    skills: ["Content Creation", "SEO", "Social Media", "Analytics"],
    interests: ["Creativity", "Communication", "Business"],
    resources: [
      { name: "Google Digital Marketing Certificate", type: "Certification" },
      { name: "HubSpot Academy", type: "Course" },
      { name: "Meta Blueprint", type: "Course" }
    ]
  },
  {
    id: "graphic-designer",
    title: "Graphic Designer",
    icon: "fa-solid fa-palette",
    field: "Creative",
    description: "Communicate ideas visually through branding, illustration and digital design for print and web.",
    salaryRange: "KES 30,000 – 120,000 / month",
    demand: 79,
    skills: ["Adobe Creative Suite", "Typography", "Branding", "Creativity"],
    interests: ["Creativity", "Design", "Art"],
    resources: [
      { name: "Canva Design School", type: "Course" },
      { name: "Adobe Illustrator Essentials", type: "Course" },
      { name: "Behance Portfolio Building", type: "Practice" }
    ]
  }
];

/* ---------- Jobs & Internships ---------- */
const JOBS = [
  { id: 1, title: "Junior Frontend Developer", company: "Twiga Tech Solutions", location: "Nairobi", type: "Full-time", field: "software-developer", posted: "2 days ago", salary: "KES 60,000 – 90,000", logo: "TT" },
  { id: 2, title: "IT Support Intern", company: "SafeConnect Kenya", location: "Nairobi", type: "Internship", field: "network-administrator", posted: "5 days ago", salary: "KES 15,000 stipend", logo: "SC" },
  { id: 3, title: "Data Analyst Trainee", company: "Amber Analytics", location: "Kisumu", type: "Internship", field: "data-analyst", posted: "1 day ago", salary: "KES 20,000 stipend", logo: "AA" },
  { id: 4, title: "SOC Analyst (Entry Level)", company: "Cyberwall Africa", location: "Nairobi", type: "Full-time", field: "cybersecurity-analyst", posted: "3 days ago", salary: "KES 65,000 – 95,000", logo: "CA" },
  { id: 5, title: "Machine Learning Intern", company: "Kito AI Labs", location: "Remote", type: "Internship", field: "ai-engineer", posted: "6 hours ago", salary: "KES 25,000 stipend", logo: "KI" },
  { id: 6, title: "Cloud Support Associate", company: "Baraka Cloud Systems", location: "Nairobi", type: "Full-time", field: "cloud-engineer", posted: "1 week ago", salary: "KES 70,000 – 110,000", logo: "BC" },
  { id: 7, title: "Electrical Installation Technician", company: "Voltage Kenya Ltd", location: "Nakuru", type: "Full-time", field: "electrical-technician", posted: "4 days ago", salary: "KES 35,000 – 55,000", logo: "VK" },
  { id: 8, title: "Automotive Mechanic Apprentice", company: "Simba Motors", location: "Mombasa", type: "Apprenticeship", field: "mechanical-technician", posted: "2 days ago", salary: "KES 18,000 stipend", logo: "SM" },
  { id: 9, title: "Social Media & Digital Marketing Intern", company: "Boma Brands Agency", location: "Nairobi", type: "Internship", field: "digital-marketer", posted: "3 days ago", salary: "KES 15,000 stipend", logo: "BB" },
  { id: 10, title: "Junior Graphic Designer", company: "Studio Nyota", location: "Nairobi", type: "Part-time", field: "graphic-designer", posted: "12 hours ago", salary: "KES 30,000 – 45,000", logo: "SN" },
  { id: 11, title: "Backend Developer (Node.js)", company: "Twiga Tech Solutions", location: "Remote", type: "Full-time", field: "software-developer", posted: "5 days ago", salary: "KES 80,000 – 130,000", logo: "TT" },
  { id: 12, title: "Network Support Technician", company: "SafeConnect Kenya", location: "Eldoret", type: "Full-time", field: "network-administrator", posted: "1 week ago", salary: "KES 40,000 – 60,000", logo: "SC" }
];

/* ---------- Skill Assessment Questions ---------- */
const QUIZ_QUESTIONS = [
  { id: 1, question: "Which activity sounds most enjoyable to you?", options: [
      { text: "Writing code to automate a task", tags: ["software-developer", "ai-engineer"] },
      { text: "Fixing a wiring or engine problem", tags: ["electrical-technician", "mechanical-technician"] },
      { text: "Designing a poster or logo", tags: ["graphic-designer"] },
      { text: "Analysing numbers in a spreadsheet", tags: ["data-analyst"] }
  ]},
  { id: 2, question: "A company's website goes down. What interests you most about the situation?", options: [
      { text: "Investigating if it was a security breach", tags: ["cybersecurity-analyst"] },
      { text: "Diagnosing the server / cloud infrastructure", tags: ["cloud-engineer", "network-administrator"] },
      { text: "Rewriting the buggy code", tags: ["software-developer"] },
      { text: "Communicating the issue to customers online", tags: ["digital-marketer"] }
  ]},
  { id: 3, question: "Which school subject did you enjoy most?", options: [
      { text: "Mathematics & Computer Studies", tags: ["software-developer", "data-analyst", "ai-engineer"] },
      { text: "Physics & Electrical Technology", tags: ["electrical-technician"] },
      { text: "Art & Design", tags: ["graphic-designer"] },
      { text: "Business Studies", tags: ["digital-marketer"] }
  ]},
  { id: 4, question: "How do you prefer to solve problems?", options: [
      { text: "Breaking them into logical steps", tags: ["software-developer", "data-analyst"] },
      { text: "Using my hands and tools", tags: ["mechanical-technician", "electrical-technician"] },
      { text: "Researching and protecting against risks", tags: ["cybersecurity-analyst"] },
      { text: "Thinking creatively and visually", tags: ["graphic-designer"] }
  ]},
  { id: 5, question: "Pick a dream project:", options: [
      { text: "Build an app used by thousands of people", tags: ["software-developer"] },
      { text: "Train an AI model to recognise images", tags: ["ai-engineer"] },
      { text: "Design a brand from scratch", tags: ["graphic-designer"] },
      { text: "Launch a viral marketing campaign", tags: ["digital-marketer"] }
  ]},
  { id: 6, question: "Which environment excites you most?", options: [
      { text: "A workshop full of tools and machines", tags: ["mechanical-technician", "electrical-technician"] },
      { text: "A server room / data centre", tags: ["cloud-engineer", "network-administrator"] },
      { text: "A design studio", tags: ["graphic-designer"] },
      { text: "A security operations centre", tags: ["cybersecurity-analyst"] }
  ]},
  { id: 7, question: "What motivates you most at work?", options: [
      { text: "Solving technical puzzles", tags: ["software-developer", "ai-engineer", "data-analyst"] },
      { text: "Protecting people and systems", tags: ["cybersecurity-analyst"] },
      { text: "Creating something visually beautiful", tags: ["graphic-designer"] },
      { text: "Growing a business or brand", tags: ["digital-marketer"] }
  ]},
  { id: 8, question: "Which tool would you rather master?", options: [
      { text: "A programming language", tags: ["software-developer", "ai-engineer"] },
      { text: "A multimeter and wiring kit", tags: ["electrical-technician"] },
      { text: "SQL and Excel", tags: ["data-analyst"] },
      { text: "Adobe Photoshop / Illustrator", tags: ["graphic-designer"] }
  ]}
];

/* ---------- Testimonials ---------- */
const TESTIMONIALS = [
  { name: "Faith Wanjiru", role: "Software Development Student, Kabete NPTC", quote: "FutureMatch AI showed me a career path I didn't even know existed. Within weeks I landed an internship interview.", avatar: "FW" },
  { name: "Brian Otieno", role: "Electrical Engineering Student, Eldoret NPTC", quote: "The skill assessment was spot on. It matched me to technician roles that fit exactly what I'm good at.", avatar: "BO" },
  { name: "Amina Hassan", role: "Business Studies Student, Mombasa Technical", quote: "I used the learning roadmap to close my skill gaps before applying for marketing internships. It worked!", avatar: "AH" },
  { name: "Peter Mwangi", role: "ICT Student, Nyeri National Polytechnic", quote: "Seeing my career match score improve as I learned new skills kept me motivated every single week.", avatar: "PM" }
];

/* ---------- Team ---------- */
const TEAM = [
  { name: "Kevin Kipchumba", role: "Team Lead / Primary Contact & AI & Data Specialist", avatar: "KK" },
  { name: "Hildah Jebichi Tewo", role: "Software Developer (Backend)", avatar: "HJ" },
  { name: "Dismas Kiptoo", role: "Operations, Research & Support", avatar: "DK" },
  { name: "Caleb Kibiwott", role: "Business & Marketing Lead", avatar: "CK" },
  { name: "Brian Kipchumba", role: "Frontend Developer (UI/UX)", avatar: "BK" }
];

/* ---------- Skills master list (for registration & assessment) ---------- */
const SKILL_OPTIONS = [
  "JavaScript", "Python", "Excel", "SQL", "Networking", "Linux", "Wiring",
  "Welding", "Mechanics", "Adobe Creative Suite", "Content Creation", "SEO",
  "Problem Solving", "Communication", "Data Visualization", "Machine Learning"
];

const INTEREST_OPTIONS = [
  "Technology", "Engineering", "Business", "Creativity", "Hands-on Work",
  "Security", "Numbers", "Design", "Innovation", "Communication"
];

/* ---------- Platform-wide stats (used on landing + admin) ---------- */
const PLATFORM_STATS = {
  students: 12480,
  employers: 340,
  jobsPosted: 1860,
  placementRate: 78
};
