import { baseUrl } from "./BaseUrl";

// Authentication Routes
export const USER_SIGNUP = `${baseUrl}/auth/user/signup`;
export const USER_LOGIN = `${baseUrl}/auth/user/login`;
export const VERIFY_EMAIL = `${baseUrl}/auth/user/verify-email`;
export const RESEND_EMAIL_OTP = `${baseUrl}/auth/user/resend-email-otp`;
export const FORGOT_PASSWORD = `${baseUrl}/auth/user/forgot-password`;
export const VERIFY_PASSWORD_RESET = `${baseUrl}/auth/user/verify-password-reset`;
export const RESEND_PASSWORD_RESET_OTP = `${baseUrl}/auth/user/resend-password-reset-otp`;
export const RESET_PASSWORD = `${baseUrl}/auth/user/reset-password`;
export const USER_PROFILE = `${baseUrl}/auth/user/profile`;
export const REFRESH_TOKEN = `${baseUrl}/auth/user/refresh-token`;
export const LOGOUT = `${baseUrl}/auth/user/logout`;
export const UPDATE_PROFILE = `${baseUrl}/auth/user/profile`;

// ======================
// User Management Routes (SuperAdmin)
// ======================

// Get all users (pagination & filters)
export const GET_ALL_USERS = `${baseUrl}/users`;
// Suspend a user
export const SUSPEND_USER = (userId) => `${baseUrl}/users/${userId}/suspend`;
// Activate a suspended user
export const ACTIVATE_USER = (userId) => `${baseUrl}/users/${userId}/activate`;
// Get user details with order statistics
export const GET_USER_DETAILS = (userId) => `${baseUrl}/users/${userId}/details`;
// Delete user permanently
export const DELETE_USER = (userId) => `${baseUrl}/users/${userId}`;

// Core Values Routes
export const GET_CORE_VALUES = `${baseUrl}/core-values`;
export const CREATE_CORE_VALUE = `${baseUrl}/core-values`;
export const GET_CORE_VALUE_BY_ID = (id) => `${baseUrl}/core-values/${id}`;
export const UPDATE_CORE_VALUE = (id) => `${baseUrl}/core-values/${id}`;
export const DELETE_CORE_VALUE = (id) => `${baseUrl}/core-values/${id}`;

// Hero Routes
export const GET_HERO_SECTIONS = `${baseUrl}/hero`;
export const CREATE_HERO_SECTION = `${baseUrl}/hero`;
export const GET_HERO_SECTION_BY_ID = (id) => `${baseUrl}/hero/${id}`;
export const UPDATE_HERO_SECTION = (id) => `${baseUrl}/hero/${id}`;
export const DELETE_HERO_SECTION = (id) => `${baseUrl}/hero/${id}`;


// AboutContact Routes
export const GET_ABOUT_CONTACTS = `${baseUrl}/about-contact`;
export const CREATE_ABOUT_CONTACT = `${baseUrl}/about-contact`;
export const GET_ABOUT_CONTACT_BY_ID = (id) => `${baseUrl}/about-contact/${id}`;
export const UPDATE_ABOUT_CONTACT = (id) => `${baseUrl}/about-contact/${id}`;
export const DELETE_ABOUT_CONTACT = (id) => `${baseUrl}/about-contact/${id}`;

// Client Brand Routes
export const GET_CLIENT_BRANDS = `${baseUrl}/client-brands`;
export const CREATE_CLIENT_BRAND = `${baseUrl}/client-brands`;
export const GET_CLIENT_BRAND_BY_ID = (id) => `${baseUrl}/client-brands/${id}`;
export const UPDATE_CLIENT_BRAND = (id) => `${baseUrl}/client-brands/${id}`;
export const DELETE_CLIENT_BRAND = (id) => `${baseUrl}/client-brands/${id}`;

// Contact Hero Routes
export const GET_CONTACT_HEROES = `${baseUrl}/contact-hero`;
export const CREATE_CONTACT_HERO = `${baseUrl}/contact-hero`;
export const GET_CONTACT_HERO_BY_ID = (id) => `${baseUrl}/contact-hero/${id}`;
export const UPDATE_CONTACT_HERO = (id) => `${baseUrl}/contact-hero/${id}`;
export const DELETE_CONTACT_HERO = (id) => `${baseUrl}/contact-hero/${id}`;

