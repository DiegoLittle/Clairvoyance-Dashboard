import { saveDocument } from "../../../src/lib/posts";

export default function saveFile(req, res) {
    // console.log(req.body)
    try {
      saveDocument(req.body.filename,req.body.contents)
    } catch (error) {
      console.log(error)
    }
    res.status(200).json(req.body)
  }
  