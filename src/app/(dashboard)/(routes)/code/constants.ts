import * as zod from 'zod';

export const formSchema = zod.object({
    prompt: zod.z.string().min(1, 'Prompt is required'),
})