import React from 'react';
import {
  SafeAreaView,
  ImageBackground,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  List,
  Button,
} from '@ui-kitten/components';
import {Product} from './data';
import {ProductM} from './dataM';
import {CartItem} from './extra/cart-item.component';
import RNPrint from 'react-native-print';
import moment from 'moment';
import './global';

const BackIcon = props => <Icon {...props} name="arrow-back" />;

export const DetailsScreen = ({navigation}) => {
  const initialProducts: Product[] = [
    global.config.idProd === 'Shoyu Ramen'
      ? Product.makanan1()
      : global.config.idProd === 'Spicy Ramen'
      ? Product.makanan2()
      : global.config.idProd === 'Beef Ramen'
      ? Product.makanan3()
      : global.config.idProd === 'Miso Ramen'
      ? Product.makanan4()
      : global.config.idProd === 'Beef Udon'
      ? Product.makanan5()
      : global.config.idProd === 'Takoyaki'
      ? Product.makanan6()
      : global.config.idProd === 'Okonomiyaki'
      ? Product.makanan7()
      : global.config.idProd === 'Kare Rice'
      ? Product.makanan8()
      : ProductM.minuman1(),
  ];

  const navigateBack = () => {
    navigation.goBack();
  };

  const [products, setProducts] = React.useState(initialProducts);

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const totalCost = (): number => {
    return products.reduce(
      (acc: number, product: Product): number => acc + product.totalPrice,
      0,
    );
  };

  const onItemChange = (product: Product, index: number): void => {
    products[index] = product;
    setProducts([...products]);
  };

  const onItemRemove = (product: Product, index: number): void => {
    products.splice(index, 1);
    setProducts([...products]);
  };

  const renderProductItem = (
    info: ListRenderItemInfo<Product>,
  ): React.ReactElement => (
    <CartItem
      style={styles.item}
      index={info.index}
      product={info.item}
      onProductChange={onItemChange}
      onRemove={onItemRemove}
    />
  );

  const renderFooter = (): React.ReactElement => (
    <Layout style={styles.footer}>
      <Text category="h5">Total Harga:</Text>
      <Text category="h5">{`Rp. ${totalCost()}`}</Text>
    </Layout>
  );

  const printHTML = () => {
    RNPrint.print({
      html: `<html><head> <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/> <style>td{padding: 5px;}body{font-size: 9px}table{font-size: 9px}</style></head><body> <center> <p style="font-weight: bold">Takoyae Ramen</p><p>Jl. Keadilan Raya No.2, Bakti Jaya, Kec. Sukmajaya, <br>Kota Depok, Jawa Barat 16417</p><table style="margin: 0px auto;"> <tr> <td>${Math.floor(
        Math.random() * 10,
      )}</td><td colspan="2">${moment(new Date()).format(
        'DD MMMM YYYY ~ HH:mm',
      )}</td></tr><tr> <td>${global.config.amount}x</td><td>${
        global.config.price
      }</td><td>Rp. ${global.config.amount *
        global.config
          .price}</td></tr><tr> <td colspan="3"> <hr> </td></tr><tr> <td colspan="2" style="font-weight: bold">TOTAL</td><td style="font-weight: bold">Rp. ${global
        .config.amount *
        global.config
          .price}</td></tr></table> <p style="font-weight: bold">TERIMA KASIH</p><p style="font-weight: bold">ATAS KUNJUNGAN ANDA</p></center></body></html>`,
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation
        title="Takoyae"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <Layout style={styles.container} level="2">
        <List
          data={products}
          renderItem={renderProductItem}
          ListFooterComponent={renderFooter}
        />
        <Button
          style={styles.checkoutButton}
          size="giant"
          onPress={() => {
            printHTML();
          }}>
          BAYAR
        </Button>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 0.5,
    paddingVertical: 28,
    paddingHorizontal: 16,
  },
  checkoutButton: {
    marginHorizontal: 16,
    marginVertical: 24,
  },
});
