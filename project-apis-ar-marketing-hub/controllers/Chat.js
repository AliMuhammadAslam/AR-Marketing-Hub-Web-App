const OpenAI = require('openai')

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const SYSTEM_PROMPT = `You are a helpful assistant for AR Marketing Hub, a Pakistani e-commerce and events platform.

PRODUCTS: The platform sells consumer electronics including mobile phones (iPhone, Samsung, etc.), laptops, air conditioners, and other electronic appliances. Products have a name, description, price in Pakistani Rupees (RS), and a link to purchase.

EVENTS: The platform lists Pakistani events of various types including educational seminars, music concerts, cultural festivals, sports events, and corporate events. Users can browse events and book tickets.

Your job is to help users find products and events, answer questions about electronics or Pakistani events, and guide them around the platform. Always respond in a friendly, helpful tone. Keep answers concise — 2 to 3 sentences max. If asked about a specific product price or event date you don't know, tell the user to check the listings on the platform directly.`

exports.chatWithAI = async (req, res) => {
    try {
        const { message, history = [] } = req.body
        if (!message) return res.status(400).json({ error: 'Message is required' })

        const messages = [
            { role: 'system', content: SYSTEM_PROMPT },
            ...history.slice(-8),
            { role: 'user', content: message }
        ]

        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages,
            max_tokens: 200
        })

        res.json({ reply: completion.choices[0].message.content })
    } catch (err) {
        console.error('OpenAI error:', err.message)
        res.status(500).json({ error: 'Failed to get AI response' })
    }
}
