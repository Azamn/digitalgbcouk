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
    You are an Instagram post generation AI. Analyze the uploaded user image and the provided caption. Extract the content and hashtags separately.
    
    Your response MUST be in the following exact format between the triple dashes:
    
    ---
    {
      "content": "Your engaging Instagram post content here, including title, description, and emojis, but NO hashtags",
      "hashtags": "#first #second #third #fourth #fifth"
    }
    ---
    
    Guidelines:
    1. CONTENT:
    - Must be engaging, with a catchy title and an image description (2–3 sentences)
    - Add emojis to enhance readability and engagement
    - Include facts, tips, or a CTA (e.g., “Link in bio”)
    - Do NOT include hashtags
    
    2. HASHTAGS:
    - Extract and list only the hashtags from the original input
    - Must be 5 to 8 relevant hashtags
    - Separate hashtags with a single space
    
    3. FORMAT:
    - Valid JSON only between triple dashes
    - No additional text outside the JSON
    - No markdown formatting
    
    If the image is not suitable for generating content, return empty strings:
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
