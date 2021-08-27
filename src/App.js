/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable no-param-reassign */

import React, { useEffect } from 'react'
import { useImmer } from 'use-immer'
import axios from 'axios'
import {
   List,
   Button,
   Row,
   Col,
   Tag,
   notification,
   Pagination,
   Card,
} from 'antd'
import { Waypoint } from 'react-waypoint'
import { Helmet } from 'react-helmet'
import uuid from 'react-uuid'

import Drawerx from './Drawer'
import News from './News'

import { cats } from './cats'

import 'antd/dist/antd.css'

import './style.css'

const Iframe = ({ src, height, width }) => (
   <iframe
      src={src}
      height={height}
      width={width}
      className='fullheight'
      scrolling='no'
      frameBorder='0'
      title='dsd'
      allow='encrypted-media'
   />
)
const Cats = () =>
   cats.map(item1 => (
      <a key={uuid()} href={`/cat/${item1.key}`}>
         <Tag
            color='magenta'
            style={{
               margin: 5,
               cursor: 'pointer',
            }}
         >
            {item1.key}
         </Tag>
      </a>
   ))
const JokeBr = ({ joke }) =>
   joke.split('\n').map(item2 => (
      <span key={uuid()}>
         {item2}
         <br />
      </span>
   ))
const Refine = item => {
   if (item.item && item.item.tag === 'p' && item.item.child) {
      return <p>{item.item.child[0].text.replace('\n', <br />)}</p>
   }
   if (item.item.node && item.item.node === 'text') {
      return <p>{item.item.text.replace('\n', <br />)}</p>
   }
   if (item.item && item.item.tag === 'img') {
      return (
         <div style={{ textAlign: 'center' }}>
            <img
               alt='example'
               src={item.item.attr.src}
               style={{ maxWidth: '100%', margin: 'auto' }}
            />
         </div>
      )
   }
   if (item.item.text) {
      return null
   }
   return null
}

const Content = ({ item }) => (
   <div
      style={{
         padding: 0,
         margin: 0,
      }}
   >
      <div>
         <a style={{ float: 'right' }} href={`/cat/${item.doc.cat}`}>
            <Tag color='magenta' style={{ margin: 5 }}>
               {item.doc.cat}
            </Tag>
         </a>
         <JokeBr joke={item.doc.joke} />
         <p> </p>
         <a
            style={{ backgroundColor: '#3b5998', border: 'none' }}
            className='ant-btn ant-btn-primary ant-btn-round'
            href={`https://www.facebook.com/sharer/sharer.php?u=https://${window.location.hostname}/${item.doc._id}`}
         >
            {' Сподели'}
         </a>
      </div>
   </div>
)
const openNotification = () => {
   notification.open({
      message: 'Харесай Ни!',
      duration: 20,
      description: (
         <Iframe
            src='https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F%D0%92%D0%B8%D1%86%D0%BE%D0%B2%D0%B5-103340854630134%2F&tabs=timeline&width=340&height=127&small_header=true&adapt_container_width=false&hide_cover=true&show_facepile=false&appId'
            width='300'
            height='70'
         />
      ),
   })
}