// Contact Us Routes
export const GET_CONTACT_US_SUBMISSIONS = `${baseUrl}/contact-us`;
export const CREATE_CONTACT_US = `${baseUrl}/contact-us`;
export const GET_CONTACT_US_BY_ID = (id) => `${baseUrl}/contact-us/${id}`;
export const UPDATE_CONTACT_US = (id) => `${baseUrl}/contact-us/${id}`;
export const DELETE_CONTACT_US = (id) => `${baseUrl}/contact-us/${id}`;


// Future Goals Routes
export const GET_FUTURE_GOALS = `${baseUrl}/future-goals`;
export const CREATE_FUTURE_GOAL = `${baseUrl}/future-goals`;
export const GET_FUTURE_GOAL_BY_ID = (id) => `${baseUrl}/future-goals/${id}`;
export const UPDATE_FUTURE_GOAL = (id) => `${baseUrl}/future-goals/${id}`;
export const DELETE_FUTURE_GOAL = (id) => `${baseUrl}/future-goals/${id}`;

// Got Questions Routes
export const GET_GOT_QUESTIONS = `${baseUrl}/got-questions`;
export const CREATE_GOT_QUESTION = `${baseUrl}/got-questions`;
export const GET_GOT_QUESTION_BY_ID = (id) => `${baseUrl}/got-questions/${id}`;
export const UPDATE_GOT_QUESTION = (id) => `${baseUrl}/got-questions/${id}`;
export const DELETE_GOT_QUESTION = (id) => `${baseUrl}/got-questions/${id}`;

//services Routes       
export const GET_SERVICES = `${baseUrl}/service`;
export const CREATE_SERVICE = `${baseUrl}/service`;
export const GET_SERVICE_BY_ID = (id) => `${baseUrl}/service/${id}`;
export const UPDATE_SERVICE = (id) => `${baseUrl}/service/${id}`;
export const DELETE_SERVICE = (id) => `${baseUrl}/service/${id}`;


// Innovation Roadmap Routes
export const GET_INNOVATION_ROADMAP = `${baseUrl}/innovation-roadmap`;
export const CREATE_INNOVATION_ROADMAP = `${baseUrl}/innovation-roadmap`;
export const GET_INNOVATION_ROADMAP_BY_ID = (id) => `${baseUrl}/innovation-roadmap/${id}`;
export const UPDATE_INNOVATION_ROADMAP = (id) => `${baseUrl}/innovation-roadmap/${id}`;
export const DELETE_INNOVATION_ROADMAP = (id) => `${baseUrl}/innovation-roadmap/${id}`;

// Newsletter Routes
export const GET_NEWSLETTER_SUBSCRIBERS = `${baseUrl}/newsletter`;
export const CREATE_NEWSLETTER_SUBSCRIPTION = `${baseUrl}/newsletter`;
export const DELETE_NEWSLETTER_SUBSCRIBER = (id) => `${baseUrl}/newsletter/${id}`;


// Our Journey Routes
export const GET_OUR_JOURNEY = `${baseUrl}/our-journey`;
export const CREATE_OUR_JOURNEY = `${baseUrl}/our-journey`;
export const GET_OUR_JOURNEY_BY_ID = (id) => `${baseUrl}/our-journey/${id}`;
export const UPDATE_OUR_JOURNEY = (id) => `${baseUrl}/our-journey/${id}`;
export const DELETE_OUR_JOURNEY = (id) => `${baseUrl}/our-journey/${id}`;

// Projects Routes
export const GET_PROJECTS = `${baseUrl}/projects`;
export const CREATE_PROJECT = `${baseUrl}/projects`;
export const GET_PROJECT_BY_ID = (id) => `${baseUrl}/projects/${id}`;
export const UPDATE_PROJECT = (id) => `${baseUrl}/projects/${id}`;
export const DELETE_PROJECT = (id) => `${baseUrl}/projects/${id}`;

// Reviews Routes
export const GET_REVIEWS_BY_PRODUCT = (productId) => `${baseUrl}/reviews/product/${productId}`;
export const GET_MY_REVIEWS = `${baseUrl}/reviews/my-reviews`;
export const CREATE_REVIEW = `${baseUrl}/reviews`;
export const UPDATE_REVIEW = (id) => `${baseUrl}/reviews/${id}`;
export const DELETE_REVIEW = (id) => `${baseUrl}/reviews/${id}`;
export const MARK_REVIEW_HELPFUL = (id) => `${baseUrl}/reviews/${id}/helpful`;
export const REPORT_REVIEW = (id) => `${baseUrl}/reviews/${id}/report`;
export const UPDATE_REVIEW_STATUS = (id) => `${baseUrl}/reviews/${id}/status`;

