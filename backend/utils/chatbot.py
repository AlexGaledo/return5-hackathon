from google.genai import types
from google import genai
from config import Config
from google.genai.types import Content, Part


key = Config.gemini_key
client = genai.Client(api_key=key)


def getChatbotResponse(history,user_input,sysin):
    try:
        structured_history = [
            Content(
                role='model' if msg['role'] != 'user' else 'user',
                parts=[Part(text=msg['content'])]
            )
            for msg in history
        ]

        structured_history.append(
            Content(role="user", parts=[Part(text=user_input)])
        )

        response =client.models.generate_content(
            model="gemini-2.0-flash",
            config=types.GenerateContentConfig(
                system_instruction=sysin),
            contents = structured_history
        )
        textResponse = response.text


        return textResponse
    
    except Exception as e:
        print(f"Error occurred: {str(e)}")  
        return {"response": f"An error occurred: {str(e)}"}