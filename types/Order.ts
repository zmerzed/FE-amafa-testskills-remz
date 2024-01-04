import {User} from "~/types/User";
import {Product} from "~/types/Product";

enum ORDER_STATUS {
    PENDING_PAYMENT = 'PENDING_PAYMENT',
    CONFIRMED_PAYMENT = 'CONFIRMED_PAYMENT',
    PROCESSING = 'PROCESSING',
    READY_FOR_PICKUP = 'READY_FOR_PICKUP',
    CONFIRMED_PICKUP = 'CONFIRMED_PICKUP',
    CANCELLED = 'CANCELLED',
    REFUNDED = 'REFUNDED',
    CANCELLED_AND_REFUNDED = 'CANCELLED_AND_REFUNDED',
    CANCELLED_AND_NOT_REFUNDED = 'CANCELLED_AND_NOT_REFUNDED',
}

export const getStatus = (status: ORDER_STATUS): {
    color: string;
    title: string;
    message: string;
} => {
    let obj: {
        color: string;
        title: string;
        message: string;
    } = {
        color: '',
        title: '',
        message: ''
    }
    switch (status) {
        case ORDER_STATUS.PENDING_PAYMENT:
            obj = {
                color: 'default',
                title: 'Pending Payment',
                message: 'Your order has been received, pending payment.'
            }
            break;
        case ORDER_STATUS.CONFIRMED_PAYMENT:
            obj = {
                color: 'info',
                title: 'Pending Order',
                message: 'Your order has been received'
            }
            break;
        case ORDER_STATUS.PROCESSING:
            obj = {
                color: 'info',
                title: 'Processing',
                message: 'Your order is currently being processed.'
            }
            break;
        case ORDER_STATUS.READY_FOR_PICKUP:
            obj = {
                color: 'info',
                title: 'Ready for Pickup',
                message: 'You can now pickup your order.'
            }
            break;
        case ORDER_STATUS.CONFIRMED_PICKUP:
            obj = {
                color: 'success',
                title: 'Order Picked-up',
                message: 'You got your order successfully.'
            }
            break;
        case ORDER_STATUS.CANCELLED:
            obj = {
                color: 'error',
                title: 'Order Cancelled',
                message: 'Your order is being cancelled.'
            }
            break;
        case ORDER_STATUS.REFUNDED:
            obj = {
                color: 'info',
                title: 'Order Refunded',
                message: 'Your order is being refunded.'
            }
            break;
        case ORDER_STATUS.CANCELLED_AND_REFUNDED:
            obj = {
                color: 'error',
                title: 'Order Cancelled and Refunded',
                message: 'Your order is being cancelled and refunded.'
            }
            break;
        case ORDER_STATUS.CANCELLED_AND_NOT_REFUNDED:
            obj = {
                color: 'error',
                title: 'Order Cancelled and Not Refunded',
                message: 'Your order is being cancelled and not yet refunded.'
            }
            break;
        default:
            obj = {
                color: 'default',
                title: 'Default',
                message: 'Default'
            }
            break;
    }

    return obj
}

export type SelectedOption = {
    id: number;
    price: number;
    price_in_cents: number;
    formatted_price: string;
    created_at: string | Date;
    updated_at: string | Date;
}

export type OrderDetail = {
    id: number;
    quantity: number;
    price: number;
    price_in_cents: number;
    formatted_price: string;
    formatted_discounted_price: string;
    discount: number;
    has_discount: boolean;
    formatted_discount: string;
    product: Product;
    options: Array<SelectedOption>;
    product_label_title: string;
    product_label_selected_options: string;
}

export type Order = {
    id: number;
    amount: string;
    raw_amount: number;
    discounted_amount: number;
    formatted_discounted_amount: string;
    order_number: string;
    payment_id: string;
    status: ORDER_STATUS,
    status_title: string;
    status_message: string;
    item_count: number;
    created_at: string | Date;
    updated_at: string | Date;

    seller: User;
    buyer: User;
    details: Array<OrderDetail>;

    can_cancel: boolean;
    concatenated_products: string;
}