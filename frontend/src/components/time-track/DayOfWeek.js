import React from 'react'

const DayOfWeek = (props) => {
    return (
        <div className="flex flex-col m-4 p-3 rounded-xl border w-full">
        <span className="text-2xl font-bold mb-6"></span>
            <div className="flex p-3">
                <div className="flex flex-col">
                    <div className="my-4">
                        <span className="text-center font-bold">Diet</span>
                        <div className="">
                            <div className="text-sm mt-2">{props.data.diet.breakfast}</div>
                            <div className="text-sm mt-2">{props.data.diet.lunch}</div>
                            <div className="text-sm mt-2">{props.data.diet.dinner}</div>
                        </div>
                    </div>

                    <div className="my-4">
                        <span className="text-center font-bold">Exercise</span>
                        <div className="">
                            <div className="text-sm mt-2">{props.data.exercise.strength}</div>
                            <div className="text-sm mt-2">{props.data.exercise.mobility}</div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col mx-8">
                    <div className="my-4">
                        <span className="text-center font-bold">Rest</span>
                        <div className="">
                            <div className="text-sm mt-2">{props.data.sleep.time}</div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default DayOfWeek
