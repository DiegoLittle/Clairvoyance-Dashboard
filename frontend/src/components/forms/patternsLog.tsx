import { Form, Field } from 'react-final-form'

const testForm = () => {
    const onSubmit = async (values) => {
        values.id =""
        console.log(values)
        const res = await fetch(("http://127.0.0.1:8000/api/patterns"),{
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Accept': 'application/json'
        },
        body:JSON.stringify(values)
    })
        const data = await res.json()
        return data
        // window.alert(JSON.stringify(values))

    };

    return (
        <Form
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name</label>
                        <Field autocomplete="off" className="border rounded-lg p-2 pl-3 h-8 focus:outline-none w-full" name="name" component="input" placeholder="" />
                        <label>Context</label>
                        <Field autocomplete="off" className="border rounded-lg p-2 pl-3 h-8 focus:outline-none w-full" name="context" component="input" placeholder="" />
                        <label>Problem</label>
                        <Field autocomplete="off" className="border rounded-lg p-2 pl-3 h-8 focus:outline-none w-full" name="problem" component="input" placeholder="" />
                        <label>Examples</label>
                        <Field autocomplete="off" className="border rounded-lg p-2 pl-3 h-8 focus:outline-none w-full" name="examples" component="input" placeholder="" />
                    </div>

                    <button type="submit">Submit</button>
                </form>
            )}
        />)
}

export default testForm;