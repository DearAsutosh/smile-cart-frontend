import { useEffect, useState } from "react";

import productApi from "apis/products";
import { Header, PageLoader } from "components/commons";
import useDebounce from "hooks/useDebounce";
import { Search } from "neetoicons";
import { Input, NoData } from "neetoui";
import { isEmpty, without } from "ramda";

import ProductListItem from "./ProductListItem";

const ProductList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const debouncedSearchKey = useDebounce(searchKey);
  const [cartItems, setCartItems] = useState([]);

  const fetchProducts = async () => {
    try {
      const data = await productApi.fetch({
        searchTerm: debouncedSearchKey,
      });
      setProducts(data.products);
    } catch (error) {
      console.log("An error occurred : ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleIsInCart = slug =>
    setCartItems(prevCartItems =>
      prevCartItems.includes(slug)
        ? without([slug], cartItems)
        : [slug, ...cartItems]
    );

  useEffect(() => {
    fetchProducts();
  }, [debouncedSearchKey]);

  if (isLoading) return <PageLoader />;

  return (
    <div className="flex flex-col">
      <Header
        cartItemsCount={cartItems.length}
        shouldShowBackButton={false}
        title="Smile Cart"
        actionBlock={
          <Input
            placeholder="Search components"
            prefix={<Search />}
            type="search"
            value={searchKey}
            onChange={event => setSearchKey(event.target.value)}
          />
        }
      />
      {isEmpty(products) ? (
        <NoData className="h-full w-full" title="No products to show" />
      ) : (
        <div className="justify-items-centre grid grid-cols-2 gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map(product => (
            <ProductListItem
              key={product.slug}
              {...product}
              isInCart={cartItems.includes(product.slug)}
              toggleIsInCart={() => toggleIsInCart(product.slug)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default ProductList;
