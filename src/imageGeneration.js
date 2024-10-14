async function generateImage(apiKey, prompt) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "key": apiKey,
        "prompt": prompt,
        "negative_prompt": "bad quality",
        "width": "512",
        "height": "512",
        "safety_checker": false,
        "seed": null,
        "samples": 1,
        "base64": false,
        "webhook": null,
        "track_id": null
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch("https://modelslab.com/api/v6/realtime/text2img", requestOptions);
        const result = await response.json();  // Parse the response as JSON

        // Log the result to inspect the full response
        console.log("Full API Response:", result);
        
        // Check if 'output' exists and is an array with at least one element
        if (result.output) {
            const outputUrl = result.output[0];
            return outputUrl;  // Return the generated image URL
        } else {
            return "No output URL found in the response.";
        }
    } catch (error) {
        return `Error: ${error.message}`;  // Return the error message
    }
}


export default generateImage;