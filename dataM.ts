import { ImageSourcePropType } from 'react-native';

export class ProductM {

    constructor(readonly title: string,
        readonly category: string,
        readonly image: ImageSourcePropType,
        readonly price: number,
        readonly amount: number) {
    }

    get formattedPrice(): string {
        return `Rp. ${this.price}`;
    }

    get totalPrice(): number {
        return this.price * this.amount;
    }

    static minuman1(): ProductM {
        return new ProductM(
            'Aer',
            'Minuman',
            require('./assets/images/aer.jpg'),
            5000,
            1,
        );
    }

}
