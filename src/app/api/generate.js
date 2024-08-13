import { NextResponse } from 'next/server'
import OpenAI from 'openai'

// Your fetcher function for SWR
const fetcher = (url) => fetch(url).then((res) => res.json());

const systemPrompt = `
You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
Both front and back should be one sentence long.
You should return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}
`


export async function POST(req) {
  const openai = new OpenAI()
    const data = await req.text()
    
 // We'll implement the OpenAI API call here
  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: data },
    ],
    model: 'gpt-4o',
    response_format: { type: 'json_object' },
  })

    // We'll process the API response in the next step
    //  Parse the JSON response from the OpenAI API
  const flashcards = JSON.parse(completion.choices[0].message.content)

  // Return the flashcards as a JSON response
  return NextResponse.json(flashcards.flashcards)
}