// Sustainability Commitment Routes
export const GET_SUSTAINABILITY_COMMITMENTS = `${baseUrl}/sustainability-commitment`;
export const CREATE_SUSTAINABILITY_COMMITMENT = `${baseUrl}/sustainability-commitment`;
export const GET_SUSTAINABILITY_COMMITMENT_BY_ID = (id) => `${baseUrl}/sustainability-commitment/${id}`;
export const UPDATE_SUSTAINABILITY_COMMITMENT = (id) => `${baseUrl}/sustainability-commitment/${id}`;
export const DELETE_SUSTAINABILITY_COMMITMENT = (id) => `${baseUrl}/sustainability-commitment/${id}`;

// Testimonials Routes
export const GET_TESTIMONIALS = `${baseUrl}/testimonials`;
export const CREATE_TESTIMONIAL = `${baseUrl}/testimonials`;
export const GET_TESTIMONIAL_BY_ID = (id) => `${baseUrl}/testimonials/${id}`;
export const UPDATE_TESTIMONIAL = (id) => `${baseUrl}/testimonials/${id}`;
export const DELETE_TESTIMONIAL = (id) => `${baseUrl}/testimonials/${id}`;

// Video Testimonials Routes
export const GET_VIDEO_TESTIMONIALS = `${baseUrl}/video-testimonials`;
export const CREATE_VIDEO_TESTIMONIAL = `${baseUrl}/video-testimonials`;
export const GET_VIDEO_TESTIMONIAL_BY_ID = (id) => `${baseUrl}/video-testimonials/${id}`;
export const UPDATE_VIDEO_TESTIMONIAL = (id) => `${baseUrl}/video-testimonials/${id}`;
export const DELETE_VIDEO_TESTIMONIAL = (id) => `${baseUrl}/video-testimonials/${id}`;

// Why Choose Us Routes
export const GET_WHY_CHOOSE_US = `${baseUrl}/why-choose-us`;
export const CREATE_WHY_CHOOSE_US = `${baseUrl}/why-choose-us`;
export const GET_WHY_CHOOSE_US_BY_ID = (id) => `${baseUrl}/why-choose-us/${id}`;
export const UPDATE_WHY_CHOOSE_US = (id) => `${baseUrl}/why-choose-us/${id}`;
export const DELETE_WHY_CHOOSE_US = (id) => `${baseUrl}/why-choose-us/${id}`;

// Service Reviews Routes
export const GET_SERVICE_REVIEWS = `${baseUrl}/service-reviews`;
export const CREATE_SERVICE_REVIEW = `${baseUrl}/service-reviews`;
export const GET_SERVICE_REVIEW_BY_ID = (id) => `${baseUrl}/service-reviews/${id}`;
export const UPDATE_SERVICE_REVIEW = (id) => `${baseUrl}/service-reviews/${id}`;
export const DELETE_SERVICE_REVIEW = (id) => `${baseUrl}/service-reviews/${id}`;

// Client Stats Routes
export const GET_CLIENT_STATS = `${baseUrl}/client-stats`;
export const CREATE_CLIENT_STAT = `${baseUrl}/client-stats`;
export const GET_CLIENT_STAT_BY_ID = (id) => `${baseUrl}/client-stats/${id}`;
export const UPDATE_CLIENT_STAT = (id) => `${baseUrl}/client-stats/${id}`;
export const DELETE_CLIENT_STAT = (id) => `${baseUrl}/client-stats/${id}`;


//developer
export const GET_DEVELOPERS = `${baseUrl}/developers`;
export const CREATE_DEVELOPER = `${baseUrl}/developers`;
export const GET_DEVELOPER_BY_ID = (id) => `${baseUrl}/developers/${id}`;
export const DELETE_DEVELOPER = (id) => `${baseUrl}/developers/${id}`;

