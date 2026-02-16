import 'dotenv/config';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Issue from '../models/Issue.js';

const seedUsers = [
    {
        name: 'Admin User',
        email: 'admin@krishisahayi.com',
        password: 'admin123',
        role: 'admin',
        phone: '+91 9876543210',
        district: 'Varanasi'
    },
    {
        name: 'Ram Prasad',
        email: 'ram@farmer.com',
        password: 'farmer123',
        role: 'farmer',
        phone: '+91 9876543211',
        district: 'Varanasi'
    },
    {
        name: 'Sita Devi',
        email: 'sita@farmer.com',
        password: 'farmer123',
        role: 'farmer',
        phone: '+91 9876543212',
        district: 'Gorakhpur'
    },
    {
        name: 'Mohan Singh',
        email: 'mohan@farmer.com',
        password: 'farmer123',
        role: 'farmer',
        phone: '+91 9876543213',
        district: 'Lucknow'
    }
];

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        await User.deleteMany({});
        await Issue.deleteMany({});
        console.log('Cleared existing data');

        const users = await User.create(seedUsers);
        const admin = users.find(u => u.role === 'admin');
        const farmers = users.filter(u => u.role === 'farmer');
        console.log(`Created ${users.length} users`);

        const seedIssues = [
            {
                farmerId: farmers[0]._id,
                title: 'Tomato leaves turning yellow and curling',
                description: 'My tomato plants are showing yellowing of leaves with curling edges. The problem started 2 weeks ago and is spreading to other plants.',
                category: 'Pest Management',
                status: 'pending',
                priority: 'high',
                location: 'Biharipur, Varanasi',
                llmSummary: 'Tomato leaf curl virus suspected. Yellowing and curling of leaves spreading across plants. Immediate isolation and neem oil application recommended.',
                createdAt: new Date('2024-12-01'),
                updatedAt: new Date('2024-12-01')
            },
            {
                farmerId: farmers[1]._id,
                title: 'Wheat crop showing orange rust spots',
                description: 'Rust spots appearing on wheat leaves. The spots are orange in color and spreading rapidly. Need immediate advice.',
                category: 'Disease Management',
                status: 'in_progress',
                priority: 'urgent',
                location: 'Gorakhpur',
                adminResponse: 'Apply systemic fungicide immediately. Ensure proper field drainage.',
                llmSummary: 'Wheat rust disease identified. Orange spots spreading rapidly on leaves. Fungicide application and improved drainage are critical.',
                createdAt: new Date('2024-12-05'),
                updatedAt: new Date('2024-12-07')
            },
            {
                farmerId: farmers[2]._id,
                title: 'Rice plants showing stunted growth',
                description: 'Rice seedlings are not growing properly. They appear stunted and yellowish. Soil test shows normal pH but plants are weak.',
                category: 'Nutrient Management',
                status: 'resolved',
                priority: 'medium',
                location: 'Lucknow',
                adminResponse: 'Zinc deficiency detected. Apply zinc sulfate at 25 kg/ha.',
                llmSummary: 'Rice seedling stunting likely due to zinc deficiency despite normal soil pH. Zinc sulfate foliar spray recommended.',
                createdAt: new Date('2024-11-15'),
                updatedAt: new Date('2024-11-25')
            },
            {
                farmerId: farmers[0]._id,
                title: 'Cotton bollworm infestation',
                description: 'Cotton plants are being damaged by bollworms. Holes in the bolls and larvae feeding on them.',
                category: 'Pest Management',
                status: 'resolved',
                priority: 'high',
                location: 'Biharipur, Varanasi',
                adminResponse: 'Use neem-based bio-pesticide. Set up pheromone traps.',
                llmSummary: 'Cotton bollworm infestation with visible boll damage and larvae. Bio-pesticide and pheromone traps are effective control measures.',
                createdAt: new Date('2024-10-20'),
                updatedAt: new Date('2024-10-28')
            },
            {
                farmerId: farmers[1]._id,
                title: 'Onion crop affected by fungal infection',
                description: 'Onion bulbs are rotting in the field. White fungal growth visible on the bulbs.',
                category: 'Disease Management',
                status: 'pending',
                priority: 'high',
                location: 'Gorakhpur',
                llmSummary: 'White rot fungal infection on onion bulbs causing field-level rotting. Immediate removal of affected bulbs and fungicide drench needed.',
                createdAt: new Date('2025-01-10'),
                updatedAt: new Date('2025-01-10')
            },
            {
                farmerId: farmers[2]._id,
                title: 'Sugarcane red rot disease',
                description: 'Sugarcane stalks showing red discoloration inside. Some plants are wilting.',
                category: 'Disease Management',
                status: 'pending',
                priority: 'medium',
                location: 'Lucknow',
                llmSummary: 'Sugarcane red rot with internal stalk discoloration and wilting. Remove affected canes and use resistant varieties for replanting.',
                createdAt: new Date('2025-01-15'),
                updatedAt: new Date('2025-01-15')
            },
            {
                farmerId: farmers[0]._id,
                title: 'Irrigation water quality issue',
                description: 'Water from the borewell has turned salty. Crops are showing signs of salt stress.',
                category: 'Soil & Water',
                status: 'in_progress',
                priority: 'medium',
                location: 'Biharipur, Varanasi',
                adminResponse: 'Get water tested for EC levels. Consider installing RO filter for irrigation.',
                llmSummary: 'Borewell water salinity affecting crops with salt stress symptoms. Water quality testing and possible RO filtration recommended.',
                createdAt: new Date('2025-01-02'),
                updatedAt: new Date('2025-01-05')
            },
            {
                farmerId: farmers[1]._id,
                title: 'Potato late blight spreading',
                description: 'Dark brown lesions appearing on potato leaves and tubers. Disease spreading fast in the wet weather.',
                category: 'Disease Management',
                status: 'resolved',
                priority: 'urgent',
                location: 'Gorakhpur',
                adminResponse: 'Apply Mancozeb fungicide immediately. Improve air circulation between rows.',
                llmSummary: 'Late blight infection on potatoes with dark lesions on foliage and tubers. Mancozeb application and row spacing improvement urgently needed.',
                createdAt: new Date('2024-11-20'),
                updatedAt: new Date('2024-12-02')
            },
            {
                farmerId: farmers[2]._id,
                title: 'Maize stem borer damage',
                description: 'Maize stems have bore holes and plants are falling over. Caterpillars visible inside stems.',
                category: 'Pest Management',
                status: 'in_progress',
                priority: 'high',
                location: 'Lucknow',
                llmSummary: 'Stem borer caterpillar infestation in maize causing structural damage. Targeted insecticide application into bore holes recommended.',
                createdAt: new Date('2025-01-08'),
                updatedAt: new Date('2025-01-12')
            },
            {
                farmerId: farmers[0]._id,
                title: 'Need guidance on organic farming practices',
                description: 'I want to switch to organic farming. Need advice on composting and natural pest control methods.',
                category: 'General Advisory',
                status: 'pending',
                priority: 'low',
                location: 'Biharipur, Varanasi',
                llmSummary: 'Farmer seeking guidance on transitioning to organic farming. Composting techniques and natural pest control methods to be shared.',
                createdAt: new Date('2025-01-18'),
                updatedAt: new Date('2025-01-18')
            }
        ];

        await Issue.create(seedIssues);
        console.log(`Created ${seedIssues.length} issues`);

        console.log('\nSeed complete!');
        console.log('Admin login: admin@krishisahayi.com / admin123');
        console.log('Farmer login: ram@farmer.com / farmer123');
        process.exit(0);
    } catch (err) {
        console.error('Seed failed:', err.message);
        process.exit(1);
    }
};

seed();
