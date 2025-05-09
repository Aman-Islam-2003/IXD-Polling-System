// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { PollResponse, PollResults } = require('./models/model');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Routes

// Submit poll response
app.post('/api/poll/submit', async (req, res) => {
  try {
    const { responses } = req.body;
    
    // Create new poll response
    const pollResponse = new PollResponse({
      responses: responses,
      submittedAt: new Date()
    });
    
    await pollResponse.save();
    
    // Update aggregated results
    const skills = Object.keys(responses);
    
    for (const skill of skills) {
      const { selfTaught, schoolTaught } = responses[skill];
      
      // Find and update or create results for this skill
      await PollResults.findOneAndUpdate(
        { skill },
        { 
          $inc: { 
            selfTaughtTotal: selfTaught,
            schoolTaughtTotal: schoolTaught,
            responseCount: selfTaught > 0 || schoolTaught > 0 ? 1 : 0
          } 
        },
        { upsert: true, new: true }
      );
    }
    
    res.status(201).json({ message: 'Poll response submitted successfully' });
  } catch (error) {
    console.error('Error submitting poll response:', error);
    res.status(500).json({ message: 'Failed to submit poll response' });
  }
});

// Get aggregated poll results
app.get('/api/poll/results', async (req, res) => {
  try {
    const results = await PollResults.find();
    
    // Transform data for frontend
    const formattedResults = {};
    
    results.forEach(result => {
      formattedResults[result.skill] = {
        selfTaught: result.selfTaughtTotal,
        schoolTaught: result.schoolTaughtTotal
      };
    });
    
    res.json(formattedResults);
  } catch (error) {
    console.error('Error fetching poll results:', error);
    res.status(500).json({ message: 'Failed to fetch poll results' });
  }
});

// Get total number of poll submissions
app.get('/api/poll/stats', async (req, res) => {
  try {
    const totalSubmissions = await PollResponse.countDocuments();
    res.json({ totalSubmissions });
  } catch (error) {
    console.error('Error fetching poll stats:', error);
    res.status(500).json({ message: 'Failed to fetch poll stats' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});