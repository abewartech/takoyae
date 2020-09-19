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
            global.config.date = date;
            global.config.dateTo = dateTo;
            navigation.navigate('Penjualan');
          }}>
          Laporan Penjualan
        </Button>
        <Button
          style={styles.modalBtn}
          onPress={() => {
            global.config.date = date;
            global.config.dateTo = dateTo;
            navigation.navigate('Pendapatan');
          }}>
          Laporan Pendapatan
        </Button>
        <Divider />
        <Button
          style={styles.modalBtnM}
          onPress={() => {
            global.config.date = date;
            global.config.dateTo = dateTo;
            navigation.navigate('Mingguan');
          }}>
          Laporan Mingguan
        </Button>
        <Button
          style={styles.modalBtn}
          onPress={() => {
            global.config.date = date;
            global.config.dateTo = dateTo;
            navigation.navigate('Bulanan');
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
  modalBtnM: {
    marginTop: 28,
    marginHorizontal: 16,
    marginVertical: 16,
  },
});
