import {Schema, model, Document } from 'mongoose'

// Defining strict TypeScript interface for document properties
export interface INode extends Document {
    title: string
    content: string
    type: string // This 'type' is for 'type classification'
    createdAt: Date
}

const NodeSchema = new Schema<INode>({
    title: {
        type: String,
        required: [true, "A node title is required"],
        trim: true
    },

    content: {
        type: String,
        required: [true, "Node content is required"]
    },

    type: {
        type: String,
        required: true,
        default: "Concept"
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default model<INode>("Node", NodeSchema)