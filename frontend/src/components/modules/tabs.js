import React from 'react'
import { Tab } from '@headlessui/react'

const schedule = () => {
    return (
<Tab.Group>
      <Tab.List>
        <Tab className="w-1/3 py-2.5 text-sm leading-5 font-medium text-black rounded-lg border border-blue-200 focus:border-blue-500 focus:outline-none">Tab 1</Tab>
        <Tab className="w-1/3 py-2.5 text-sm leading-5 font-medium text-black rounded-lg border border-blue-200 focus:border-blue-500 focus:outline-none">Tab 2</Tab>
        <Tab className="w-1/3 py-2.5 text-sm leading-5 font-medium text-black rounded-lg border border-blue-200 focus:border-blue-500 focus:outline-none" >Tab 3</Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>Content 1</Tab.Panel>
        <Tab.Panel>Content 2</Tab.Panel>
        <Tab.Panel>Content 3</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
    )
}

export default schedule
