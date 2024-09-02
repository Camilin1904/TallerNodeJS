import {object, string} from "zod";

const commentSchema = object({
    text:string({required_error:"text is required"})
})

export default commentSchema;