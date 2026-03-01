interface AIResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export async function getAIResponse(problemText: string): Promise<string> {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.REACT_APP_OPENROUTER_API_KEY ?? ""}`,
        "Content-Type": "application/json",
        
        "X-Title": "SamasyaSamadhan"
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b:free",
        messages: [
          {
            role: "system",
            content: `You are SamasyaSamadhan AI. 
Always reply ONLY in valid JSON format.

Rules:
1. Choose exactly one category from this list:
   - Mental Health
   - Relationships
   - Work & Study
   - Financial Stress
   - Physical Wellness
   - Life Stuff
2. Do not create new categories.
3. JSON response format must be:

{
  "category": "<one of the 6 categories>",
  "greeting": "<short friendly intro>",
  "analysis": "<deep analysis of the problem>",
  "recommendation": "<steps or advice>",
  "summary": "<concise wrap-up>",
  "language": "<detected language of the problem text>"
}
4. Always include the "language" field with the detected language of the problem text and it should be either hindi, hinglish or english.
`
          },
          {
            role: "user",
            content: problemText
          }
        ]
      })
    });

    const data: AIResponse = await response.json();
    console.log("AI Response:", data);

    return data.choices[0]?.message?.content ?? "";
  } catch (err) {
    console.error("AI request failed:", err);
    throw new Error("AI request failed");
  }
}
