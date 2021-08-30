import { Row, Col } from 'antd'
const Layout = ({ children, title }) => {
  return (
    <Row type='flex' justify='center' align='top'>
      <Col xs={23} sm={20} md={16} lg={15} xl={12}>
        {title && <h1>{title}</h1>}
        {children}
      </Col>
    </Row>
  )
}
export default Layout
