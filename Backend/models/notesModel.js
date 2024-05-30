const mongoose = require("mongoose");
const { Schema } = mongoose;

const NoteSchema = new Schema(
  {
    title: { type: String, required: true, minLength: 3, maxLength: 30 },
    content: { type: String, required: true, minLength: 10, maxLength: 500 },
    imgUrl: { type: String, default: null },
    userId: { type: Schema.Types.ObjectId, ref: "User", requied: true },
    //   creatorId: {type: }
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
