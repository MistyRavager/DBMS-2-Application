import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Sidebar from '../components/sidebar'
import { Link } from '@mui/material'

export default function Home({ allPostsData }) {
  return (
    // <Layout home>
    <>
    
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {/* <div className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
      </div>
      <div className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </div> */}
      <Link href="/dashboard">Dashboard</Link>
    </>
    // </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
