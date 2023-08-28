// Create a controller with the following specifications:

// 1. import the Configuration class and the OpenAIApi class from the openai npm module
// 2. create a new configuration object that includes the api key and uses the Configuration class from the openai module
// 3. create a new instance of the OpenAIApi class and pass in the configuration object
// 4. create an async function called generateInfo that accepts a request and response object as parameters
// 5. use try to make a request to the OpenAI completetion api and return the response
// 6. use catch to catch any errors and return the error include a message to the user
// 7. export the generateInfo function as a module

const { OpenAI } = require("openai");
const { recipePrompt } = require('../../data/prompt.json');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const generateInfo = async (req, res) => {
    const { recipe } = req.body;

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: "user", content: `${recipePrompt}${recipe}` }],
        });
        const response = completion.choices[0].message.content;

        return res.status(200).json({
            success: true,
            data: response,
        });
    } catch (error) {
        if (res.statusCode === 401) {
            return res.status(401).json({
                error: `${res}`,
            });
        }
        return res.status(500).json({
            error: `${error}`
        });
    }
}

module.exports = { generateInfo };
