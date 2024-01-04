import {User} from "~/types/User";

export type Media = {
    id: number;
    name: string;
    file_name: string;
    collection_name: string;
    mime_type: string;
    size: number;
    created_at: string | Date;
    url: string;
    thumb_url: string;
    responsive_url: string;
}

export type Option = {
    id: number;
    name: string;
    is_available: boolean;
    price: number;
    price_in_cents: number;
    currency: string;
    created_at: string | Date;
    updated_at: string | Date;
}

export type Modifier = {
    id: number;
    name: string;
    is_multiple: boolean;
    created_at: string | Date;
    updated_at: string | Date;
    options: Array<Option>;
}

export type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    price_in_cents: number;
    formatted_price: string;
    formatted_discounted_price: string;
    discount: number;
    has_discount: boolean;
    formatted_discount: string;
    currency: string;
    place_id: string;
    places_address: string;
    is_special: boolean;
    is_counted: boolean;
    points: number;
    created_at: string | Date;
    updated_at: string | Date;
    deleted_at?: string | Date;
    photos: Array<Media>;
    seller: User;
    selections: Array<Modifier>
}