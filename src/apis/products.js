import axios from "axios";

const show = () =>
  axios.get(
    "https://smile-cart-backend-staging.neetodeployapp.com/products/infinix-inbook-2"
  );

const productApi = { show };

export default productApi;
