# Full-Stack Developer Portfolio

A premium, modern, and professional full-stack developer portfolio website built with React, Node.js, Express, and MongoDB. This portfolio is designed to impress international clients, recruiters, and tech companies globally.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **Dark/Light Mode**: Toggle between dark and light themes
- **Full-Stack Contact Form**: Backend API with MongoDB integration
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Smooth Animations**: Professional transitions and hover effects
- **SEO Optimized**: Meta tags and semantic HTML
- **Easy to Customize**: Well-structured code for easy modifications

## 📋 Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS (CDN)
- Font Awesome Icons
- Google Fonts (Inter)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Express Validator
- CORS

## 📁 Project Structure

```
fianal-portfolio/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Resume.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Footer.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
├── backend/
│   ├── models/
│   │   └── Contact.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

4. Edit the `.env` file and add your MongoDB connection string:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/portfolio
```

**For MongoDB Atlas (Cloud):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
```

5. Start the backend server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The backend API will be available at `http://localhost:5000`

### MongoDB Setup

#### Option 1: Local MongoDB

1. Install MongoDB locally from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/portfolio`

#### Option 2: MongoDB Atlas (Cloud - Recommended)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string and add it to `.env`

## 🎨 Customization Guide

### Adding Your Projects

Edit `frontend/src/components/Projects.jsx` and update the `projects` array:

```jsx
const projects = [
  {
    id: 1,
    title: 'Your Project Title',
    description: 'Project description...',
    image: 'path/to/image.jpg',
    techStack: ['React', 'Node.js', 'MongoDB'],
    github: 'https://github.com/yourusername/project',
    live: 'https://yourproject.com',
  },
  // Add more projects...
]
```

### Updating Personal Information

1. **About Section**: Edit `frontend/src/components/About.jsx`
2. **Skills**: Edit `frontend/src/components/Skills.jsx`
3. **Resume**: Edit `frontend/src/components/Resume.jsx`
4. **Contact Info**: Edit `frontend/src/components/Contact.jsx` and `Footer.jsx`
5. **Social Links**: Update links in `Header.jsx`, `Contact.jsx`, and `Footer.jsx`

### Changing Colors

The portfolio uses a purple-pink gradient theme. To change colors:

1. Update gradient classes in components (search for `purple-500`, `pink-500`)
2. Update gradient text in `App.css`
3. Update Tailwind config in `index.html` if needed

### Adding Resume PDF

1. Place your resume PDF in `frontend/public/resume.pdf`
2. The download buttons will automatically work

## 📡 API Endpoints

### POST `/api/contact`
Submit a contact form message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'm interested in working with you."
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Message sent successfully!",
  "data": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### GET `/api/contacts`
Get all contact messages (for admin purposes).

### GET `/api/health`
Health check endpoint.

## 🚀 Deployment

### Frontend Deployment

1. Build the production version:
```bash
cd frontend
npm run build
```

2. Deploy the `dist` folder to:
   - Vercel (recommended)
   - Netlify
   - GitHub Pages
   - Any static hosting service

**Important**: Update the API URL in `Contact.jsx` to your production backend URL.

### Backend Deployment

1. Deploy to:
   - Heroku
   - Railway
   - Render
   - DigitalOcean
   - AWS/Google Cloud/Azure

2. Set environment variables in your hosting platform:
   - `PORT` (usually auto-set by hosting)
   - `MONGODB_URI` (your MongoDB connection string)
   - `NODE_ENV=production`

3. Update CORS settings in `server.js` if needed to allow your frontend domain.

## 🐛 Troubleshooting

### Contact Form Not Working

1. Check if backend server is running
2. Verify MongoDB connection
3. Check browser console for errors
4. Verify API URL in `Contact.jsx` matches your backend URL
5. Check CORS settings in backend

### MongoDB Connection Issues

1. Verify MongoDB is running (if local)
2. Check connection string in `.env`
3. Verify network access (for Atlas)
4. Check MongoDB logs

### Build Errors

1. Clear `node_modules` and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

2. Check Node.js version (should be v18+)

## 📝 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

## 📧 Support

For issues or questions, please open an issue on GitHub or contact through the portfolio contact form.

---

**Built with ❤️ by a Full-Stack Developer**

