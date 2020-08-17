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
  Modal,
  Datepicker,
  View,
  Button,
} from '@ui-kitten/components';
import RNPrint from 'react-native-print';
import moment from 'moment';
import './global';

const renderCalendarIcon = style => <Icon {...style} name="calendar" />;

const BackIcon = props => <Icon {...props} name="arrow-back" />;

export const LaporanScreen = ({navigation}) => {
  const [date, setDate] = React.useState(null);
  const [dateTo, setDateTo] = React.useState(null);

  const navigateBack = () => {
    navigation.goBack();
  };

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
            13 Agustus 2020 - 13 Agustus 2021</sup
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
              <td>Abe</td>
              <td></td>
              <td>2 Jam</td>
              <td></td>
              <td>2 Jam</td>
            </tr>
          </tbody>
        </table>
        <div style="text-align: right; margin-top: 25px; margin-right: 50px;">
          Depok, 16 July 2020
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
});
