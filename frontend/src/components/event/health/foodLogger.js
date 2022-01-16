import React,{useState} from 'react'

const base = () => {
    const [state,setState] = useState({})
    const handleChange = (e) => {
        let newObj = { ...state }
        newObj = Object.defineProperty(newObj, e.target.name, {
            value: e.target.value
        })
        setState(newObj)
    }
    return (
        <form>
            <label htmlFor="food" className="block text-sm font-medium text-gray-700">
                Input 1
            </label>
            <div className="mt-1">
                <input  className="p-2 focus:outline-none bg-gray-100 rounded-xl" type="text" placeholder="Log food" name="food" onChange={handleChange} />
            </div>
            {/* <label htmlFor="input2" className="block text-sm font-medium text-gray-700">
                Physical Wellbeing
            </label>
            <div className="mt-1">
                <input name="input2" onChange={handleChange} type="range" min="1" max="100" step="1" />
            </div> */}
            <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                onClick={handleSubmit}
            >
                Got it, thanks!
            </button>

        </form>
    )
}

export default base
