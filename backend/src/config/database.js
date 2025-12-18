const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookmyshow';
		await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			serverSelectionTimeoutMS: 5000
		});
		console.log('✅ MongoDB connected successfully');
	} catch (error) {
		console.warn('⚠️  MongoDB connection failed. Running in offline mode.');
		console.warn('To enable database features, start MongoDB or configure MongoDB Atlas.');
		console.warn('Error:', error.message);
	}
};

module.exports = connectDB;
