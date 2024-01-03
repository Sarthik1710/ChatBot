import express, {Express, Request, Response} from "express"
import  OpenAI from "openai";
import Configuration from "openai";
import dotenv from "dotenv";

dotenv.config();

const  port = 3000;

const app = express();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });


async function getOpenAIResponse(p: string): Promise<any> {
try {
    // console.log("hello")
    const response = await openai.completions.create({
        prompt : p,
        // messages: [{ role: "system", content: p }],
        model: "text-davinci-003",
    });

    console.log(response);
    return response;
} catch (error:any) {
    console.error('Error fetching OpenAI response:', error.message);
    return 'Error fetching OpenAI response.';
}
}

app.get("/", (req:Request, res:Response) =>{
    const prompt = 'Hello';
    const response = getOpenAIResponse(prompt);
    res.send(response);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});