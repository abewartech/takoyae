import React from 'react';
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
import {Product} from './data';

const products: Product[] = [
  Product.pinkChair(),
  Product.blackLamp(),
  Product.whiteChair(),
  Product.woodChair(),
  Product.pinkChair(),
  Product.blackLamp(),
  Product.whiteChair(),
  Product.woodChair(),
];

export const HomeScreen = ({navigation, route}) => {
  const navigateDetails = () => {
    navigation.navigate('Details');
  };

  const displayProducts: Product[] = products.filter(
    product => product.category === route.name,
  );

  const MenuIcon = props => <Icon {...props} name="menu-outline" />;

  const MakanIcon = props => <Icon {...props} name="person-outline" />;

  const CartIcon = props => <Icon {...props} name="shopping-cart" />;

  const MinumIcon = props => <Icon {...props} name="bell-outline" />;

  const renderBackAction = () => <TopNavigationAction icon={MenuIcon} />;

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const renderItemFooter = (
    info: ListRenderItemInfo<Product>,
  ): React.ReactElement => (
    <Layout style={styles.itemFooter}>
      <Text category="s1">{info.item.formattedPrice}</Text>
      <Button
        style={styles.iconButton}
        size="small"
        accessoryLeft={CartIcon}
        onPress={navigateDetails}
      />
    </Layout>
  );

  const renderItemHeader = (
    info: ListRenderItemInfo<Product>,
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
      onPress={navigateDetails}>
      <Text category="s1">{info.item.title}</Text>
      <Text appearance="hint" category="c1">
        {info.item.category}
      </Text>
    </Card>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
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
            data={(displayProducts.length && displayProducts) || products}
            numColumns={2}
            renderItem={renderProductItem}
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
});
