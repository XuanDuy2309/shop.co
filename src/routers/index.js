import Homepage from "../pages/homepage";
import ProductDetailPage from "../pages/productDetailPage";
import CategoryPage from "../pages/category";
import Cart from "../pages/cart";
import LoginPage from "../pages/loginPage";
import Profile from "../pages/profile";
import RegisterPage from "../pages/registerPage";

export const publicRouters = [
    {path: '/shop.co', component: Homepage},
    {path: '/product/:productId', component: ProductDetailPage},
    {path: '/category/:cateName', component: CategoryPage},
    {path: '/cart', component: Cart},
    {path: '/login', component: LoginPage},
    {path: '/user', component: Profile},
    {path: '/user/add', component: RegisterPage},

]