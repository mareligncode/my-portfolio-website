# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**
```bash
cd backend
npm install
```

### Step 2: Set Up MongoDB

**Option A: Local MongoDB**
- Install MongoDB locally
- Start MongoDB service
- No additional setup needed

**Option B: MongoDB Atlas (Cloud - Recommended)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster
4. Create a database user
5. Whitelist IP (0.0.0.0/0 for development)
6. Copy connection string

### Step 3: Configure Backend

Create `backend/.env` file:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/portfolio
```

Or for MongoDB Atlas:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

### Step 4: Start Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Step 5: Open Browser

Visit: `http://localhost:5173`

## ✅ You're Done!

The portfolio is now running locally. Customize the content in the component files to make it your own!

## 📝 Next Steps

1. Update personal information in components
2. Add your real projects to `Projects.jsx`
3. Add your resume PDF to `frontend/public/resume.pdf`
4. Update social media links
5. Customize colors and styling

## 🐛 Troubleshooting

**Backend won't start?**
- Check if MongoDB is running
- Verify `.env` file exists and has correct MongoDB URI
- Check if port 5000 is available

**Frontend won't start?**
- Check if port 5173 is available
- Try deleting `node_modules` and reinstalling

**Contact form not working?**
- Make sure backend is running on port 5000
- Check browser console for errors
- Verify MongoDB connection

