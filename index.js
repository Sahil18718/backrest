const express = require('express');
const mongoose = require('mongoose');



// Connect to the MongoDB database
mongoose.connect('mongodb+srv://sahil:sahilmalviya@cluster0.hhowf26.mongodb.net/Unit5ev2?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to the database'))
  .catch((error) => console.error('Database connection error:', error));

// Define the schemas for User, Quiz, and Leaderboard
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});




const quizSchema = new mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  questions: [
    {
      title: { type: String, required: true },
      answerOptions: { type: [String], required: true },
      correctOptions: { type: [Number], required: true },
    },
  ],
});




const leaderboardSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  email: { type: String, required: true },
  score: { type: Number, required: true },
});

// Define the models for User, Quiz, and Leaderboard
const User = mongoose.model('User', userSchema);
const Quiz = mongoose.model('Quiz', quizSchema);
const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

// Create the Express app
const app = express();
app.use(express.json());

// Register user route
app.post('/register', async (req, res) => {
  try {
    const { username, email } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      // User already exists, redirect to the Dashboard page
      return res.redirect('/dashboard');
    }
    user = new User({ username, email });
    await user.save();
    // User registered successfully, redirect to the Dashboard page
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error registering user:', error);
    res.sendStatus(500);
  }
});





// Create quiz route
app.post('/quizzes', async (req, res) => {
  try {
    const { creator, title, description, questions } = req.body;
    const quiz = new Quiz({ creator, title, description, questions });
    await quiz.save();
    res.sendStatus(200);
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.sendStatus(500);
  }
});

// Fetch quizzes route
app.get('/quizzes', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.sendStatus(500);
  }
});

// Fetch quiz route
app.get('/quizzes/:id', async (req, res) => {
  try {
    const quizId = req.params.id;
    const quiz = await Quiz.findById(quizId);
    res.json(quiz);
  } catch (error) {
    console.error('Error fetching quiz:', error);
    res.sendStatus(500);
  }
});

// Fetch leaderboard route
app.get('/quizzes/:id/leaderboard', async (req, res) => {
  try {
    const quizId = req.params.id;
    const leaderboard = await Leaderboard.find({ quiz: quizId }).sort({ score: -1 });
    res.json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.sendStatus(500);
  }
});

// Delete quiz route
app.delete('/quizzes/:id', async (req, res) => {
  try {
    const quizId = req.params.id;
    await Quiz.findByIdAndDelete(quizId);
    // Delete the corresponding leaderboard entries for the quiz
    await Leaderboard.deleteMany({ quiz: quizId });
    res.sendStatus(200);
  } catch (error) {
    console.error('Error deleting quiz:', error);
    res.sendStatus(500);
  }
});

// Update quiz route
app.put('/quizzes/:id', async (req, res) => {
  try {
    const quizId = req.params.id;
    const { title, description } = req.body;
    await Quiz.findByIdAndUpdate(quizId, { title, description });
    res.sendStatus(200);
  } catch (error) {
    console.error('Error updating quiz:', error);
    res.sendStatus(500);
  }
});

// Submit quiz route
app.post('/quizzes/:id/submit', async (req, res) => {
  try {
    const quizId = req.params.id;
    const { email, score } = req.body;
    const leaderboardEntry = new Leaderboard({ quiz: quizId, email, score });
    await leaderboardEntry.save();
    res.sendStatus(200);
  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.sendStatus(500);
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
