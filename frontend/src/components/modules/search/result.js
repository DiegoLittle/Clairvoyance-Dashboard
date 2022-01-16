import React from 'react'

const result = ({title,description,pubDate,link}) => {
    return (
        <div className="block p-2 m-4 bg-blue-50 rounded-xl">
        <div className="text-lg font-semibold">
            <a href={link}>
            {title}
            </a>
        </div>
        <div className="text-sm font-normal">{pubDate}</div>
        <div className="mt-4 font-medium">{description}</div>
        </div>
    )
}

export default result
