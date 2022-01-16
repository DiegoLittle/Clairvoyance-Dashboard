import DynamicForm from '../../../src/components/forms/dynamicForm'
import PatternsForm from '../../../src/components/forms/patternsLog'

const patternsHub = ({patterns})=>{
    console.log(patterns)
    async function postPattern(pattern){
        const res = await fetch(("http://192.168.1.223:5000/api/patterns"),{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Accept': 'application/json'
            },
            body:JSON.stringify(pattern)
        })
        const data = await res.json()
        return data
        // return "Test";
    }


    return (
        <div className="w-full h-full" >
            {patterns.map(pattern=>
            <div className="p-4 bg-blue-50 rounded-lg w-1/12">
                <div className="font-semibold">{pattern.name}</div>
            </div>)}
            <PatternsForm/>
        </div>
    )
}

export default patternsHub

export async function getServerSideProps(context){
    let res = await fetch("http://localhost:8000/api/patterns")
    let data = await res.json()
    let patterns:[] = data
    

    return{
        props:{
            patterns
        }
    }

}