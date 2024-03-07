
interface ProductCombine {
    id: number;
    product_name_ascii: string;
    color_id: number;
    storage_id: number;
    quantity: number;
    price: number;
    default: boolean;
    color_data: {
       color: string;
       color_ascii: string;
    };
    storage_data: {
       storage: string;
       storage_ascii: string;
    };
 }

 
 interface ProductSlider {
    id: number;
    product_name_ascii: string;
    slider_id: number;
    color_id: number;
    color_data: {
       color: string;
       color_ascii: string;
    };
    slider_data: Slider;
 }
 
 type SliderImage = {
    image_url: string;
    link_to: string;
    id?: number;
 };

 
 type Slider = {
    id: number;
    images: SliderImage[];
    slider_name: string;
 };

 
 type ProductStorage = {
    id: number;
    product_name_ascii: string;
    storage_ascii: string;
    storage: string;
    default: boolean;
    base_price: number;
 };
 
 type ProductColor = {
    id?: number;
    product_name_ascii: string;
    color_ascii: string;
    color: string;
    default: boolean;
 };
 
 interface Product {
    id: number;
    imei: string;
    product_name: string;
    product_name_ascii: string;
    category_id: number;
    brand_id: number;
    image_url: string;
    installment: boolean;
    category_data: Category;
    brand_data: {
       brand_name: string;
       brand_ascii: string;
    };
    detail: ProductDetail | null;
    storages_data: ProductStorage[];
    colors_data: ProductColor[];
    combines_data: ProductCombine[];
    sliders_data: ProductSlider[];
    attributes_data: ProductAttribute[];
    comments_data: ProductComment[];
 }

 type ProductDetail = {
    id: number;
    product_name_ascii: string;
    content: string;
 };
 
 type ProductAttribute = {
    id: number;
    category_attr_id: number;
    product_name_ascii: string;
    value: string;
 };

 
 type CategoryAttribute = {
    id: number;
    category_id: number;
    attribute: string;
    attribute_ascii: string;
 };
 
 type Category = {
    id: number;
    category_name_ascii: string;
    category_name: string;
    attribute_order: string;
    hidden?: boolean;
    attributes: CategoryAttribute[];
    price_ranges: PriceRange[];
 };
 
 
 type CategorySlider = {
    category_data: Category;
    slider_data: Slider;
 };
 
 type Brand = {
    id: number;
    brand_ascii: string;
    brand_name: string;
    image_url: string;
    category_id: number;
 };
 
 type User = {
    user_name: string;
    password: string;
    role_code: string;
 };
 
 type ImageType = {
    id: number;
    image_url: string;
    public_id: string;
    name: string;
    size: number;
    link_to: string;
 };
 

 
 type ProductComment = {
    id: number;
    q_id: number;
    product_name_ascii: string;
    cus_name: string;
    content: string;
    approve: number;
    date_convert: string;
    phone_number: string;
    total_like: number;
    reply_data?: Reply;
    product_data?: {
       product_name: string;
    };
 };
 
 type ProductReview = ProductComment & { rate: number };
 
 type Reply = Omit<ProductComment, "cus_name" | "phone_number" | "approve">;
 
 
 type PriceRange = {
    id: number;
    category_id: number;
    from: number;
    to: number;
    label: string;
 };
 
 type Cart = {
    id: number;
    username: string;
    count: number;
    total_price: number;
    items: CartItem[];
 };
 
 
 type CartItem = {
    id: number;
    username: string;
    product_name_ascii: string;
    amount: number;
    color_id: number;
    storage_id: number;
    product_data: {
       product_name: string;
       image_url: string;
       combines_data: ProductCombine[];
       colors_data: { color: string; id: number }[];
       storages_data: { storage: string; id: number }[];
       category_data: {
          category_name_ascii: string;
       };
    };
    updatedAt: string;
    createdAt: string;
 };
 
 type Order = {
    id: number;
    username: string;
    status: "completed" | "canceled" | "processing" | "delivering";
 
    items: OrderItem[];
 
    discount: number;
    purchase_price: number;
    total_price: number;
 
    purchase_type: string;
 
    recipient_name: string;
    recipient_phone_number: string;
    recipient_address: string;
 
    deliveredAt: string;
    canceledAt: string;
    createdAt: string;
 };
 
 type OrderSchema = Omit<
    Order,
    "createdAt" | "items" | "id" | "deliveredAt" | "canceledAt" | "createdAt"
 >;
 
 type OrderDetail = Omit<
    Order,
    "" & {
       purchase_type: string;
       recipient_name: string;
       recipient_phone_number: string;
       deliveredAt: string;
       canceledAt: string;
    }
 >;
 
 type OrderItem = {
    id: number;
    order_id: number;
    product_name: string;
    amount: number;
    color: string;
    storage: string;
    image_url: string;
    slug: string;
    price: number;
 };
 
 type CartItemSchema = Omit<CartItem, "id" | "product_data" | "updatedAt" | "createdAt">;
 