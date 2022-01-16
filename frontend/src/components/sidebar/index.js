import React from 'react'
import Item from './item'
import Image from 'next/image'
import Link from 'next/link'


const sidebar = (props) => {
    return (
        <div className="sidebar">
            <div className="mt-8 mx-7">
            <Link href="/">
                <a>
                <Image src="/Logo.svg" width="40" height="40"></Image>
                </a>
            </Link>
                {/* <img src="/Logo.svg" className="w-10" /> */}
            </div>
            <ul className="mt-10">
                <Item img="/home.svg" link="/" IsSelected={props.current_item == "/"}></Item>
                <Item img="/folder.svg" link="/projects" IsSelected={props.current_item == "projects"}></Item>
                {/* <Item img="/growth.svg" link="/growth" IsSelected={props.current_item == "/growth"}></Item> */}
                <Item img="/icons/analytics.svg" link="/info" IsSelected={props.current_item == "/info"}></Item>
                <Item img="/weight.svg" link="/health" IsSelected={props.current_item == "health"}></Item>
                <Item img="/gearhead.svg" link="/IVA" IsSelected={props.current_item == "test"}></Item>
                <Item img="/icons/post-it.svg" link="/sketch" IsSelected={props.current_item == "sketch"}></Item>
                {/* <Item img="/icons/strategy.svg" link="/strategy" IsSelected={props.current_item == "strategy"}></Item> */}
            </ul>
        </div>
    )
}

export default sidebar
