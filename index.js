"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const openai_1 = __importDefault(require("openai"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = 3000;
const app = (0, express_1.default)();
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
function getOpenAIResponse(p) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // console.log("hello")
            const response = yield openai.completions.create({
                prompt: p,
                // messages: [{ role: "system", content: p }],
                model: "text-davinci-003",
            });
            console.log(response);
            return response;
        }
        catch (error) {
            console.error('Error fetching OpenAI response:', error.message);
            return 'Error fetching OpenAI response.';
        }
    });
}
app.get("/", (req, res) => {
    const prompt = 'Hello';
    const response = getOpenAIResponse(prompt);
    res.send(response);
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
