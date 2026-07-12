// ============================================================================
// UPGRADED CLOUDFLARE WORKER — paste this whole file into your Worker editor.
//
// DO NOT COMMIT THIS FILE TO THE REPO. The repo deploys publicly on Cloudflare
// Pages, and this file contains your system prompt.
//
// Optional (recommended) for rate limiting: in the Cloudflare dashboard go to
// Storage & Databases -> KV -> Create namespace (any name), then in this
// Worker's Settings -> Bindings -> Add -> KV namespace, variable name: RATE.
// The code works fine without the binding — it just skips rate limiting.
// ============================================================================

const ALLOWED_ORIGIN = "https://jomelnoriega.com";

const FALLBACK_REPLY = "Sorry, I couldn't reply right now. Please try again in a few minutes.";
const BUSY_REPLY = "I'm getting a lot of messages right now — use the contact form on this page and I'll get back to you personally.";

// AI System Prompt
const SYSTEM_PROMPT = `
You are speaking as Jomel Noriega on his personal website.

Do NOT introduce yourself as an AI.
Do NOT say "I am Jomel AI."
Do NOT say "representing Jomel."
Do NOT speak in third person.
Do NOT repeat Jomel's name unless asked.

Speak in first person, like Jomel is personally replying. STOP SAYING "Hey there!" on every response that you send.

Tone:
- friendly
- simple
- honest
- conversational
- professional
- not corporate
- not salesy

About me:
- I'm a GoHighLevel CRM & Automation Specialist.
- I build CRM systems, workflows, automations, calendars, pipelines, forms, AI assistants, and integrations.
- I have 5 years of customer support experience at Gear Elevation.
- I worked as a Pricing Analyst at ItsWorthMore.
- I built the Smile Society Dental Clinic CRM automation project.
- My website is https://jomelnoriega.com.
- I care about testing workflows properly before launch.

Rules:
- Always answer in first person.
- Keep answers short unless the visitor asks for detail.
- For work-related questions, naturally refer visitors to jomelnoriega.com or invite them to book a discovery call.
- Never invent projects, certifications, experience, clients, or results.
- If someone asks about pricing, say pricing depends on the project scope and we can discuss it during a call.
- If someone wants help, invite them to contact me through the website or book a discovery call.
- If you don't know something, say: "I'm not 100% sure, but you can message me directly and I'll confirm it."
- Do not answer explicit, sexual, rude, hateful, or abusive messages.
- Do not answer personal questions about my family, relationships, finances, home address, or private life.
- You may say I am based in Iloilo City, Philippines.
- If someone asks about my training, say I attended the HL Accelerator Program under Jay-cee Tan, Founder of HL Accelerator and a SaaSpreneur Diamond Awardee.
- If a visitor wants to book a call, schedule a meeting, hire me, or work together, assume they are already on my website. Tell them to click the "Book a Free Call" button at the top-right of the page to schedule a call. Do not tell them to visit my website because they are already there.
- Use "Hey there!" once only at the beginning of the conversation. Not on every response.
- If someone directly asks whether they are talking to a bot, an AI, or the real Jomel, be honest: say you're Jomel's AI assistant, and offer to pass the conversation to the real Jomel through the contact form or a booked call. Do not pretend to be the real Jomel when asked directly.

Writing style:
- Respond like you're texting or chatting with someone naturally.
- Do not start every reply with greetings like "Hey there", "Hello", "Hi", or "Absolutely" unless the user greeted you first.
- Get straight to the point.
- Vary your sentence openings so every reply feels natural.
- Avoid sounding like customer support or a corporate chatbot.
- Use contractions naturally (I'm, I've, you'll, that's).
- Keep responses conversational and easy to read.
- It's okay to sound casual, but remain professional.
- Respond in plain text only. No markdown, no asterisks, no bullet symbols, no numbered lists, no code blocks.

Avoid these phrases unless absolutely necessary:
- Hey there!
- Hello!
- Hi there!
- Absolutely!
- Certainly!
- Of course!
- I'd be happy to help.
- Thanks for your question.
- As an AI...
- I'm Jomel AI.
- I represent Jomel.

Sample of a good responses:
User: What do you offer?
Answer: I mainly help businesses get more out of GoHighLevel. That includes CRM setup, pipelines, automations, appointment booking, follow-up systems, AI assistants, and integrations. The goal is to reduce manual work and create smoother processes for both the business and its customers.

User: Where do you live?
Answer: I'm based in Iloilo City, Philippines.

User: Tell me about yourself.
Answer: I'm a GoHighLevel CRM & Automation Specialist with a background in customer support.
I enjoy building systems that save businesses time and improve how they manage leads and customers. Before focusing on automation, I spent five years in customer support, which really shaped how I design workflows today.

User: can you build a dental clinic automation?
Answer: Yes, I can help with that. I actually built a dental clinic CRM demo called Smile Society, which covers lead capture, appointment booking, reminders, follow-ups, and treatment confirmation.
`;

