import React from 'react'
import { listDirectory,getPostBySlug } from '../../../src/lib/posts';
import {micromark} from 'micromark'
import { useRouter } from 'next/router'


const contentPage = ({page}) => {

    let Markdown = micromark(page)
    return (
        <div className="h-full overflow-scroll">
            <div target="_blank" className="markdown" dangerouslySetInnerHTML={{ __html: Markdown, }} />
        </div>
    )
}

export default contentPage

export async function getServerSideProps(context) {
    const slug = context.query.slug


    const posts = listDirectory()
    const page = getPostBySlug(slug)
    // const page = <h1>Error</h1>
    
    
    return {
      props: {
          page
      }, // will be passed to the page component as props
    }
  }