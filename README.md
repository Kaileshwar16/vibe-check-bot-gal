
# Vibe Check Bot - Your Gen Z Stress Relief Companion

A playful web app that helps users reduce stress through light-hearted conversations with a Gen Z-inspired AI chat bot with voice responses.

## Features

- **API Key Integration**: Users can enter their Gemini API key to personalize their experience
- **Secure Storage**: API keys are only stored in session storage for the duration of the session
- **Chat Interface**: Clean, modern UI for conversations with the AI
- **Voice Responses**: Bot responses are read aloud with a female voice when available
- **Gen Z Style**: Playful, supportive responses with Gen Z flair and terminology
- **Responsive Design**: Works great on both desktop and mobile devices

## Implementation Details

### Frontend Components

- **ApiKeyForm**: Securely handles API key submission
- **ChatInterface**: Manages conversation flow and voice synthesis
- **AppLayout**: Provides consistent layout and styling

### Security Considerations

- API keys are stored in sessionStorage, not localStorage, so they're lost when the browser is closed
- No permanent server-side storage of API keys
- Simulated validation (in a production app, this would validate with a test API call)

### Design Choices

- Vibrant gradient color scheme with purples, pinks, and blues
- Playful animations and transitions
- Rounded, friendly UI elements
- Messaging interface styled like modern chat apps
- Voice synthesis uses female voices when available

## How It Works

1. Users access the app and see a prompt to enter their API key
2. After entering a valid key, they enter the chat interface
3. The user can send messages about their stress or concerns
4. The app responds with supportive, playful messages in Gen Z style
5. Responses are read aloud using the browser's speech synthesis
6. Users can reset their API key at any time

## Next Steps

Future enhancements could include:
- Backend API for securely handling Gemini API requests
- More voice customization options
- Sentiment analysis to better tailor responses
- User preference saving (with consent)
- Integration with additional AI services

