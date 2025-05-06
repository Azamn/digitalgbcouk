import { GoogleGenerativeAI } from "@google/generative-ai";
import { appEnvConfigs } from "@src/configs";

const Ai = new GoogleGenerativeAI(appEnvConfigs.AI_PUBLISHABLE_KEY as string);

type InstagramPost = {
  content: string;
  hashtags: string;
};

export const ScanImage = async (
  imageFile: Buffer,
  mimeType: string = "image/jpeg"
): Promise<InstagramPost | null> => {
  try {
    if (!imageFile || imageFile.length === 0) {
      console.error("Image file is missing or empty.");
      return null;
    }

    const base64String = imageFile.toString("base64");

    const model = Ai.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `
    You are an Instagram post generation AI. Analyze the uploaded user image and create a highly engaging, complete Instagram post with all necessary components. 
    Your response MUST be in the following exact format between the triple dashes:

    ---
    {
      "content": "Your engaging Instagram post content here including caption, description, and emojis",
      "hashtags": "#first #second #third #fourth #fifth"
    }
    ---

    Guidelines:
    1. CONTENT:
    - Start with a catchy, relevant title (concise and impactful)
    - Include a detailed description of the image (2-3 sentences)
    - Add emojis to enhance engagement
    - Include additional engaging content like tips, facts, or call-to-action
    
    2. HASHTAGS:
    - Provide exactly 5-8 relevant, trending hashtags
    - Separate hashtags with spaces only
    - Place them at the end of the content
    
    3. FORMAT:
    - The response must be valid JSON format between the triple dashes
    - Do not include any additional text outside the JSON object
    - Do not use markdown formatting
    
    Example response:
    ---
    {
      "content": "🌟 Sunset Magic 🌅\nThis breathtaking sunset reminds us to appreciate nature's beauty. Perfect end to a perfect day! ✨\n\nWhat's your favorite time of day? Share below! 👇",
      "hashtags": "#sunset #nature #goldenhour #photography #travel #sunsetlovers #instagood #peaceful"
    }
    ---

    If the image is not suitable for generating content, return empty strings for both fields:
    ---
    {
      "content": "",
      "hashtags": ""
    }
    ---
    `;

    const result = await model.generateContent([
      {
        inlineData: {
          data: base64String,
          mimeType: mimeType,
        },
      },
      prompt,
    ]);

    const resp = await result.response;
    const rawText = resp.text();

    // Extract JSON from between the triple dashes
    const jsonMatch = rawText.match(/---\s*({[\s\S]*?})\s*---/);
    if (!jsonMatch) {
      console.warn("Failed to extract JSON response");
      return null;
    }

    try {
      const postData = JSON.parse(jsonMatch[1]);

      if (
        typeof postData.content === "string" &&
        typeof postData.hashtags === "string"
      ) {
        return {
          content: postData.content.trim(),
          hashtags: postData.hashtags.trim(),
        };
      }
      return null;
    } catch (e) {
      console.error("Failed to parse AI response:", e);
      return null;
    }
  } catch (error) {
    console.error("Failed to scan image:", error);
    return null;
  }
};
