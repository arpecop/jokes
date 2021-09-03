/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable no-param-reassign */

import React, { useEffect } from 'react'

import { useImmer } from 'use-immer'
import axios from 'axios'
import { Button, Pagination, Input } from 'antd'

import { Helmet } from 'react-helmet'

import Drawerx from './Components/Drawer'
import Layout from './Layout/Layout'
import { insert_counter } from './utils/db.js'

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
//br
const JokeBr = ({ joke }) =>
  joke
    .split('\n')
    .map((item, i) => ({
      i,
      item
    }))
    .map(({ item, i }) => <div key={i}>{item}</div>)

const Item = ({ item, user }) => (
  <div
    style={{
      padding: 0,
      margin: 0
    }}
    className='ant-list-item'
  >
    <div>
      <JokeBr joke={item.joke} />
      {user.username ? (
        <Input
          style={{ width: '100%' }}
          value={
            'https://vicove.netlify.app/u/' + user.username + '/' + item.id
          }
        ></Input>
      ) : (
        <a
          style={{ backgroundColor: '#3b5998', border: 'none' }}
          className='ant-btn ant-btn-primary ant-btn-round share'
          href={`https://www.facebook.com/sharer/sharer.php?u=https://vicove.netlify.app/${item.id}`}
        >
          {' Сподели'}
        </a>
      )}
    </div>
  </div>
)

const App = props => {
  const { isIndex, match, user } = props
  const cat = match.params.id2
  const ref = match.params.ref

  const [state, setState] = useImmer({
    firstkey: 0,
    lastkey: 0,
    isLoading: true,
    collapsed: true,
    isCat: false,
    isItem: false,
    total: 0,
    currentPage: Math.round(match.params.start_key || 1),
    items: []
  })

  useEffect(() => {
    async function mount () {
      if (match.params.start_key) {
        const items = await axios(
          `https://db.rudixlab.com/api/rest/jokes/${cat}/${match.params
            .start_key *
            30 -
            30}`
        )
        setState(draft => {
          draft.isCat = true
          draft.isLoading = false
          draft.total = items.data.Jokes_aggregate.aggregate.count
          draft.items = items.data.Jokes
        })
      } else if (match.params.id2) {
        const items = await axios(
          `https://db.rudixlab.com/api/rest/jokes/${cat}/0`
        )

        setState(draft => {
          draft.isCat = true
          draft.isLoading = false
          draft.total = items.data.Jokes_aggregate.aggregate.count
          draft.isPagination = true
          draft.items = items.data.Jokes
        })
      } else {
        axios.get('https://geolocation-db.com/json/').then(res => {
          const operationsDoc = `
          mutation insert_article {
            insert_Jokes_counter_one(object: {ip: "${res.data.IPv4}", ref: "${ref}", useragent: "${window.navigator.userAgent}"}) {
              id
            }
          } 
        `
          insert_counter(operationsDoc)
        })

        const items = await axios(
          `https://db.rudixlab.com/api/rest/jokes/${match.params.id}`
        )
        const measures = await axios(
          `https://grafix.herokuapp.com/?text=${items.data.Jokes[0].joke.replace(
            /\n/g,
            'br'
          )}`
        )
        setState(draft => {
          draft.measures = measures.data
          draft.isLoading = false
          draft.items = items.data.Jokes
          draft.total = 30
        })
      }
    }
    mount()
    // openNotification();
  }, [cat, isIndex, match, setState, ref])

  const { isLoading, measures, isCat, currentPage, total, items } = state
  return (
    <>
      <Drawerx />
      <Layout>
        {isLoading ? (
          <div style={{ textAlign: 'center' }}>
            <Button type='primary' loading />
          </div>
        ) : (
          !isIndex &&
          !isCat && (
            <Helmet>
              <title>Виц</title>
              <meta
                property='og:url'
                content={`https://vicove.netlify.app/${match.params.id}`}
              />
              <meta property='od:description' content={measures.text} />
              <meta property='og:type' content='article' />
              <meta property='og:title' content='🤣 Прочети ➡️' />
              <meta
                property='og:image'
                content={`https://grafix.herokuapp.com/${measures.id}.png`}
              />
              <meta property='og:image:width' content={measures.width} />
              <meta property='og:image:height' content={measures.height} />
              <meta name='twitter:card' content='summary' />
              <meta name='twitter:creator' content='@Rudi11963642' />
            </Helmet>
          )
        )}

        {items.map((item, index) => (
          <div key={index}>
            {index === 2 && !user.username && (
              <div className='ad'>
                <img src='/img/money.png' alt='' width='60' />
                <h3>
                  Печели от разпространение на вицовете в социалната мрежа!
                </h3>
                <Button href='/app/register'>Регистрация</Button>
              </div>
            )}
            <Item item={item} cat={cat} user={user} />
          </div>
        ))}
        <div className='pagination'>
          <Pagination
            pageSize={30}
            defaultCurrent={currentPage}
            current={currentPage}
            hideOnSinglePage
            total={total}
            itemRender={(page, type) => {
              if (type === 'page') {
                return <a href={'/cat/' + cat + '/' + page}>{page}</a>
              }
              return null
            }}
          />
        </div>
        <div style={{ textAlign: 'center', padding: 10, clear: 'both' }}>
          <Iframe
            src='https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F%D0%92%D0%B8%D1%86%D0%BE%D0%B2%D0%B5-103340854630134%2F&tabs=timeline&width=340&height=127&small_header=true&adapt_container_width=false&hide_cover=true&show_facepile=false&appId'
            width='300'
            height='70'
          />
        </div>
      </Layout>
    </>
  )
}
//
export default App
