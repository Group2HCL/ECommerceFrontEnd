import { Products } from "./products.model";

export class CartItem {
    id?: string;
    name?: string;
    imageUrl?: string;
    unitPrice?: number;
    quantity?: number = 0;

    constructor(product: Products) {
        this.id = product.id;
        this.name = product.name;
        this.imageUrl = product.image;
        this.unitPrice = product.price;
        this.quantity = 1;
    }

}