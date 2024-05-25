import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from '../data/items.json'
import { formatCurrency } from "../utilities/formatCurrency";

type PaymentItem = {
    id: number
    quantity: number
}

export function PaymentItem({ id, quantity }: PaymentItem) {
    const { removeFromCart } = useShoppingCart()
    const item = storeItems.find(item => item.id === id)
    if (item == null) return null

    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <img 
                className="rounded"
                src={item.imgUrl} 
                style={{ width: "85px", height: "120px", objectFit: "cover", marginRight: "2rem"}} 
            />

             <div className="me-auto">

                <div className="fs-3">
                    {item.name} 
                </div>

                <div className="fs-6">
                    {item.author} 
                </div>

                <span className="text-muted" style={{ fontSize: ".85rem" }}>Quantity: {quantity}</span>

             </div>

             <div className="fs-4 pr-3"> {formatCurrency(item.price * quantity)}</div>

             <Button variant="outline-danger" size="sm" onClick={() => {
                removeFromCart(item.id)
             }}>&times;</Button>
             
        </Stack>
    )

}