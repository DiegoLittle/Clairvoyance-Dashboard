import { useState } from 'react'
import { Form, Field } from 'react-final-form'
import { postEvent } from '../api'



const pharmaLog = () => {
    const onSubmit = async (values) => {
        // window.alert(JSON.stringify(values))
        postEvent({
            title: "Medication Log",
            type: "log.health.medication",
            data: values
        })
        
    };
    return (
        <Form
            
            onSubmit={onSubmit}
            initialValues={{}}
            render={({ handleSubmit,form }) => (
                <form onSubmit={()=>{
                    handleSubmit().then(form.reset)
                }}>
                    {/* <h2>Simple Default Input</h2> */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Substance Name</label>
                        <Field className="border rounded-lg p-2 pl-3 w-full h-1/2 focus:outline-none" name="name" component="input" placeholder="" />
                    </div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dose</label>
                    <Field className="border rounded-lg p-2 pl-3 w-full h-1/2 focus:outline-none" name="dose" component="input" placeholder="" />
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <Field
                        name="time"
                        someArbitraryOtherProp={42}
                        render={props => {
                            console.log(props.someArbitraryOtherProp) // would print 42
                            return <input type="time" id="time" {...props.input} />
                        }} />
                    {/* <Field className="border rounded-lg p-2 pl-3 w-full h-1/2 focus:outline-none" name="time" component="input" placeholder="" /> */}
                    <button type="submit" className="cool-button">Submit</button>
                </form>
            )}
        />

    )
}

export default pharmaLog;
