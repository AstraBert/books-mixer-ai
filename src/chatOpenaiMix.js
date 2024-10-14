import OpenAI from "openai";

// Function to generate mixed books using OpenAI
async function generateMix(apiKey, userPrompt) {
    const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true,
    });

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a book mixer: this means that you'll be given the titles and, optionally, the summary of two books, and you'll have to mix them in such a way that the you will generate a new and original plot for a book in which the two stories are entertainingly entangled" },
                { role: "user", content: userPrompt },
            ],
        });

        // Return the generated haiku
        return completion.choices[0].message.content;
    } catch (error) {
        return `Error: ${error.message}`;  // Return the error message
    }
}

export default generateMix;

