'use client';
import { Button } from "@/components/ui/button";
import { addItemToCart, removeItemsFromCart } from "@/lib/actions/cart.actions";
import { Cart, CartItem } from "@/types";
import { Loader, Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner"

const AddToCart = ({ cart, item }: { cart?: Cart, item: CartItem }) => {

    const router = useRouter();

    const [ispending, startTransition] = useTransition();

    const handleAddToCart = async () => {
        startTransition(async () => {
            const res = await addItemToCart(item);

            if (!res.success) {
                // toast.info(res.message);
                toast('', {
                    description: res.message,
                })

                return;
            }

            // Handle success add to cart
            toast('', {
                description: res.message,
                action: {
                    label: "Go To Cart",
                    onClick: () => router.push('/cart'),
                },

            })
        })
    };

    // Handle remove from cart

    const handleRemoveFromCart = async () => {
        startTransition(async () => {
            const res = await removeItemsFromCart(item.productId);

            // Handle success remove from cart
            toast('', {
                description: res.message,
            })

            return;
        })
    }
    // Check if item already exists in cart
    const existItem = cart && cart.items.find((x) => x.productId === item.productId);

    return existItem ? (
        <div>
            <Button
                type="button"
                variant="outline"
                onClick={handleRemoveFromCart}
            >
                {
                    ispending ? (
                        <Loader className="h-4 w-4 animate-spin" />
                    ) : (
                        <Minus className="h-4 w-4" />
                    )
                }
            </Button>
            <span className="px-2">
                {existItem.qty}
            </span>
            <Button
                type="button"
                variant="outline"
                onClick={handleAddToCart}
            >
                {
                    ispending ? (
                        <Loader className="h-4 w-4 animate-spin" />
                    ) : (
                        <Plus className="h-4 w-4" />
                    )
                }
            </Button>
        </div>
    ) : (
        <Button
            className="w-full"
            type="button"
            onClick={handleAddToCart}
        >
            {
                ispending ? (
                    <Loader className="h-4 w-4 animate-spin" />
                ) : (
                    <Plus className="h-4 w-4" />
                )
            }{' '}
            Add To Cart
        </Button>
    )
}

export default AddToCart;