//investor
export const GET_INVESTORS = `${baseUrl}/investors`;
export const CREATE_INVESTOR = `${baseUrl}/investors`;
export const GET_INVESTOR_BY_ID = (id) => `${baseUrl}/investors/${id}`;
export const DELETE_INVESTOR = (id) => `${baseUrl}/investors/${id}`;

//join the team
export const GET_JOIN_TEAM = `${baseUrl}/join-team`;
export const CREATE_JOIN_TEAM = `${baseUrl}/join-team`;
export const GET_JOIN_TEAM_BY_ID = (id) => `${baseUrl}/join-team/${id}`;
export const DELETE_JOIN_TEAM = (id) => `${baseUrl}/join-team/${id}`;

//partners
export const GET_PARTNERS = `${baseUrl}/partners`;
export const CREATE_PARTNER = `${baseUrl}/partners`;
export const GET_PARTNER_BY_ID = (id) => `${baseUrl}/partners/${id}`;
export const UPDATE_PARTNER = (id) => `${baseUrl}/partners/${id}`;
export const DELETE_PARTNER = (id) => `${baseUrl}/partners/${id}`;


// Product Categories
export const GET_PRODUCT_CATEGORIES = `${baseUrl}/product-categories`;
export const CREATE_PRODUCT_CATEGORY = `${baseUrl}/product-categories`;
export const GET_PRODUCT_CATEGORY_BY_ID = (id) => `${baseUrl}/product-categories/${id}`;
export const UPDATE_PRODUCT_CATEGORY = (id) => `${baseUrl}/product-categories/${id}`;
export const DELETE_PRODUCT_CATEGORY = (id) => `${baseUrl}/product-categories/${id}`;


// Product SubCategories
export const GET_PRODUCT_SUBCATEGORIES = `${baseUrl}/product-subcategories`;
export const CREATE_PRODUCT_SUBCATEGORY = `${baseUrl}/product-subcategories`;
export const GET_PRODUCT_SUBCATEGORY_BY_ID = (id) => `${baseUrl}/product-subcategories/${id}`;
export const UPDATE_PRODUCT_SUBCATEGORY = (id) => `${baseUrl}/product-subcategories/${id}`;
export const DELETE_PRODUCT_SUBCATEGORY = (id) => `${baseUrl}/product-subcategories/${id}`;


// General Settings Routes
export const GET_GENERAL_SETTINGS = `${baseUrl}/general-settings`;
export const CREATE_GENERAL_SETTINGS = `${baseUrl}/general-settings`;
export const UPDATE_GENERAL_SETTINGS = `${baseUrl}/general-settings`;


// Products
export const GET_PRODUCTS = `${baseUrl}/products`;
export const CREATE_PRODUCT = `${baseUrl}/products`;
export const GET_FEATURED_PRODUCTS = `${baseUrl}/products/featured`;
export const GET_PRODUCTS_BY_CATEGORY = (categoryId) => `${baseUrl}/products/category/${categoryId}`;
export const GET_PRODUCTS_BY_SUBCATEGORY = (subCategoryId) => `${baseUrl}/products/subcategory/${subCategoryId}`;
export const GET_PRODUCT_BY_SLUG = (slug) => `${baseUrl}/products/slug/${slug}`;
export const GET_PRODUCT_BY_ID = (id) => `${baseUrl}/products/${id}`;
export const UPDATE_PRODUCT = (id) => `${baseUrl}/products/${id}`;
export const DELETE_PRODUCT = (id) => `${baseUrl}/products/${id}`;
export const UPDATE_PRODUCT_STOCK = (id) => `${baseUrl}/products/${id}/stock`;
export const UPDATE_PRODUCST_STATUS = (id) => `${baseUrl}/products/${id}/status`



// =======================
// Shop Best Seller Routes
// =======================
export const GET_SHOP_BEST_SELLERS = `${baseUrl}/shop-best-sellers`;
export const CREATE_SHOP_BEST_SELLER = `${baseUrl}/shop-best-sellers`;
export const GET_SHOP_BEST_SELLER_BY_ID = (id) =>
    `${baseUrl}/shop-best-sellers/${id}`;
export const UPDATE_SHOP_BEST_SELLER = (id) =>
    `${baseUrl}/shop-best-sellers/${id}`;
export const DELETE_SHOP_BEST_SELLER = (id) =>
    `${baseUrl}/shop-best-sellers/${id}`;


