import Issue from '../models/Issue.js';

export const getIssues = async (req, res) => {
    try {
        const { page = 1, limit = 10, status, category, priority, sort = '-createdAt' } = req.query;
        const filter = {};
        if (status) filter.status = status;
        if (category) filter.category = category;
        if (priority) filter.priority = priority;

        const total = await Issue.countDocuments(filter);
        const issues = await Issue.find(filter)
            .populate('farmerId', 'name email phone district')
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.json({
            success: true,
            message: 'Issues fetched successfully',
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

export const getIssueById = async (req, res) => {
    try {
        const issue = await Issue.findById(req.params.id).populate('farmerId', 'name email phone district');
        if (!issue) {
            return res.status(404).json({ success: false, message: 'Issue not found', data: null });
        }
        res.json({ success: true, message: 'Issue fetched', data: issue });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message, data: null });
    }
};

export const updateIssueStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const issue = await Issue.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        ).populate('farmerId', 'name email phone district');

        if (!issue) {
            return res.status(404).json({ success: false, message: 'Issue not found', data: null });
        }
        res.json({ success: true, message: 'Status updated', data: issue });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message, data: null });
    }
};

export const respondToIssue = async (req, res) => {
    try {
        const { adminResponse } = req.body;
        const issue = await Issue.findByIdAndUpdate(
            req.params.id,
            { adminResponse },
            { new: true, runValidators: true }
        ).populate('farmerId', 'name email phone district');

        if (!issue) {
            return res.status(404).json({ success: false, message: 'Issue not found', data: null });
        }
        res.json({ success: true, message: 'Response added', data: issue });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message, data: null });
    }
};

export const getAnalyticsSummary = async (req, res) => {
    try {
        const [statusCounts, categoryCounts, totalCount] = await Promise.all([
            Issue.aggregate([
                { $group: { _id: '$status', count: { $sum: 1 } } },
                { $sort: { _id: 1 } }
            ]),
            Issue.aggregate([
                { $group: { _id: '$category', count: { $sum: 1 } } },
                { $sort: { count: -1 } }
            ]),
            Issue.countDocuments()
        ]);

        const statusData = {
            labels: statusCounts.map(s => s._id),
            datasets: [{ label: 'Issues by Status', data: statusCounts.map(s => s.count) }]
        };

        const categoryData = {
            labels: categoryCounts.map(c => c._id),
            datasets: [{ label: 'Issues by Category', data: categoryCounts.map(c => c.count) }]
        };

        res.json({
            success: true,
            message: 'Analytics summary fetched',
            data: { statusData, categoryData, totalCount }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message, data: null });
    }
};

export const getAnalyticsTrends = async (req, res) => {
    try {
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const [monthlyTrends, avgResolution] = await Promise.all([
            Issue.aggregate([
                { $match: { createdAt: { $gte: sixMonthsAgo } } },
                {
                    $group: {
                        _id: {
                            year: { $year: '$createdAt' },
                            month: { $month: '$createdAt' }
                        },
                        total: { $sum: 1 },
                        resolved: {
                            $sum: { $cond: [{ $eq: ['$status', 'resolved'] }, 1, 0] }
                        }
                    }
                },
                { $sort: { '_id.year': 1, '_id.month': 1 } }
            ]),
            Issue.aggregate([
                { $match: { status: 'resolved' } },
                {
                    $project: {
                        resolutionTime: {
                            $divide: [{ $subtract: ['$updatedAt', '$createdAt'] }, 1000 * 60 * 60]
                        }
                    }
                },
                { $group: { _id: null, avgHours: { $avg: '$resolutionTime' } } }
            ])
        ]);

        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const trendsData = {
            labels: monthlyTrends.map(t => `${monthNames[t._id.month - 1]} ${t._id.year}`),
            datasets: [
                { label: 'New Issues', data: monthlyTrends.map(t => t.total) },
                { label: 'Resolved', data: monthlyTrends.map(t => t.resolved) }
            ]
        };

        res.json({
            success: true,
            message: 'Trends fetched',
            data: {
                trendsData,
                averageResolutionTimeHours: Math.round((avgResolution[0]?.avgHours || 0) * 10) / 10
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message, data: null });
    }
};
