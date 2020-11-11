import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ImageBackground,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {
  Button,
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Icon,
  Tab,
  TabView,
  List,
  Card,
  Text,
} from '@ui-kitten/components';
import { Product } from './data';
import { ProductM } from './dataM';
import './global';
let SQLite = require('react-native-sqlite-storage');

const products: Product[] = [
  Product.makanan1(),
  Product.makanan2(),
  Product.makanan3(),
  Product.makanan4(),
  Product.makanan5(),
  Product.makanan6(),
  Product.makanan7(),
  Product.makanan8(),
];

const productsM: ProductM[] = [
  ProductM.minuman1(),
  ProductM.minuman2(),
  ProductM.minuman3(),
];

export const HomeScreen = ({ navigation, route }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [record, setRecord] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);

  const navigateDetails = item => {
    saveItem(item);
  };

  const saveItem = item => {
    var db = SQLite.openDatabase({
      name: 'beli.db',
      createFromLocation: '~takoyae.db',
      location: 'Library',
    });
    db.transaction(
      tx => {
        tx.executeSql(
          'insert into beli (name,price,amount,total) values (?,?,?,?);',
          [item.title, item.price, item.amount, item.price * item.amount],
        );
      },
      null,
      navigation.navigate('Details'),
    );
  };

  const displayProducts: Product[] = products.filter(
    product => product.category === route.name,
  );

  const displayProductsM: ProductM[] = productsM.filter(
    productM => productM.category === route.name,
  );

  const MenuIcon = props => <Icon {...props} name="menu-outline" />;

  const MakanIcon = props => <Icon {...props} name="pie-chart-outline" />;

  const CartIcon = props => <Icon {...props} name="shopping-cart" />;

  const MinumIcon = props => <Icon {...props} name="droplet-outline" />;

  const toggleModal = (): void => {
    navigation.navigate('Laporan');
  };

  const renderBackAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleModal} />
  );

  const renderItemFooter = (
    info: ListRenderItemInfo<Product>,
  ): React.ReactElement => (
      <Layout style={styles.itemFooter}>
        <Text category="s1">{info.item.formattedPrice}</Text>
        <Button
          style={styles.iconButton}
          size="small"
          accessoryLeft={CartIcon}
          onPress={() => {
            navigateDetails(info.item);
          }}
        />
      </Layout>
    );

  const renderItemFooterM = (
    info: ListRenderItemInfo<ProductM>,
  ): React.ReactElement => (
      <Layout style={styles.itemFooter}>
        <Text category="s1">{info.item.formattedPrice}</Text>
        <Button
          style={styles.iconButton}
          size="small"
          accessoryLeft={CartIcon}
          onPress={() => {
            navigateDetails(info.item);
          }}
        />
      </Layout>
    );

  const renderItemHeader = (
    info: ListRenderItemInfo<Product>,
  ): React.ReactElement => (
      <ImageBackground style={styles.itemHeader} source={info.item.image} />
    );

  const renderItemHeaderM = (
    info: ListRenderItemInfo<ProductM>,
  ): React.ReactElement => (
      <ImageBackground style={styles.itemHeader} source={info.item.image} />
    );

  const renderProductItem = (
    info: ListRenderItemInfo<Product>,
  ): React.ReactElement => (
      <Card
        style={styles.productItem}
        header={() => renderItemHeader(info)}
        footer={() => renderItemFooter(info)}
        onPress={() => {
          navigateDetails(info.item);
        }}>
        <Text category="s1">{info.item.title}</Text>
        <Text appearance="hint" category="c1">
          {info.item.category}
        </Text>
      </Card>
    );

  const renderProductItemM = (
    info: ListRenderItemInfo<ProductM>,
  ): React.ReactElement => (
      <Card
        style={styles.productItem}
        header={() => renderItemHeaderM(info)}
        footer={() => renderItemFooterM(info)}
        onPress={() => {
          navigateDetails(info.item);
        }}>
        <Text category="s1">{info.item.title}</Text>
        <Text appearance="hint" category="c1">
          {info.item.category}
        </Text>
      </Card>
    );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title="Takoyae"
        alignment="center"
        accessoryLeft={renderBackAction}
      />
      <Divider />
      <TabView
        style={styles.tabView}
        tabBarStyle={styles.tabBar}
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>
        <Tab title="Makanan" icon={MakanIcon}>
          <List
            contentContainerStyle={styles.productList}
            data={(displayProducts.length && displayProducts) || products}
            numColumns={2}
            renderItem={renderProductItem}
          />
        </Tab>
        <Tab title="Minuman" icon={MinumIcon}>
          <List
            contentContainerStyle={styles.productList}
            data={(displayProductsM.length && displayProductsM) || productsM}
            numColumns={2}
            renderItem={renderProductItemM}
          />
        </Tab>
      </TabView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabView: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
  },
  productList: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  productItem: {
    flex: 1,
    margin: 8,
    maxWidth: Dimensions.get('window').width / 2 - 24,
  },
  itemHeader: {
    height: 140,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
  modalReportContainer: {
    width: 20,
    height: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 8,
    paddingTop: 15,
  },
  modalBtn: {
    width: 20,
    marginVertical: 10,
  },
  mainSection: { width: 20 },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  sectionReport: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
