import {number, object, string} from "zod";

const reactionSchema = object({
    reaction:number({required_error:"number is required"})
        .min(1, "the reactions go from 1 to 5")
        .max(5, "the reactions go from 1 to 5")
})

export default reactionSchema;