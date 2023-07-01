const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: mongoose.ObjectId, ref: "Author", required: true },
  summary: { type: String, required: true },
  isbn: { type: String, unique: true },
  genre: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
});

bookSchema.pre("save", function (next) {
  this.isbn = this._id.toString();
  this.title = this.title.toLowerCase();
  next();
});

module.exports = mongoose.model("Book", bookSchema);
