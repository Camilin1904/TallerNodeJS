import {number, object, string} from "zod";

const reactionSchema = object({
    reaction:number({required_error:"number is required, the reactions go from 1 to 5"})
})

export default reactionSchema;