import { useEffect, useState } from "react";

import productApi from "apis/products";
import { Header, PageLoader, PageNotFound } from "components/commons";
import AddToCart from "components/commons/AddToCart";
import { Typography } from "neetoui";
import { append, isNotNil } from "ramda";
import { useParams } from "react-router-dom";

import Carousel from "./Carousel";

// import { IMAGE_URLS } from "./constants";

const Product = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [isError, setIsError] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const product = await productApi.show(slug);
      setProduct(product);
      console.log(product);
    } catch (error) {
      console.log("An error occurred : ", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  if (isError) {
    return <PageNotFound />;
  }

  if (isLoading) return <PageLoader />;

  const { name, description, mrp, offerPrice, imageUrls, imageUrl } = product;
  const totalDiscount = mrp - offerPrice;
  const discountPercentage = ((totalDiscount / mrp) * 100).toFixed(1);

  return (
    <div className="m-2">
      <div className="flex items-center">
        <Header shouldShowBackButton="true" title={name} />
      </div>
      <div className="mt-16 flex gap-4">
        <div className="w-2/5">
          {isNotNil(imageUrls) ? (
            <Carousel imageUrls={append(imageUrl, imageUrls)} title={name} />
          ) : (
            <img alt={name} className="w-48" src={imageUrl} />
          )}
        </div>
        <div className="w-3/5 space-y-4">
          <Typography>{description}</Typography>
          <Typography>MRP: {mrp}</Typography>
          <Typography className="font-semibold">
            Offer price: {offerPrice}
          </Typography>
          <Typography className="font-semibold text-green-600">
            {discountPercentage}% off
          </Typography>
          <AddToCart {...{ slug }} />
        </div>
      </div>
    </div>
  );
};

export default Product;
