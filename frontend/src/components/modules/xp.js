import React from 'react'

const xp = () => {
    const [progress, setProgress] = useState(data);

        const addXP = async () => {
        let newObj = { ...progress }
        newObj.totalXP = newObj.totalXP + 10
        setProgress(newObj)
        const res = await fetch('http://127.0.0.1:8000/api/stats', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newObj)
        })
        const data = await res.json()
        console.log(data)

    }
    const resetXP = async () => {
        let newObj = { ...progress }
        newObj.totalXP = 0
        setProgress(newObj)
        const res = await fetch('http://127.0.0.1:8000/api/stats', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newObj)
        })
        const data = await res.json()
        console.log(data)

    }
    return (
        <div className="flex">
        <div className="border p-2 m-2 rounded-xl">
            <div>Exp: {progress.totalXP}</div>
        </div>
        <div>
            <button onClick={addXP} className="p-2 m-2 border bg-blue-100 rounded-xl focus:outline-none">+10 xp</button>
            <button onClick={resetXP} className="p-2 m-2 border bg-blue-100 rounded-xl focus:outline-none">Reset XP</button>
        </div>
        <div className="flex">
                <div className="border p-2 m-2 rounded-xl">
                    <div>Exp: {progress.totalXP}</div>
                </div>
                <div>
                    <button onClick={addXP} className="p-2 m-2 border bg-blue-100 rounded-xl focus:outline-none">+10 xp</button>
                    <button onClick={resetXP} className="p-2 m-2 border bg-blue-100 rounded-xl focus:outline-none">Reset XP</button>
                </div>
                
            </div>
        
    </div>
    )
}

export default xp
