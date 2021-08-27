import React from 'react'
import { Drawer,   } from 'antd'
import  { MenuOutlined } from '@ant-design/icons'
import { cats } from './cats'

const Cats = ({ cats }) =>
    cats.map(item1 => (
        <p key={item1.key}>
            <a key={cats.value} href={`/cat/${item1.key}`}>
                {item1.key}
            </a>
        </p>
    ))
 class Drawerx extends React.Component {
    constructor(props) {
        super()
        this.state = { visible: false }
    }
      showDrawer = () => {
        this.setState({
            visible: true,
        })
    }

      onClose = () => {
        this.setState({
            visible: false,
        })
    }

    render() {
        return (
            <div>
                <div
                    style={{
                        padding: 5,
                        position: 'absolute',
                        right: 0,
                        top: 0,
                    }}
                >
                    <MenuOutlined onClick={this.showDrawer} />
                </div>
                <Drawer
                    title="Категории"
                    placement="right"
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
export default Drawerx;
