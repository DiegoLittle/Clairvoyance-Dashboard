import fs from 'fs'
import {join} from 'path'

// import matter from 'gray-matter'
const documentsDirectory = join(process.cwd(), 'root/')

export function listDirectory() {
  let dir = fs.readdirSync(documentsDirectory)
  let contents = []
  dir.forEach(filename=>{
    let item = {
      filename: filename,
      type:"File",
    }
    if(fs.statSync(documentsDirectory + "/"+ filename).isDirectory()){
      item.type="Directory"
    }
    contents.push(item)
  })
  return contents
  }

export function getPostBySlug(slug){
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(documentsDirectory, `${realSlug}.md`)
  try {
    const fileContents = fs.readFileSync(fullPath,'utf-8')
    return fileContents
  } catch (error) {
    return "error"
  }
}


export function saveDocument(filename,contents){
  return fs.writeFileSync(documentsDirectory + filename, contents)

}

export async function readDocument(filename){
  // console.log(filename)
  let fileContents = fs.readFileSync(documentsDirectory+filename,'utf-8')
  
  return fileContents
}