// =================
// Shop Card Routes
// =================
export const GET_SHOP_CARDS = `${baseUrl}/shop-cards`;
export const CREATE_SHOP_CARD = `${baseUrl}/shop-cards`;
export const GET_SHOP_CARD_BY_ID = (id) =>
    `${baseUrl}/shop-cards/${id}`;
export const UPDATE_SHOP_CARD = (id) =>
    `${baseUrl}/shop-cards/${id}`;
export const DELETE_SHOP_CARD = (id) =>
    `${baseUrl}/shop-cards/${id}`;


// =================
// Shop Hero Routes
// =================
export const GET_SHOP_HEROES = `${baseUrl}/shop-hero`;
export const CREATE_SHOP_HERO = `${baseUrl}/shop-hero`;
export const GET_SHOP_HERO_BY_ID = (id) =>
    `${baseUrl}/shop-hero/${id}`;
export const UPDATE_SHOP_HERO = (id) =>
    `${baseUrl}/shop-hero/${id}`;
export const DELETE_SHOP_HERO = (id) =>
    `${baseUrl}/shop-hero/${id}`;


// =========================
// Shop New Arrival Routes
// =========================
export const GET_SHOP_NEW_ARRIVALS = `${baseUrl}/shop-new-arrivals`;
export const CREATE_SHOP_NEW_ARRIVAL = `${baseUrl}/shop-new-arrivals`;
export const GET_SHOP_NEW_ARRIVAL_BY_ID = (id) =>
    `${baseUrl}/shop-new-arrivals/${id}`;
export const UPDATE_SHOP_NEW_ARRIVAL = (id) =>
    `${baseUrl}/shop-new-arrivals/${id}`;
export const DELETE_SHOP_NEW_ARRIVAL = (id) =>
    `${baseUrl}/shop-new-arrivals/${id}`;


// =========================
// Shop Special Deal Routes
// =========================
export const GET_SHOP_SPECIAL_DEALS = `${baseUrl}/shop-special-deals`;
export const CREATE_SHOP_SPECIAL_DEAL = `${baseUrl}/shop-special-deals`;
export const GET_SHOP_SPECIAL_DEAL_BY_ID = (id) =>
    `${baseUrl}/shop-special-deals/${id}`;
export const UPDATE_SHOP_SPECIAL_DEAL = (id) =>
    `${baseUrl}/shop-special-deals/${id}`;
export const DELETE_SHOP_SPECIAL_DEAL = (id) =>
    `${baseUrl}/shop-special-deals/${id}`;


// ======================
// Shop Trending Routes
// ======================
export const GET_SHOP_TRENDING = `${baseUrl}/shop-trending`;
export const CREATE_SHOP_TRENDING = `${baseUrl}/shop-trending`;
export const GET_SHOP_TRENDING_BY_ID = (id) =>
    `${baseUrl}/shop-trending/${id}`;
export const UPDATE_SHOP_TRENDING = (id) =>
    `${baseUrl}/shop-trending/${id}`;
export const DELETE_SHOP_TRENDING = (id) =>
    `${baseUrl}/shop-trending/${id}`;

// ======================
// Wishlist Routes
// ======================


export const GET_WISHLIST = `${baseUrl}/wishlist`;
export const ADD_TO_WISHLIST = `${baseUrl}/wishlist`;
export const REMOVE_FROM_WISHLIST = (productId) => `${baseUrl}/wishlist/${productId}`;
export const CLEAR_WISHLIST = `${baseUrl}/wishlist/clear`;


// ======================
// FAQ Shop Routes
// ======================
export const GET_FAQ_SHOP = `${baseUrl}/faq-shop`;
export const CREATE_FAQ_SHOP = `${baseUrl}/faq-shop`;
export const GET_FAQ_SHOP_BY_ID = (id) => `${baseUrl}/faq-shop/${id}`;
export const UPDATE_FAQ_SHOP = (id) => `${baseUrl}/faq-shop/${id}`;
export const DELETE_FAQ_SHOP = (id) => `${baseUrl}/faq-shop/${id}`;

// Stats Routes
export const GET_DASHBOARD_STATS = `${baseUrl}/stats/dashboard`;
export const GET_SALES_STATS = `${baseUrl}/stats/sales`;
export const GET_USER_STATS = `${baseUrl}/stats/users`;
export const GET_PRODUCT_STATS = `${baseUrl}/stats/products`;
