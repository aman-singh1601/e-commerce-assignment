import { getproducts, searchproducts } from "./backend_helper";

const getProducts = async (skip, limit) => {
    try {   
        const response = await getproducts(skip, limit);
        return response;
    }catch (e) {
        console.log("GET_PRODUCTS_ERROR", e);
        return false;
    }
}

const searchProducts = async (skip, limit, options) => {
    try {
        const response = await searchproducts(skip, limit, options);
        return response;
    } catch (error) {
        console.log("SEARCH_PRODUCTS_ERROR", error);
        return false;
    }
}
export {getProducts, searchProducts};
