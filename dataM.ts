import {ImageSourcePropType} from 'react-native';

export class ProductM {
  constructor(
    readonly title: string,
    readonly category: string,
    readonly image: ImageSourcePropType,
    readonly price: number,
    readonly amount: number,
  ) {}

  get formattedPrice(): string {
    return `Rp. ${this.price}`;
  }

  get totalPrice(): number {
    return this.price * this.amount;
  }

  static minuman1(): ProductM {
    return new ProductM(
      'Ocha',
      'Minuman',
      require('./assets/images/ocha.jpg'),
      5000,
      1,
    );
  }

  static minuman2(): ProductM {
    return new ProductM(
      'Air Mineral',
      'Minuman',
      require('./assets/images/aer.jpg'),
      4000,
      1,
    );
  }

  static minuman3(): ProductM {
    return new ProductM(
      'Coca-Cola',
      'Minuman',
      require('./assets/images/coca.jpg'),
      7000,
      1,
    );
  }
}
