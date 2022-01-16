import { readDocument } from "../../../src/lib/posts";

export default async function readFile(req, res) {
    // console.log(req.body)
    let result = await readDocument(req.body)
    // console.log(result)
    res.status(200).json({filename:req.body,contents:result})
  }
  