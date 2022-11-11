const { Schema, model, Types } = require('mongoose');

const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required:  'Type your thoughts',
            trim: true,
            maxLength: 280,
            // validate: [(newText) => newText.length <= 280]
        },
        username: {
            type: String,
            required: 'No username provided'
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        reactions: [{
            type: Schema.Types.ObjectId,
            ref: 'Reaction'
        }]
        
    },
    {
        toJSON: {
            virtuals: true,
        }
    }
)

thoughtSchema.virtual('reactionCounter').get(function() {
    return this.reactions.reduce((total, reaction) => total + reaction.replies.length + 1, 0);
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;