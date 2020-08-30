import React, {useEffect} from 'react';
import {
  SafeAreaView,
  BackHandler 
} from 'react-native';
import {
  Divider,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Spinner,
  Text
} from '@ui-kitten/components';
import {Product} from './data';
import {ProductM} from './dataM';
import RNPrint from 'react-native-print';
import moment from 'moment';
import './global';
let SQLite = require('react-native-sqlite-storage');

const BackIcon = props => <Icon {...props} name="arrow-back" />;

export const PrintScreen = ({navigation}) => {
  const [products, setProducts] = React.useState([]);
  const [dataBeli, setDataBeli] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [once, setOnce] = React.useState(0);
  const [total, setTotal] = React.useState(0);

  function handleBackButtonClick() {
    navigation.navigate('Home');
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);

  useEffect(() => {
    setLoading(true)
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
          totalFix += row.price * row.amount;
          dataFix.push(
            `<tr style="text-align:center">
              <td>${row.amount}</td>
              <td>${row.name}</td>
              <td>${row.price}</td>
            </tr>`,
          );
          if (row.name === 'Shoyu Ramen') {
            data.push(Product.makanan1());
          } else if (row.name === 'Spicy Ramen') {
            data.push(Product.makanan2());
          } else if (row.name === 'Beef Ramen') {
            data.push(Product.makanan3());
          } else if (row.name === 'Miso Ramen') {
            data.push(Product.makanan4());
          } else if (row.name === 'Beef Udon') {
            data.push(Product.makanan5());
          } else if (row.name === 'Takoyaki') {
            data.push(Product.makanan6());
          } else if (row.name === 'Okonomiyaki') {
            data.push(Product.makanan7());
          } else if (row.name === 'Kare Rice') {
            data.push(Product.makanan8());
          } else if (row.name === 'Ocha') {
            data.push(ProductM.minuman1());
          } else if (row.name === 'Air Mineral') {
            data.push(ProductM.minuman2());
          } else {
            data.push(ProductM.minuman3());
          }
        }
        setProducts(data);
        setTotal(totalFix);
        setDataBeli(dataFix);
        setLoading(false)
      });
    });
  },[]);

  useEffect(() => {
    if(dataBeli.length > 0) {
      once === 0 ? printHTML() : null
    }
    else {
      setLoading(true)
    }
  });

  const navigateBack = () => {
    navigation.navigate('Home');
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );


  async function printHTML() {
    setOnce(1)
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
              <td>${Math.floor(Math.random() * 10)}</td>
              <td colspan="2">
                ${moment(new Date()).format('DD MMMM YYYY ~ HH:mm')}
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
    var db = SQLite.openDatabase({
      name: 'penjualan.db',
      createFromLocation: '~takoyae.db',
      location: 'Library',
    });
    products.map(item => {
      db.transaction(
        tx => {
          tx.executeSql(
            'insert into penjualan (name,tgl,quantity,harga,total) values (?,?,?,?,?);',
            [
              item.title,
              moment().format('YYYY-MM-DD'),
              item.amount,
              item.price,
              item.price * item.amount,
            ],
          );
        },
        null,
        deleteAll(),
      );
    });
  }

  const deleteAll = () => {
    var db = SQLite.openDatabase({
      name: 'beli.db',
      createFromLocation: '~takoyae.db',
      location: 'Library',
    });
    db.transaction(
      tx => {
        tx.executeSql(`delete from beli;`);
      },
      null,
      null,
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation
        title="Takoyae"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      {loading ? (<Layout style={{flex: 1,
    justifyContent: 'center',
    alignItems:'center'}} ><Spinner></Spinner></Layout>) : <Layout style={{flex: 1,
      justifyContent: 'center',
      alignItems:'center'}} ><Text>Terimakasih</Text></Layout>}
    </SafeAreaView>
  );
};
