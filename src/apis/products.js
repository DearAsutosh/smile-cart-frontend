import axios from "axios";

const show = () => axios.get("products/infinix-inbook-2");

const productApi = { show };

export default productApi;
