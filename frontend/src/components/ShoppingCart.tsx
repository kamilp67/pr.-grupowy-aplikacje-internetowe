import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../data/items.json"

type ShoppingCart = {
    isOpen: boolean
}

export function ShoppingCart({ isOpen }: ShoppingCart) {
    const { closeCart, cartItems } = useShoppingCart()

    return <Offcanvas show={isOpen} onHide={closeCart} placement="end">
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
            {cartItems.length !== 0 ? (<Stack gap={3}>
                {cartItems.map(item => (
                    <CartItem key={item.id} {...item} />
                ))}
                <hr />

                <div className="ms-auto fw-bold fs-5">
                    Total {formatCurrency(cartItems.reduce((total, cartItem) => {
                        const item = storeItems.find(item => item.id === cartItem.id)
                        return total + (item?.price || 0) * cartItem.quantity
                        }, 0)
                    )}
                </div>
            </Stack>) : (
                <h4>No books selected yet!</h4>
            )}
        </Offcanvas.Body>

    </Offcanvas>
}