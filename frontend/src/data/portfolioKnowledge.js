// Knowledge Base for Marelign Yimer's Portfolio RAG Assistant
export const PORTFOLIO_KNOWLEDGE = [
  {
    id: 'bio_summary',
    category: 'About & Background',
    keywords: ['who', 'about', 'bio', 'marelign', 'yimer', 'summary', 'introduce', 'developer', 'background', 'profile'],
    content: `Marelign Yimer is a passionate Full-Stack Developer and Software Engineer with 3+ years of hands-on experience building scalable web and mobile applications, enterprise ERP systems, and AI-powered solutions. He holds a BSc in Computer Science from Bahir Dar University (CGPA 3.65, Exit Exam 78%). His philosophy: "I don't just write code — I solve problems, lead with empathy, and build with the end-user always in mind." He bridges design and development to turn complex business requirements into fast, maintainable, and high-performance systems.`
  },
  {
    id: 'education_details',
    category: 'Education',
    keywords: ['education', 'degree', 'university', 'college', 'gpa', 'cgpa', 'exit exam', 'bahir dar', 'bdu', 'study', 'graduate', 'computer science'],
    content: `Education Summary:
- Degree: Bachelor of Science (BSc) in Computer Science
- Institution: Bahir Dar University (BDU), Ethiopia (2023 - 2026)
- Academic Performance: CGPA of 3.65 / 4.00, National Exit Exam score: 78%.
- Core Focus: Full-Stack Development, Data Structures & Algorithms, Database Systems, Software Architecture, Distributed Systems, and Artificial Intelligence.`
  },
  {
    id: 'experience_timeline',
    category: 'Work Experience',
    keywords: ['experience', 'work', 'job', 'career', 'history', 'role', 'company', 'positions', 'mentoring'],
    content: `Professional Experience:
1. Full-Stack Developer (2025 - Present):
   - Lead and advance the development of scalable web and mobile applications using React, React Native (Expo), Node.js, Express, Golang (Gin), MySQL, and ORM.
   - Mentoring junior developers, reviewing code, and establishing engineering best practices.
2. Junior Full-Stack Developer at Bahir Dar University (2024 - 2025):
   - Developed and maintained multiple academic and institutional web applications using MERN stack (MongoDB, Express, React, Node.js).
3. Foundations & Algorithms (2023):
   - Intensive focus on low-level programming logic, algorithms, and software engineering principles.`
  },
  {
    id: 'skills_technical',
    category: 'Technical Skills',
    keywords: ['skills', 'tech stack', 'technologies', 'programming', 'languages', 'frontend', 'backend', 'database', 'tools', 'frameworks', 'react', 'node', 'golang', 'python'],
    content: `Comprehensive Technical Skills:
- Frontend: React.js (95%), JavaScript ES6+ (95%), HTML5 & CSS3 (95%), Tailwind CSS (95%), Bootstrap (80%), React Native & Expo (Mobile).
- Backend: Node.js (95%), Express.js (95%), RESTful APIs (90%), Golang & Gin framework (80%), FastAPI (Python), WebSockets (Socket.io).
- Databases & ORMs: MongoDB (90%), MySQL (90%), PostgreSQL, GORM (Go), Sequelize ORM, Supabase, Vector Database (MongoDB Atlas Vector Search).
- DevOps & Tools: Git & GitHub (90%), Docker containerization (80%), Postman (75%), Kafka, CI/CD workflows.
- Soft Skills: Team Leadership & Mentoring (95%), Problem Solving (90%), Professional Communication (90%), Empathy, and Agile Collaboration.`
  },
  {
    id: 'project_erp',
    category: 'Projects',
    keywords: ['erp', 'vector', 'advert', 'manufacturing', 'enterprise', 'production', 'inventory', 'warehouse', 'supply chain', 'accounting', 'hr', 'flagship'],
    content: `Project 1: Vector Advert & Manufacturing – Complete ERP System
- Overview: Full-scale Enterprise Resource Planning (ERP) platform architected, built, and deployed for Vector Advert & Manufacturing Company.
- Features: Real-time production tracking, multi-warehouse inventory management, supply chain operations, advertising campaign manager, HR/employee portal, accounting & finance, CRM, and executive live analytics dashboards with role-based access control.
- Tech Stack: React, Node.js, Express, PostgreSQL with ORM, Supabase microservices, WebSockets, REST APIs.
- Status: In active production use by the enterprise. Live URL: https://vectoradvert.com/erp`
  },
  {
    id: 'project_ecommerce',
    category: 'Projects',
    keywords: ['amazon', 'ecommerce', 'shop', 'store', 'ethiopian amazon', 'chapa', 'golang', 'gin', 'kafka', 'payment'],
    content: `Project 2: Amazon Ethiopia E-Commerce Platform
- Overview: Full-featured Ethiopian Amazon clone with microservices architecture and payment processing.
- Features: Multi-role authentication (Admin, Seller, Buyer, Delivery agent), real-time order tracking, Chapa payment gateway integration, product catalog management.
- Tech Stack: React, Golang (Gin framework), MySQL (GORM), Chapa API, Kafka, Docker containers.
- GitHub: https://github.com/mareligncode/ethiopian-amazon`
  },
  {
    id: 'project_ai_tutor',
    category: 'Projects & Awards',
    keywords: ['hackathon', 'ai tutor', 'winner', 'first place', 'future impact', 'award', 'autonomous', 'learning'],
    content: `Project 3: Future Impact AI Tutor (1st Place Hackathon Winner)
- Overview: Autonomous AI-powered learning platform built in 48 hours that won 1st Place at the Bahir Dar University AI Hackathon.
- Features: AI study planning, dynamic course generator, presentation builder, automated study notes, smart web & YouTube search integration.
- Tech Stack: React, FastAPI, MySQL (Sequelize), Socket.io, Tailwind CSS.
- GitHub: https://github.com/mareligncode/complete_ai_tutor | YouTube Demo: https://youtu.be/eFTHgxV-pUI`
  },
  {
    id: 'project_student_assistant',
    category: 'Projects',
    keywords: ['student assistant', 'ai student', 'langchain', 'langgraph', 'gemini', 'openai', 'vector database', 'ethiopian curriculum', 'mobile app'],
    content: `Project 4: Ethiopian Student AI Assistant
- Overview: Dual web and mobile AI assistant specifically trained on the Ethiopian national school curriculum.
- Features: Google Gemini and OpenAI integration via LangChain & LangGraph, vector semantic search over textbook materials, interactive quiz generation. Marelign contributed 50% across backend and cross-platform mobile frontend.
- Tech Stack: React, React Native (Expo), Node.js, Express, LangChain, LangGraph, MongoDB Atlas Vector DB.
- GitHub: https://github.com/fsr-software-solution/School-eAssistant`
  },
  {
    id: 'project_other_notable',
    category: 'Projects',
    keywords: ['car rental', 'farmer', 'farmlink', 'agriculture', 'job recruitment', 'resume scout', 'transportation', 'hotel hr'],
    content: `Other Notable Projects:
- Car Rental System: Complete online vehicle rental platform with Chapa payment & live reservation tracking (React, Node.js, Express, MongoDB, Socket.io). Live: https://car-rental-system-web-application-2.onrender.com/
- FarmLink Ethiopia (AI Farmer Assistant): AI agricultural expert assisting farmers with crop disease diagnosis, pest control, weather forecasts, and market prices (React, Supabase, Express, Node.js, Gemini). Live: https://professor-agri.lovable.app
- Resume Scout Pro (AI Job Recruitment): AI talent-matching platform connecting clients and Ethiopian freelancers with automated CV skill verification. Live: https://cve-finder-mobile-ui.lovable.app
- Bahir Dar Transportation System: CS Graduating project digitizing bus/transport ticketing to eliminate queues and ticket scams.
- Hotel HR Management System: Enterprise multi-actor HR system with 6 distinct role tiers (React, Express, MySQL Sequelize).`
  },
  {
    id: 'certificates_awards',
    category: 'Certifications & Honors',
    keywords: ['certificates', 'certification', 'awards', 'hackathon winner', 'demera', 'codveda', 'exit exam', 'diploma'],
    content: `Certifications & Honors:
1. 1st Place Winner - BDU Computing Association AI Hackathon (2026): Honored for developing an autonomous AI-driven educational platform.
2. 3-Month Dedicated Full Stack Development Training - Demera Percipio Tech (Dec 2025): Specialized professional training in modern enterprise development.
3. MERN Full Stack Web Development Certification - Codveda (Nov 2025): Mastery in React, Node.js, Express, and modern DB systems.
4. BSc in Computer Science with Distinction - Bahir Dar University (June 2026): CGPA 3.65, Exit Exam 78%.`
  },
  {
    id: 'contact_hiring',
    category: 'Contact & Hiring',
    keywords: ['contact', 'hire', 'email', 'phone', 'reach', 'telegram', 'linkedin', 'github', 'available', 'freelance', 'remote', 'location'],
    content: `Contact & Availability Details:
- Availability: Open to full-time remote engineering roles, contract work, and high-impact freelance projects worldwide.
- Email: yimermarelign@gmail.com
- Phone / WhatsApp: +251 945 342 453
- Location: Ethiopia (Works across all global time zones remotely)
- GitHub: https://github.com/mareligncode
- LinkedIn: https://www.linkedin.com/in/marelign-yimer-298635369/
- Telegram: https://t.me/marelignY
- Typical Response Time: Within 24 hours.`
  }
]
