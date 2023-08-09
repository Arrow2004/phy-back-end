const {Schema,model} = require('mongoose')
const themeScheme = new Schema({
    name: {
        type: String
    }
})
const questionScheme = new Schema({
    question: {
        type: String,
        required: true
    },
    answers: [{
        type: String
       }],
})
const testScheme = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    themes: [
        themeScheme
    ],
    authors: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    previewPic: {
      type: String
    },
    questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
    participants: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
          },
          score: {
            type: Number,
            required: true
          }
        }
      ]
},{
    timestamps: true
})
const Test = model("Test", testScheme);
const Question = model("Question", questionScheme);

module.exports = {
    Test,
    Question
}