import { Row, Col, Menu } from 'antd'
const Layout = ({ children, title, active, user }) => {
  return (
    <>
      <Menu mode='horizontal' selectedKeys={[active]}>
        <Menu.Item key='home'>
          <a href='https://vicove.netlify.app'> 😜 ВИЦОВЕ </a>
        </Menu.Item>
        {!user ? (
          <>
            <Menu.Item key='register'>
              <a href='/app/register'>Печели пари (Регистация)</a>
            </Menu.Item>
            <Menu.Item key='login'>
              <a href='/app/login'>Вход</a>
            </Menu.Item>
            <Menu.Item key='forgot'>
              <a href='/app/forgot'>Забравена Парола</a>
            </Menu.Item>
          </>
        ) : (
          <></>
        )}
      </Menu>
      <Row
        type='flex'
        justify='center'
        align='top'
        style={{ marginTop: 20, minHeight: 500 }}
      >
        <Col xs={23} sm={20} md={16} lg={15} xl={12}>
          {title && <h1>{title}</h1>}
          {children}
        </Col>
      </Row>
    </>
  )
}
export default Layout
