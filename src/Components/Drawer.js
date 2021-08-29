import React from 'react'
import { Drawer } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import { cats } from '../utils/cats'

const Cats = ({ cats }) =>
  cats.map(({ cat }) => (
    <p key={cat}>
      <a href={`/cat/${cat}`}>{cat}</a>
    </p>
  ))
class Drawerx extends React.Component {
  constructor (props) {
    super()
    this.state = { visible: false }
  }
  showDrawer = () => {
    this.setState({
      visible: true
    })
  }

  onClose = () => {
    this.setState({
      visible: false
    })
  }

  render () {
    return (
      <div>
        <div
          style={{
            padding: 15,
            position: 'fixed',
            right: 0,
            top: 0,
            zIndex: 1,
            background: '#fff'
          }}
        >
          <MenuOutlined onClick={this.showDrawer} />
        </div>
        <Drawer
          title='Категории'
          placement='right'
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <Cats cats={cats}></Cats>
        </Drawer>
      </div>
    )
  }
}
export default Drawerx
