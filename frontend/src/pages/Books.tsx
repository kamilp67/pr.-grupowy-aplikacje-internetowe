import items from "../data/items.json"
import { Col, Row } from "react-bootstrap"
import { Item } from '../components/Item'

export const Products = () => {
    return (
    <>
        <h1 className="mb-3">Books</h1>
        <Row sm={2} xs={1} md={2} lg={3} xl={4} className='g-5'>
            {items.map(item => (
                <Col key={item.id}><Item {...item} /></Col>
            ))}
        </Row>
    </>
  )
}

export default Products