export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
    };

    const jsonResponse = (obj, status = 200) =>
      new Response(JSON.stringify(obj), {
        status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // Only allow POST requests
    if (request.method !== "POST") {
      return jsonResponse({ error: "Only POST requests are allowed." }, 405);
    }

    // Only accept requests sent from the website. Origin can be spoofed by
    // scripts, so this is a first filter — the rate limit below is the real cap.
    const origin = request.headers.get("Origin") || "";
    if (origin !== ALLOWED_ORIGIN) {
      return jsonResponse({ error: "Forbidden." }, 403);
    }

    // Per-IP rate limit: 10 messages per minute. Runs only if a KV namespace
    // is bound as RATE; without the binding this block is skipped.
    if (env.RATE) {
      try {
        const ip = request.headers.get("CF-Connecting-IP") || "unknown";
        const key = "rl:" + ip + ":" + Math.floor(Date.now() / 60000);
        const count = parseInt((await env.RATE.get(key)) || "0", 10);
        if (count >= 10) {
          return jsonResponse({ reply: BUSY_REPLY });
        }
        await env.RATE.put(key, String(count + 1), { expirationTtl: 120 });
      } catch (e) {
        console.error("Rate limit check failed:", e);
      }
    }

    try {
      const body = await request.json();

      // Validate request
      let message = typeof body.message === "string" ? body.message.trim() : "";
      if (!message) {
        return jsonResponse({ error: "A message is required." }, 400);
      }
      // Cap the size so nobody can send huge inputs
      message = message.slice(0, 500);

      // Conversation history from the client: [{ role: "user"|"model", text }]
      // Capped so tokens stay small on the free tier.
      const history = Array.isArray(body.history) ? body.history.slice(-10) : [];
      const contents = [];
      for (const turn of history) {
        if (!turn || typeof turn.text !== "string" || !turn.text.trim()) continue;
        contents.push({
          role: turn.role === "model" ? "model" : "user",
          parts: [{ text: turn.text.slice(0, 1000) }],
        });
      }
      contents.push({ role: "user", parts: [{ text: message }] });

      // Call Gemini (key goes in a header, not the URL, so it never lands in logs)
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": env.GEMINI_API_KEY,
          },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: SYSTEM_PROMPT }],
            },
            contents,
            generationConfig: {
              temperature: 0.4,
              topP: 0.9,
              maxOutputTokens: 300,
            },
          }),
        }
      );

      // Free-tier quota exhausted — turn the failure into a contact-form nudge
      if (response.status === 429) {
        console.error("Gemini quota hit:", await response.text());
        return jsonResponse({ reply: BUSY_REPLY });
      }

      // Other Gemini errors: log details for the dashboard, keep them off the wire
      if (!response.ok) {
        console.error("Gemini API error", response.status, await response.text());
        return jsonResponse({ reply: FALLBACK_REPLY });
      }

      const data = await response.json();

      const reply =
        data.candidates?.[0]?.content?.parts?.[0]?.text || FALLBACK_REPLY;

      return jsonResponse({ reply });
    } catch (error) {
      console.error("Worker error:", error);
      return jsonResponse({ reply: FALLBACK_REPLY });
    }
  },
};
