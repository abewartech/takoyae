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
  Modal,
  Datepicker,
  View,
  Button,
} from '@ui-kitten/components';
import RNPrint from 'react-native-print';
import moment from 'moment';
import './global';
let SQLite = require('react-native-sqlite-storage');

const renderCalendarIcon = style => <Icon {...style} name="calendar" />;

const BackIcon = props => <Icon {...props} name="arrow-back" />;

export const LaporanScreen = ({navigation}) => {
  const [date, setDate] = React.useState(null);
  const [dateTo, setDateTo] = React.useState(null);
  const [record, setRecord] = React.useState([]);

  const navigateBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    var db = SQLite.openDatabase({
      name: 'penjualan.db',
      createFromLocation: '~takoyae.db',
      location: 'Library',
    });
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM penjualan', [], (tx, results) => {
        var len = results.rows.length;
        let data = [];
        for (var i = 0; i < len; i++) {
          var row = results.rows.item(i);
          data.push(row);
        }
        setRecord(data);
      });
    });
  }, []);

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const printHTML = () => {
    RNPrint.print({
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
            15 Juli 2020 - 16 Juli 2020</sup
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
            <tr style="text-align: center;">
              <td>6</td>
              <td>15-06-2020</td>
              <td>Shoyu Ramen</td>
              <td>1</td>
              <td>30000</td>
              <td>30000</td>
            </tr>
            <tr style="text-align: center;">
              <td>7</td>
              <td>15-06-2020</td>
              <td>Ocha</td>
              <td>1</td>
              <td>5000</td>
              <td>5000</td>
            </tr>
            <tr style="text-align: center;">
              <td>8</td>
              <td>15-06-2020</td>
              <td>Kare Rice</td>
              <td>1</td>
              <td>32000</td>
              <td>32000</td>
            </tr>
            <tr style="text-align: center;">
              <td>9</td>
              <td>16-06-2020</td>
              <td>Spicy Ramen</td>
              <td>2</td>
              <td>30000</td>
              <td>60000</td>
            </tr>
            <tr style="text-align: center;">
              <td>10</td>
              <td>16-06-2020</td>
              <td>Ocha</td>
              <td>2</td>
              <td>5000</td>
              <td>10000</td>
            </tr>
            <tr style="text-align: center;">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>TOTAL :</td>
              <td>137000</td>
            </tr>
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
  };

  const printHTMLminggu = () => {
    RNPrint.print({
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
            13 Juli 2020 - 19 Juli 2020</sup
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
            <tr style="text-align: center;">
              <td>5</td>
              <td>13-06-2020</td>
              <td>Okonomiyaki</td>
              <td>1</td>
              <td>20000</td>
              <td>20000</td>
            </tr>
            <tr style="text-align: center;">
              <td>6</td>
              <td>15-06-2020</td>
              <td>Shoyu Ramen</td>
              <td>1</td>
              <td>30000</td>
              <td>30000</td>
            </tr>
            <tr style="text-align: center;">
              <td>7</td>
              <td>15-06-2020</td>
              <td>Ocha</td>
              <td>1</td>
              <td>5000</td>
              <td>5000</td>
            </tr>
            <tr style="text-align: center;">
              <td>8</td>
              <td>15-06-2020</td>
              <td>Kare Rice</td>
              <td>1</td>
              <td>32000</td>
              <td>32000</td>
            </tr>
            <tr style="text-align: center;">
              <td>9</td>
              <td>16-06-2020</td>
              <td>Spicy Ramen</td>
              <td>2</td>
              <td>30000</td>
              <td>60000</td>
            </tr>
            <tr style="text-align: center;">
              <td>10</td>
              <td>16-06-2020</td>
              <td>Ocha</td>
              <td>2</td>
              <td>5000</td>
              <td>10000</td>
            </tr>
            <tr style="text-align: center;">
              <td>11</td>
              <td>18-06-2020</td>
              <td>Beef Udon</td>
              <td>1</td>
              <td>30000</td>
              <td>30000</td>
            </tr>
            <tr style="text-align: center;">
              <td>12</td>
              <td>19-06-2020</td>
              <td>Miso Ramen</td>
              <td>1</td>
              <td>30000</td>
              <td>30000</td>
            </tr>
            <tr style="text-align: center;">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>TOTAL :</td>
              <td>217000</td>
            </tr>
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
  };

  const printHTMLbulan = () => {
    RNPrint.print({
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
            1 Juli 2020 - 31 Juli 2020</sup
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
            <tr style="text-align: center;">
              <td>1</td>
              <td>01-06-2020</td>
              <td>Spicy Ramen</td>
              <td>1</td>
              <td>30000</td>
              <td>30000</td>
            </tr>
            <tr style="text-align: center;">
              <td>2</td>
              <td>01-06-2020</td>
              <td>Beef Ramen</td>
              <td>1</td>
              <td>30000</td>
              <td>30000</td>
            </tr>
            <tr style="text-align: center;">
              <td>3</td>
              <td>01-06-2020</td>
              <td>Coca-Cola</td>
              <td>1</td>
              <td>7000</td>
              <td>7000</td>
            </tr>
            <tr style="text-align: center;">
              <td>4</td>
              <td>01-06-2020</td>
              <td>Air Mineral</td>
              <td>1</td>
              <td>4000</td>
              <td>4000</td>
            </tr>
            <tr style="text-align: center;">
              <td>5</td>
              <td>13-06-2020</td>
              <td>Okonomiyaki</td>
              <td>1</td>
              <td>20000</td>
              <td>20000</td>
            </tr>
            <tr style="text-align: center;">
              <td>6</td>
              <td>15-06-2020</td>
              <td>Shoyu Ramen</td>
              <td>1</td>
              <td>30000</td>
              <td>30000</td>
            </tr>
            <tr style="text-align: center;">
              <td>7</td>
              <td>15-06-2020</td>
              <td>Ocha</td>
              <td>1</td>
              <td>5000</td>
              <td>5000</td>
            </tr>
            <tr style="text-align: center;">
              <td>8</td>
              <td>15-06-2020</td>
              <td>Kare Rice</td>
              <td>1</td>
              <td>32000</td>
              <td>32000</td>
            </tr>
            <tr style="text-align: center;">
              <td>9</td>
              <td>16-06-2020</td>
              <td>Spicy Ramen</td>
              <td>2</td>
              <td>30000</td>
              <td>60000</td>
            </tr>
            <tr style="text-align: center;">
              <td>10</td>
              <td>16-06-2020</td>
              <td>Ocha</td>
              <td>2</td>
              <td>5000</td>
              <td>10000</td>
            </tr>
            <tr style="text-align: center;">
              <td>11</td>
              <td>18-06-2020</td>
              <td>Beef Udon</td>
              <td>1</td>
              <td>30000</td>
              <td>30000</td>
            </tr>
            <tr style="text-align: center;">
              <td>12</td>
              <td>19-06-2020</td>
              <td>Miso Ramen</td>
              <td>1</td>
              <td>30000</td>
              <td>30000</td>
            </tr>
            <tr style="text-align: center;">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>TOTAL :</td>
              <td>288000</td>
            </tr>
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
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation
        title="Laporan"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <Layout style={styles.container} level="2">
        <Datepicker
          placeholder="Dari Tanggal"
          date={date}
          onSelect={setDate}
          style={styles.modalBtn}
          icon={renderCalendarIcon}
        />
        <Datepicker
          placeholder="Sampai Tanggal"
          date={dateTo}
          onSelect={setDateTo}
          style={styles.modalBtn}
          icon={renderCalendarIcon}
        />
        <Button
          style={styles.modalBtn}
          onPress={() => {
            printHTML();
          }}>
          Laporan Penjualan
        </Button>
        <Button
          style={styles.modalBtn}
          onPress={() => {
            printHTMLminggu();
          }}>
          Laporan Mingguan
        </Button>
        <Button
          style={styles.modalBtn}
          onPress={() => {
            printHTMLbulan();
          }}>
          Laporan Bulanan
        </Button>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  modalBtn: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
});
