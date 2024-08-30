import {object, string} from "zod";

const userSchema = object({
    name:string({required_error:"Name is required"}),
    email:string({required_error:"Name is required"})
        .email("Not valid email address"),
    password:string({required_error:"Password is required"})
        .min(8,"Password must be at least 8 characters")
})

export default userSchema;