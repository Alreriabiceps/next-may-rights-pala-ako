# Environment Variables Setup

This application requires a Gemini API key to function properly.

## Setup Instructions

1. Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

2. Create a `.env.local` file in the root directory of the project

3. Add the following line to `.env.local`:

```
GEMINI_API_KEY=your_api_key_here
```

4. Replace `your_api_key_here` with your actual Gemini API key

5. Restart your development server after adding the environment variable

## Important Notes

- Never commit your `.env.local` file to version control (it's already in `.gitignore`)
- The API key is used server-side only and is not exposed to the client
- Make sure to add the environment variable to your production hosting platform (Vercel, etc.) as well