const App = props => {
   const [state, setState] = useImmer({
      firstkey: 0,
      lastkey: 0,
      isLoading: true,
      collapsed: true,
      isCat: false,
      isItem: false,
      isNews: false,
      NewsItem: {},
      total: 0,
      currentPage: 1,
      isPagination: false,
      items: { rows: [] },
   })
   const { isIndex, match } = props

   useEffect(() => {
      async function mount () {
         if (isIndex) {
            const items = await axios(
               `https://pouchdb.herokuapp.com/jokes/_all_docs?include_docs=true&limit=5&skip=${Math.floor(
                  Math.random() * 59979
               )}`
            )
            setState(draft => {
               draft.isLoading = false
               draft.items = items.data
            })
         } else if (match.params.id === 'news') {
            const item = await axios(
               `https://pouchdb.herokuapp.com/chetiva/${match.params.id2}`
            )

            setState(draft => {
               draft.NewsItem = item.data
               draft.isLoading = false
               draft.isCat = true
               draft.isNews = true
            })
         } else if (match.params.start_key) {
            const items = await axios(
               `https://pouchdb.herokuapp.com/jokes/_design/api/_view/${
                  match.params.id2
               }?limit=20&skip=${match.params.start_key * 20 - 20}`
            )
            setState(draft => {
               draft.isCat = true
               draft.isLoading = false
               draft.total = items.data.total_rows
               draft.isPagination = true
               draft.currentPage = match.params.start_key
               draft.items = {
                  rows: items.data.rows.map(item => ({
                     doc: {
                        item,
                        ...item.value,
                        cat: match.params.id2,
                        _id: item.key,
                     },
                  })),
               }
            })
         } else if (match.params.id === 'cat') {
            const items = await axios(
               `https://pouchdb.herokuapp.com/jokes/_design/api/_view/${match.params.id2}?limit=20`
            )

            setState(draft => {
               draft.isCat = true
               draft.isLoading = false
               draft.total = items.data.total_rows
               draft.isPagination = true
               draft.items = {
                  rows: items.data.rows.map(item => ({
                     doc: {
                        item,
                        ...item.value,
                        cat: match.params.id2,
                        _id: item.key,
                     },
                  })),
               }
            })
         } else {
            const items = await axios(
               `https://pouchdb.herokuapp.com/jokes/_all_docs?include_docs=true&limit=20&start_key=${match.params.id}`
            )
            const measures = await axios(
               `https://grafix.herokuapp.com/?text=${items.data.rows[0].doc.joke.replace(
                  /\n/g,
                  'br'
               )}`
            )
            setState(draft => {
               draft.measures = measures.data
               draft.isLoading = false
               draft.items = { rows: items.data.rows }
            })
         }
      }
      mount()
      // openNotification();
   }, [])
   function onChange (s) {
      setState(draft => {
         draft.currentPage = s
      })
      if (props.match.params.start_key) {
         window.location.replace(
            `${window.location.href
               .split('/')
               .slice(0, -1)
               .join('/')}/${s}`
         )
      } else {
         window.location.replace(`${window.location.href}/${s}`)
      }
   }
   const {
      isLoading,
      items,
      measures,
      isCat,
      isNews,
      isPagination,
      currentPage,
      total,
      NewsItem,
   } = state
   return (
      <>
         <h2 style={{ fontWeight: 'lighter' }}>
            <a href='https://arpecop.xyz'> 😜 Вицове </a>
         </h2>
         <Drawerx />
         {isLoading ? (
            <div style={{ textAlign: 'center' }}>
               <Button type='primary' loading />
            </div>
         ) : (
            <div>
               {!isIndex && !isCat ? (
                  <Helmet>
                     <title>Виц</title>
                     <meta
                        property='og:url'
                        content={`https://${window.location.hostname}/${match.params.id}`}
                     />
                     <meta property='od:description' content={measures.text} />
                     <meta property='og:type' content='article' />
                     <meta property='og:title' content='🤣 Още Вицове ➡️' />
                     <meta
                        property='og:image'
                        content={`https://grafix.herokuapp.com/${measures.id}.png`}
                     />
                     <meta property='og:image:width' content={measures.width} />
                     <meta
                        property='og:image:height'
                        content={measures.height}
                     />
                     <meta name='twitter:card' content='summary' />
                     <meta name='twitter:creator' content='@Rudi11963642' />
                  </Helmet>
               ) : null}

               <Row
                  type='flex'
                  justify='center'
                  align='top'
                  style={{ padding: 10 }}
               >
                  {isNews ? (
                     <div>
                        <h3 style={{ fontWeight: 100 }}>{NewsItem.title}</h3>
                        <Card
                           hoverable
                           style={{ border: 'none' }}
                           cover={
                              NewsItem.image ? (
                                 <div style={{ textAlign: 'center' }}>
                                    <img
                                       alt='example'
                                       src={NewsItem.image}
                                       style={{ maxWidth: '100%' }}
                                    />
                                 </div>
                              ) : null
                           }
                        />

                        {NewsItem.react.child.map((item, i) => (
                           <Refine item={item} key={uuid()} />
                        ))}
                        <div>
                           източник:
                           {NewsItem.source}
                        </div>
                        <News />
                     </div>
                  ) : (
                     <Col xs={23} sm={20} md={16} lg={15} xl={12}>
                        <List
                           size='large'
                           dataSource={items.rows}
                           renderItem={(item, i) => (
                              <List.Item>
                                 <Content item={item} i={i} />
                              </List.Item>
                           )}
                        />
                        {isPagination ? (
                           <Pagination
                              pageSize={20}
                              defaultCurrent={currentPage}
                              total={total}
                              onChange={onChange}
                           />
                        ) : null}
                        <div style={{ textAlign: 'center' }}>
                           <Cats />

                           <div>
                              <Waypoint onEnter={openNotification} />
                              <a href='https://play.google.com/store/apps/details?id=com.rudixlabs.jokes2'>
                                 <img
                                    src='/vicbg.png'
                                    style={{ maxWidth: '100%' }}
                                    alt=''
                                 />
                              </a>
                           </div>
                        </div>
                     </Col>
                  )}
               </Row>
            </div>
         )}
      </>
   )
}
//
export default App
