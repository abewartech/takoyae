import {ImageSourcePropType} from 'react-native';

export class Product {
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

  static makanan1(): Product {
    return new Product(
      'Shoyu Ramen',
      'Makanan',
      require('./assets/images/1.jpeg'),
      30000,
      1,
    );
  }

  static makanan2(): Product {
    return new Product(
      'Spicy Ramen',
      'Makanan',
      require('./assets/images/2.jpeg'),
      30000,
      1,
    );
  }

  static makanan3(): Product {
    return new Product(
      'Beef Ramen',
      'Makanan',
      require('./assets/images/3.jpeg'),
      30000,
      1,
    );
  }

  static makanan4(): Product {
    return new Product(
      'Miso Ramen',
      'Makanan',
      require('./assets/images/4.jpeg'),
      30000,
      1,
    );
  }

  static makanan5(): Product {
    return new Product(
      'Beef Udon',
      'Makanan',
      require('./assets/images/5.jpeg'),
      30000,
      1,
    );
  }

  static makanan6(): Product {
    return new Product(
      'Takoyaki',
      'Makanan',
      require('./assets/images/6.jpeg'),
      15000,
      1,
    );
  }

  static makanan7(): Product {
    return new Product(
      'Okonomiyaki',
      'Makanan',
      require('./assets/images/7.jpeg'),
      20000,
      1,
    );
  }

  static makanan8(): Product {
    return new Product(
      'Kare Rice',
      'Makanan',
      require('./assets/images/8.jpeg'),
      32000,
      1,
    );
  }
}
