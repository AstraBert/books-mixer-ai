import generateMix from "./chatOpenaiMix.js";
import generatePrompt from "./chatOpenaiPrompt.js"; 
import searchWikipedia from "./fetchWikipedia.js"; 
import generateImage from "./imageGeneration.js";  

// Function to combine book summaries and return the mixed plot
async function combineBookSummaries(book1, book2, additionalInstructions, apiKeyOpenAI) {
    const summary1 = await searchWikipedia(book1);
    const summary2 = await searchWikipedia(book2);
    
    const mixedPrompt = `Combine these two books:\n1. ${book1}: ${summary1}\n2. ${book2}: ${summary2}\n\n. Create an inventive and imaginative mixed plot starting from these two book summaries.\n\nAdditional instructions: ${additionalInstructions}`;
    
    const mixedPlot = await generateMix(apiKeyOpenAI, mixedPrompt);
    return mixedPlot;
}

async function generateImagePrompt(book1, book2, additionalInstructions, apiKeyOpenAI) {
    try {
        const bookmix = await combineBookSummaries(book1, book2, additionalInstructions, apiKeyOpenAI);
        const imagePrompt = `This is the plot you should create a visual synthesis of: ${bookmix}`;
        const imGenPrompt = await generatePrompt(apiKeyOpenAI, imagePrompt);
        
        if (!imGenPrompt) {
            console.error("generatePrompt returned undefined or null");
            throw new Error("Failed to generate image prompt");
        }
        
        console.log("Image prompt: ", imGenPrompt);
        return { bookmix, imGenPrompt };
    } catch (error) {
        console.error("Error in generateImagePrompt:", error);
        throw error;
    }
}

export async function generatePlotImage(book1, book2, additionalInstructions, apiKeyOpenAI, apiKeyImage) {
    try {
        const result = await generateImagePrompt(book1, book2, additionalInstructions, apiKeyOpenAI);
        
        if (!result || !result.imGenPrompt) {
            throw new Error("Failed to generate image prompt");
        }
        
        console.log("Image prompt: ", result.imGenPrompt);

        const imageUrl = await generateImage(apiKeyImage, result.imGenPrompt);

        return { bookmix: result.bookmix, imageUrl };
    } catch (error) {
        console.error("Error in generatePlotImage:", error);
        throw new Error("An error occurred: " + error.message);
    }
}
