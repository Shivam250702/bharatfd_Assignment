const FAQ = require('../models/FAQ');
const autoTranslate = require('../utils/translator');
const { setCache } = require('../utils/cache');
const redis = require('redis');

// Initialize Redis client using the environment variable for configuration
const client = redis.createClient({ url: process.env.REDIS_URL });

client.on('connect', () => console.log('Redis connection established.'));
client.on('error', (err) => console.error('Redis encountered an error:', err));

/**
 * Fetches FAQs with caching enabled.
 * If data is available in Redis, it returns cached data.
 * Otherwise, it fetches from the database, translates it if needed, and updates the cache.
 */
const getFAQs = async (req, res) => {
    const lang = req.query.lang || 'en';

    try {
        // Check Redis cache first
        client.get(`faqs:${lang}`, async (err, cachedData) => {
            if (err) {
                return res.status(500).json({ message: 'Cache retrieval failed', error: err.message });
            }

            // Return cached data if available
            if (cachedData) {
                return res.json(JSON.parse(cachedData));
            }

            // Fetch FAQs from the database
            const faqs = await FAQ.find();
            const translatedFAQs = await Promise.all(
                faqs.map(async (faq) => faq.getTranslated(lang))
            );

            // Store translated FAQs in cache for future requests
            setCache(`faqs:${lang}`, translatedFAQs);

            return res.json(translatedFAQs);
        });
    } catch (err) {
        return res.status(500).json({ message: 'Failed to retrieve FAQs', error: err.message });
    }
};

/**
 * Adds a new FAQ entry to the database.
 * Automatically translates the question and answer into multiple languages.
 */
const createFAQ = async (req, res) => {
    const { question, answer } = req.body;

    const newFAQ = new FAQ({
        question: { en: question },
        answer: { en: answer },
    });

    try {
        // Perform translations for additional languages
        const languages = ['hi', 'bn'];
        for (const lang of languages) {
            newFAQ.question[lang] = await autoTranslate(question, lang);
            newFAQ.answer[lang] = await autoTranslate(answer, lang);
        }

        // Save the new FAQ in the database
        await newFAQ.save();
        return res.status(201).json(newFAQ);
    } catch (err) {
        return res.status(500).json({ message: 'Error while creating FAQ', error: err.message });
    }
};

module.exports = { getFAQs, createFAQ };
