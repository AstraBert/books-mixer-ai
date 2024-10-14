import OpenAI from "openai";

// Function to generate mixed books using OpenAI
async function generatePrompt(apiKey, userPrompt) {
    const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true,
    });

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are an inventive AI artist: starting from the book plot you are given, you should produce a coincise but effective and imaginative prompt that would serve as a starting point to create a visual summary of the plot with an image generation AI model" },
                { role: "user", content: userPrompt },
            ],
        });

        // Return the generated haiku
        return completion.choices[0].message.content;
    } catch (error) {
        return `Error: ${error.message}`;  // Return the error message
    }
}

export default generatePrompt;

