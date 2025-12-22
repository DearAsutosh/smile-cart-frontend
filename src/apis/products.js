import axios from "axios";

const fetch = () => axios.get("products");
const show = slug => axios.get(`products/${slug}`);

const productApi = { show, fetch };

export default productApi;
