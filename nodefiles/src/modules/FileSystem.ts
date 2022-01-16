import * as fs from 'fs';



export class Filesystem {
    cwd: string = ""

    ls(){
        return fs.readdirSync(this.cwd);
    }
    isDirectory(path:string){
        try {
            return fs.statSync(this.cwd+"/"+path).isDirectory()
        } catch (error) {
            console.log(error)
            return error
        }
    }
    cd(path:string){
        this.cwd = this.cwd+ "/"+path
    }
    async writeToFile(filename:string,content:string,){
        // console.log(fs.existsSync(this.cwd+"/"+filename))
        // fs.writeFile(this.cwd+"/"+filename,content,function(err){
        //     if(err) throw err;
        //     console.log('Saved!')
        // })
        return fs.writeFileSync(this.cwd+"/"+filename,content)
    }
    async readDocument(filename:string){
        // console.log(filename)
        let fileContents = fs.readFileSync(this.cwd+"/"+filename,{encoding:"utf-8",flag:"r"})
        
        return fileContents
      }
    async deleteDocument(filename:string){
        return fs.unlinkSync(this.cwd+"/"+filename)
    }

}

