import React, {useEffect} from 'react';
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
let SQLite = require('react-native-sqlite-storage');


const BackIcon = props => <Icon {...props} name="arrow-back" />;

export const DetailsScreen = ({navigation}) => {
  
  const [products, setProducts] = React.useState([]);
  const [dataBeli, setDataBeli] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  useEffect(() => {
    var db = SQLite.openDatabase({
      name: 'beli.db',
      createFromLocation: '~takoyae.db',
      location: 'Library',
    });
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM beli', [], (tx, results) => {
        var len = results.rows.length;
        let data = [];
        let dataFix = [];
        let totalFix = 0;
        for (var i = 0; i < len; i++) {
          var row = results.rows.item(i);
          dataFix.push(
            `<tr style="text-align:center">
              <td>${row.amount}</td>
              <td>${row.name}</td>
              <td>${row.price}</td>
            </tr>`,
          )
          totalFix += row.price*row.amount
          if (row.name === 'Shoyu Ramen') {
            data.push(Product.makanan1())
          }
          else  if (row.name === 'Spicy Ramen') {
            data.push(Product.makanan2())
          }
          else if (row.name === 'Beef Ramen') {
            data.push(Product.makanan3())
          }
          else if (row.name === 'Miso Ramen') {
            data.push(Product.makanan4())
          }
          else if (row.name === 'Beef Udon') {
            data.push(Product.makanan5())
          }
          else if (row.name === 'Takoyaki') {
            data.push(Product.makanan6())
          }
          else if (row.name === 'Okonomiyaki') {
            data.push(Product.makanan7())
          }
          else if (row.name === 'Kare Rice') {
            data.push(Product.makanan8())
          }
          else if (row.name === 'Ocha') {
            data.push(Product.minuman1())
          }
          else if (row.name === 'Air Mineral') {
            data.push(Product.minuman2())
          }
          else {
            data.push(Product.minuman3())
          }
        }
        setProducts(data)
        setDataBeli(dataFix)
        setTotal(totalFix)
      });
    }); 
  }, []);

  const navigateBack = () => {
    navigation.goBack();
  };

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
    var db = SQLite.openDatabase({
      name: 'beli.db',
      createFromLocation: '~takoyae.db',
      location: 'Library',
    });
    db.transaction(
      tx => {
        tx.executeSql(`delete from beli where name = ?;`, [product.title]);
      }, null, products.splice(index, 1)
    )
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

  async function printHTML() {
    await RNPrint.print({
      html: `<html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style>
          td {
            padding: 5px;
          }
          body {
            font-size: 9px;
          }
          table {
            font-size: 9px;
          }
        </style>
      </head>
      <body>
        <center>
          <p style="font-weight: bold">Takoyae Ramen</p>
          <p>
            Jl. Keadilan Raya No.2, Bakti Jaya, Kec. Sukmajaya, <br />Kota Depok,
            Jawa Barat 16417
          </p>
          <table style="margin: 0px auto;">
            <tr>
              <td>${Math.floor( Math.random() * 10, )}</td>
              <td colspan="2">
                ${moment(new Date()).format( 'DD MMMM YYYY ~ HH:mm', )}
              </td>
            </tr>
            ${dataBeli}
            <tr>
              <td colspan="3"><hr /></td>
            </tr>
            <tr>
              <td colspan="2" style="font-weight: bold">TOTAL</td>
              <td style="font-weight: bold">
                Rp. ${total}
              </td>
            </tr>
          </table>
    
          <p style="font-weight: bold">TERIMA KASIH</p>
          <p style="font-weight: bold">ATAS KUNJUNGAN ANDA</p>
        </center>
      </body>
    </html>
    `,
    });
  }
  
  
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
