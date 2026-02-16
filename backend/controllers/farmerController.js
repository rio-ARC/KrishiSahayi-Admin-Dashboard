import Issue from '../models/Issue.js';
import generateSummary from '../services/llmService.js';

export const createIssue = async (req, res) => {
    try {
        const { farmerId, title, description, category, priority, location } = req.body;

        const llmSummary = await generateSummary(title, description, category);

        const issue = await Issue.create({
            farmerId,
            title,
            description,
            category,
            priority,
            location,
            llmSummary
        });

        const populated = await issue.populate('farmerId', 'name email phone district');

        res.status(201).json({
            success: true,
            message: 'Issue created successfully',
            data: populated
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message, data: null });
    }
};

export const getFarmerIssues = async (req, res) => {
    try {
        const { page = 1, limit = 10, status } = req.query;
        const { farmerId } = req.params;
        const filter = { farmerId };
        if (status) filter.status = status;

        const total = await Issue.countDocuments(filter);
        const issues = await Issue.find(filter)
            .sort('-createdAt')
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.json({
            success: true,
            message: 'Farmer issues fetched',
            data: {
                issues,
                total,
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message, data: null });
    }
};

export const getFarmerIssueById = async (req, res) => {
    try {
        const issue = await Issue.findOne({
            _id: req.params.id,
            farmerId: req.params.farmerId
        });

        if (!issue) {
            return res.status(404).json({ success: false, message: 'Issue not found', data: null });
        }
        res.json({ success: true, message: 'Issue fetched', data: issue });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message, data: null });
    }
};
