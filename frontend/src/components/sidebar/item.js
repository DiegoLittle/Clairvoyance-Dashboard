import React from 'react'
import Link from 'next/link'
import Image from 'next/image'


const item = (props) => {
    // console.log(props.IsSelected);
    return (
        <div className="">
            <li className={`my-6 cursor-pointer ${props.IsSelected ? "ml-9 border-r-2 border-blue-500" : "mx-9"}`}>
                <Link href={props.link}>
                    <a>
                <Image className="max-h-6 max-w-6" src={props.img} height="24" width="24"></Image>
                </a>
                {/* <img className="max-h-6 max-w-6" src={props.img} /> */}
                </Link>
            </li>
        </div>
    )
}

export default item
