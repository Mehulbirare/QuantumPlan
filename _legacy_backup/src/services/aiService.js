const HUGGING_FACE_API = 'https://api-inference.huggingface.co/models/';
// Suggestion: Prompt the user to enter their API key in a settings panel
const HF_TOKEN = '';

class AIService {
    async generateRoomDesign(prompt, style = 'modern') {
        const stylePrompts = {
            modern: 'ultra-modern, sleek, glass and steel, clean lines',
            scandinavian: 'nordic, light wood, white walls, cozy hygge, minimalist',
            industrial: 'exposed brick, metal beams, factory loft, rustic wood',
            minimalist: 'zen, decluttered, neutral tones, architectural',
            bohemian: 'colorful textiles, plants, vintage patterns, eclectic'
        };

        const fullPrompt = `A high-end 8k resolution interior design photograph of a ${prompt}. 
    Style: ${stylePrompts[style] || style}. 
    Luxury materials, professional architectural lighting, sharp focus, magazine quality, Raytraced reflections.`;

        if (!HF_TOKEN) {
            console.warn('Using fallback image (No HF_TOKEN)');
            await new Promise(r => setTimeout(r, 2000));
            // Random designer room images
            const mocks = [
                'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200',
                'https://images.unsplash.com/photo-1616489953149-755e74f2e92c?auto=format&fit=crop&q=80&w=1200',
                'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200'
            ];
            return mocks[Math.floor(Math.random() * mocks.length)];
        }

        try {
            const response = await fetch(`${HUGGING_FACE_API}stabilityai/stable-diffusion-2-1`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${HF_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    inputs: fullPrompt,
                    parameters: {
                        negative_prompt: "blurry, distorted, low resolution, messy, extra furniture, deformed, dark shadows"
                    }
                }),
            });

            if (!response.ok) throw new Error('API request failed');

            const blob = await response.blob();
            return URL.createObjectURL(blob);
        } catch (error) {
            console.error('AI Generation failed:', error);
            throw error;
        }
    }

    async getChatAdvice(message, style) {
        await new Promise(r => setTimeout(r, 1500));
        const tips = [
            `For a ${style} look, focus on maximizing natural light through those windows.`,
            `Consider adding a statement rug to anchor your ${style} furniture pieces.`,
            `The scale of your room suggests a modular sofa would work perfectly here.`,
            `Try incorporating mixed metallic finishes to add depth to your ${style} design.`
        ];
        return tips[Math.floor(Math.random() * tips.length)];
    }
}

export default new AIService();
