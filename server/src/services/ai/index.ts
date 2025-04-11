import { GoogleGenerativeAI } from "@google/generative-ai";
import { appEnvConfigs } from "@src/configs";
import axios from "axios";

const Ai = new GoogleGenerativeAI(appEnvConfigs.AI_PUBLISHABLE_KEY as string);

type InstagramPost = {
  content: string;
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
You are an Instagram post generation AI. Analyze the uploaded user image and create a highly engaging, complete Instagram post with all necessary components:

- A catchy and relevant title (concise and impactful).
- A detailed description of the image, elaborating on its theme, content, or context (2-3 sentences).
- 5-8 relevant, trending hashtags.
- Add emojis to enhance the engagement and tone of the post.
- Additional engaging content such as tips, facts, or a call-to-action.

Please respond with the full post content as a single string, including all components, hashtags, and emojis in a human-friendly and natural style. Your response should not be in JSON format but should directly represent the content that will be posted on Instagram.

Example of what the response should look like:
"🌟 Title: Amazing Sunset Vibes
This stunning sunset 🌅 reminds us to appreciate the beauty around us. Whether you're relaxing by the beach or enjoying a quiet evening, take a moment to pause and reflect. 🌊✨ #sunsetlove #naturevibes #oceanview #peaceful #sunsetdreams 🌞"

If the image is not suitable for generating content or content extraction fails, respond with an empty string.
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

    const cleanedText = rawText.trim();

    if (!cleanedText || cleanedText.length === 0) {
      console.warn("No post content generated.");
      return null;
    }

    return { content: cleanedText };
  } catch (error) {
    console.error("Failed to scan image:", error);
    return null;
  }
};
