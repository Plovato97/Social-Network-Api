const { Schema, model, Types } = require('mongoose');
const  dateFormat  = require('../utils/dateFormat')

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (time) => dateFormat(time)
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
)

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
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
        }
    }
)

thoughtSchema.virtual('reactionCounter').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;