const generateSummary = async (title, description, category) => {
    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'openai/gpt-oss-20b',
                messages: [
                    {
                        role: 'system',
                        content: 'You are an agricultural expert. Summarize the following farmer-reported issue in 2-3 lines. Be concise and actionable.'
                    },
                    {
                        role: 'user',
                        content: `Category: ${category}\nTitle: ${title}\nDescription: ${description}`
                    }
                ],
                max_tokens: 150,
                temperature: 0.3
            })
        });

        const data = await response.json();
        return data.choices?.[0]?.message?.content?.trim() || null;
    } catch {
        console.error('LLM summary generation failed');
        return null;
    }
};

export default generateSummary;
