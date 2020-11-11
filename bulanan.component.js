import React, {useEffect} from 'react';
import {SafeAreaView, BackHandler} from 'react-native';
import {
  Divider,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Spinner,
  Text,
} from '@ui-kitten/components';
import {Product} from './data';
import {ProductM} from './dataM';
import RNPrint from 'react-native-print';
import moment from 'moment';
import './global';
import {dateTo} from './global';
let SQLite = require('react-native-sqlite-storage');

const BackIcon = props => <Icon {...props} name="arrow-back" />;

export const BulananScreen = ({navigation}) => {
  const [products, setProducts] = React.useState([]);
  const [dataBeli, setDataBeli] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [once, setOnce] = React.useState(0);
  const [total, setTotal] = React.useState(0);

  function handleBackButtonClick() {
    navigation.navigate('Laporan');
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    var db = SQLite.openDatabase({
      name: 'penjualan.db',
      createFromLocation: '~takoyae.db',
      location: 'Library',
    });
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM penjualan WHERE tgl BETWEEN '${moment()
          .subtract(1, 'months')
          .format('YYYY-MM-DD')}' AND '${moment().format('YYYY-MM-DD')}'`,
        [],
        (tx, results) => {
          var len = results.rows.length;
          let dataFix = [];
          for (var i = 0; i < len; i++) {
            var row = results.rows.item(i);
            dataFix.push(
              `<tr style="text-align:center">
              <td>${row.id}</td>
              <td>${row.tgl}</td>
              <td>${row.name}</td>
              <td>${row.quantity}</td>
              <td>${row.harga}</td>
              <td>${row.total}</td>
            </tr>`,
            );
          }
          setDataBeli(dataFix);
          setLoading(false);
        },
      );
    });
  }, []);

  useEffect(() => {
    if (dataBeli.length > 0) {
      once === 0 ? printHTML() : null;
    } else {
      setLoading(true);
    }
  });

  const navigateBack = () => {
    navigation.navigate('Laporan');
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  async function printHTML() {
    setOnce(1);
    await RNPrint.print({
      html: `<html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style>
          body {
            font-family: calibri;
          }
    
          table,
          tr,
          td {
            border: 1px solid #db0a5b;
            border-collapse: collapse;
          }
    
          .page_break {
            page-break-before: always;
          }
    
          .badge {
            display: inline-block;
            padding: 0.25em 0.4em;
            font-size: 72%;
            font-weight: 300;
            line-height: 1;
            text-align: center;
            white-space: nowrap;
            vertical-align: baseline;
            border-radius: 0.25rem;
            transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
              border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          }
    
          .badge-pill {
            padding-right: 0.6em;
            padding-left: 0.6em;
            border-radius: 10rem;
          }
    
          .badge-info {
            color: #fff;
            background-color: #db0a5b;
          }
    
          .white {
            border-color: #fff !important;
          }
        </style>
      </head>
    
      <body>
        <div style="width: 100%; text-align: center;">
          <h1 style="background-color: #db0a5b; color: #fff; padding: 20px;">
          <img src="assets/images/logo.png;base64,${imgData}" width="90" height="100" align=left>
            Takoyae Ramen
          </h1>
          <h5 style="color: #db0a5b;">
            Jl. Keadilan Raya No.2, Bakti Jaya, Kec. Sukmajaya,Kota Depok, Jawa
            Barat 16417
          </h5>
          <hr style="border-top: 2px solid #db0a5b;" />
        </div>
        <h2 style="font-weight: bold;">
          Laporan Penjualan
          <sup
            class="badge badge-pill badge-info"
            style="font-weight: 300 !important;"
          >
          ${moment()
            .subtract(1, 'months')
            .format('DD MMMM YYYY')} - ${moment().format('DD MMMM YYYY')}</sup
          >
        </h2>
        <table cellpadding="5" style="width: 100%">
          <thead>
            <tr style="text-align: center; background-color: #db0a5b; color: #fff;">
              <td class="white">ID</td>
              <td class="white">Tanggal</td>
              <td class="white">Menu</td>
              <td class="white">Quantity</td>
              <td class="white">Harga</td>
              <td class="white">Total</td>
            </tr>
          </thead>
          <tbody>
          ${dataBeli}
          </tbody>
        </table>
        <div style="text-align: right; margin-top: 25px; margin-right: 50px;">
          Depok, 20 Juli 2020
        </div>
        <div style="text-align: right; margin-top: 100px; margin-right: 85px;">
          Andrew
        </div>
      </body>
    </html>`,
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
      {loading ? (
        <Layout
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Spinner />
        </Layout>
      ) : (
        <Layout
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Terimakasih</Text>
        </Layout>
      )}
    </SafeAreaView>
  );
};
