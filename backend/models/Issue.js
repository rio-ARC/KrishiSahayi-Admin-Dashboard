import mongoose from 'mongoose';

const issueSchema = new mongoose.Schema({
    farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    status: { type: String, enum: ['pending', 'in_progress', 'resolved'], default: 'pending' },
    priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
    location: { type: String },
    adminResponse: { type: String },
    llmSummary: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

issueSchema.index({ farmerId: 1 });
issueSchema.index({ status: 1 });
issueSchema.index({ category: 1 });
issueSchema.index({ createdAt: -1 });

issueSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

issueSchema.pre('findOneAndUpdate', function (next) {
    this.set({ updatedAt: new Date() });
    next();
});

const Issue = mongoose.model('Issue', issueSchema);
export default Issue;
