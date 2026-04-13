const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI('AIzaSyAdNnzxuI_olrjXEqHR3fPDhQ4zyw5WlEI');
async function run() {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent('Hello');
    console.log('SUCCESS:', result.response.text());
  } catch (e) {
    console.error('ERROR1.5:', e.message);
  }
  try {
    const model2 = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result2 = await model2.generateContent('Hello');
    console.log('SUCCESS2:', result2.response.text());
  } catch (e) {
    console.error('ERRORPRO:', e.message);
  }
}
run();
