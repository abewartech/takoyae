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
import {CartItem} from './extra/cart-item.component';

const BackIcon = props => <Icon {...props} name="arrow-back" />;

const initialProducts: Product[] = [Product.pinkChair(), Product.blackLamp()];

export const DetailsScreen = ({navigation}) => {
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
      <Text category="h5">Total Cost:</Text>
      <Text category="h5">{`$${totalCost()}`}</Text>
    </Layout>
  );

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
        <Button style={styles.checkoutButton} size="giant">
          CHECKOUT
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
