import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import storeItems from '../data/items.json'
import { formatCurrency } from "../utilities/formatCurrency"

type CartItem = {
    id: number
    quantity: number
}

export function CartItem({ id, quantity }: CartItem) {
    const { removeFromCart } = useShoppingCart()

    const item = storeItems.find(item => item.id === id)
    if (item == null) return null

    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <img 
                className="rounded"
                src={item.imgUrl} 
                style={{ width: "105px", height: "140px", objectFit: "cover"}} 
            />

             <div className="me-auto">
                <div>
                    {item.name} <span className="text-muted" style={{ fontSize: "0.65rem" }}>x{quantity}</span>
                </div>

                <div className="text-muted" style={{ fontSize: ".75rem" }}>
                    {formatCurrency(item.price)}
                </div>
             </div>

             <div> {formatCurrency(item.price * quantity)}</div>

             <Button variant="outline-danger" size="sm" onClick={() => {
                removeFromCart(item.id)
             }}>&times;</Button>
        </Stack>
    )
}