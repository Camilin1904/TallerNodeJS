import {object, string} from "zod";

const commentSchema = object({
    text:string({required_error:"text is required"})
    .min(1, "Comment must be at least 1 character")
})

export default commentSchema;