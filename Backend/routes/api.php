<?php

use App\Http\Controllers\Auth\FacebookController;
use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CouponController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Http\Controllers\CallStringeeController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CategoryPostController;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductTypeController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SubCategoryController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\WarehouseController;
use App\Http\Controllers\WarehouseProductController;
use App\Http\Controllers\ImageSearchController;
use App\Http\Middleware\AdminMiddleware;

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/register', [AuthController::class, 'register'])->name('register');
    Route::post('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:api')->name('logout');
    Route::post('/refresh', [AuthController::class, 'refresh'])->middleware('auth:api')->name('refresh');
    Route::get('/your_profile', [AuthController::class, 'your_profile'])->middleware('auth:api')->name('your_profile');
    Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail']);
    Route::get('password/reset/{token}', [ForgotPasswordController::class, 'showResetForm'])->name('password.reset');

    // Route để xử lý việc cập nhật mật khẩu
    Route::post('password/reset', [ForgotPasswordController::class, 'reset'])->name('password.update');

});

// Roles CRUD routes
Route::group(['prefix' => 'roles'], function ($router) {
    Route::controller(RoleController::class)->group(function () {
        Route::get('/index', 'index');
        Route::get('/show/{id}', 'show');
        Route::post('/store', 'store');
        Route::post('/update/{id}', 'update')->middleware('admin');
        Route::delete('/destroy/{id}', 'destroy');
    });
});

// Users CRUD routes
Route::group(['prefix' => 'users', 'middleware' => [AdminMiddleware::class]], function ($router) {
    Route::controller(UserController::class)->group(function () {
        Route::get('/index', 'index');
        Route::get('/show/{id}', 'show');
        Route::post('/store', 'store');
        Route::post('/update/{id}', 'update');
        Route::delete('/destroy/{id}', 'destroy');
        Route::post('/change_user_lock/{id}', 'change_user_lock');
    });
});

// Warehouse CRUD routes
Route::group(['prefix' => 'warehouses', 'middleware' => [AdminMiddleware::class]], function ($router) {
    Route::controller(WarehouseController::class)->group(function () {
        Route::get('/index', 'index');
        Route::get('/show/{id}', 'show');
        Route::post('/store', 'store');
        Route::put('/update/{id}', 'update');
        Route::delete('/destroy/{id}', 'destroy');
    });
});
// Warehouse Products CRUD routes
Route::group(['prefix' => 'warehouse_products', 'middleware' => [AdminMiddleware::class]], function ($router) {
    Route::controller(WarehouseController::class)->group(function () {
        Route::post('/store/warehouses/{warehouseId}/products', 'addProductToWarehouse');
        Route::delete('/destroy/warehouses/{warehouseId}/products/{productId}', 'removeProductFromWarehouse');
    });
});

// Brands CRUD routes
Route::group(['prefix' => 'brands', 'middleware' => [AdminMiddleware::class]], function ($router) {
    Route::controller(BrandController::class)->group(function () {
        Route::get('/index', 'index');
        Route::get('/show/{id}', 'show');
        Route::post('/store', 'store');
        Route::post('/update/{id}', 'update');
        Route::delete('/destroy/{id}', 'destroy');
        Route::post('/export-csv', 'export-csv');
        Route::post('/import-csv', 'import-csv');
    });
});

// Categories CRUD routes
Route::group(['prefix' => 'categories', 'middleware' => [AdminMiddleware::class]], function ($router) {
    Route::controller(CategoryController::class)->group(function () {
        Route::get('/index', 'index');
        Route::get('/show/{id}', 'show');
        Route::post('/store', 'store');
        Route::post('/update/{id}', 'update');
        Route::delete('/destroy/{id}', 'destroy');
        Route::get('/export-csv', 'export_csv');
        Route::post('/import-csv', 'import_csv');

    });
});

// Sub Categories CRUD routes
// Route::group(['prefix' => 'sub_categories','middleware' => [AdminMiddleware::class]], function ($router) {
//     Route::controller(SubCategoryController::class)->group(function () {
//         Route::get('index', 'index');
//         Route::get('show/{id}', 'show');
//         Route::post('store', 'store');
//         Route::put('update/{id}', 'update');
//         Route::delete('destroy/{id}', 'destroy');
//     });
// });

// Product types CRUD routes
Route::group(['prefix' => 'product_types', 'middleware' => [AdminMiddleware::class]], function ($router) {
    Route::controller(ProductTypeController::class)->group(function () {
        Route::get('/index', 'index');
        Route::get('/show/{id}', 'show');
        Route::post('/store', 'store');
        Route::post('/update/{id}', 'update');
        Route::delete('/destroy/{id}', 'destroy');
    });
});

// Products CRUD routes
Route::group(['prefix' => 'products', 'middleware' => [AdminMiddleware::class]], function ($router) {
    Route::controller(ProductController::class)->group(function () {
        Route::get('/index', 'index');
        Route::get('/show/{id}', 'show');
        Route::post('/store', 'store');
        Route::post('/update/{id}', 'update');
        Route::delete('/destroy/{id}', 'destroy');
    });
});


// Orders CRUD routes
Route::group(['prefix' => 'orders'], function ($router) {
    Route::controller(OrderController::class)->group(function () {
        Route::get('/index', 'manager_order');
        Route::get('/view_order/{order_code}', 'view_order');
        Route::post('/store', 'store');
        Route::post('/update/{id}', 'update');
        Route::get('/get_order_items/{id}', 'get_order_items')->middleware('admin');
        Route::get('/get_user_orders/{id}', 'get_user_orders')->middleware('admin');
        Route::post('/change_order_status/{id}', 'change_order_status');
        Route::post('/update_order_qty', 'update_order_qty');
        Route::get('/print_order/{order_code}', 'print_order');
        Route::post('/cancel-order/{id}', [OrderController::class, 'cancel_order']);

    });
});

// Banners CRUD routes
Route::group(['prefix' => 'banners', 'middleware' => [AdminMiddleware::class]], function ($router) {
    Route::controller(BannerController::class)->group(function () {
        Route::get('/index', 'index');
        Route::get('/show/{id}', 'show');
        Route::post('/store', 'store');
        Route::post('/update/{id}', 'update');
        Route::delete('/destroy/{id}', 'destroy');
    });
});

// Categories Post CRUD routes
Route::group(['prefix' => 'category_posts', 'middleware' => [AdminMiddleware::class]], function ($router) {
    Route::controller(CategoryPostController::class)->group(function () {
        Route::get('/index', 'index');
        Route::get('/show/{id}', 'show');
        Route::post('/store', 'store');
        Route::post('/update/{id}', 'update');
        Route::delete('/destroy/{id}', 'destroy');
    });
});

// Post CRUD routes
Route::group(['prefix' => 'posts'], function ($router) {
    Route::controller(PostController::class)->group(function () {
        Route::get('/index', 'index');
        Route::get('/show/{id}', 'show');
        Route::post('/store', 'store');
        Route::post('/update/{id}', 'update');
        Route::delete('/destroy/{id}', 'destroy');
    });
});

Route::group(['prefix' => 'coupons', 'middleware' => [AdminMiddleware::class]], function ($router) {
    Route::controller(CouponController::class)->group(function () {
        Route::get('/index', 'index');
        Route::get('/show/{id}', 'show');
        Route::post('/store', 'store');
        Route::post('/update/{id}', 'update');
        Route::delete('/destroy/{id}', 'destroy');
        Route::post('/update-status/{id}', 'update_status');
    });
});

// Contact routers
Route::group(['prefix' => 'contacts', 'middleware' => [AdminMiddleware::class]], function ($router) {
    Route::controller(ContactController::class)->group(function () {
        Route::get('/index', 'index');
        Route::get('/show/{id}', 'show');
        Route::delete('/destroy/{id}', 'destroy');
    });
});

// Comments routers
Route::group(['prefix' => 'comments', 'middleware' => [AdminMiddleware::class]], function ($router) {
    Route::controller(CommentController::class)->group(function () {
        Route::get('/index', 'index');
        Route::post('/allow', 'allow_comment');
        Route::post('/reply', 'reply_comment');
        Route::delete('/destroy/{id}', 'destroy');
        Route::delete('/destroy/{id}', 'destroy');
    });
});



// Site Users routes
Route::get('/all_products', [IndexController::class, 'all_products']);
Route::get('/all_brands', [IndexController::class, 'all_brands']);
Route::get('/all_categories', [IndexController::class, 'all_categories']);
Route::get('/all_category_posts', [IndexController::class, 'all_category_posts']);
Route::get('/all_posts', [IndexController::class, 'all_posts']);
Route::get('/new_products', [IndexController::class, 'new_products']);
Route::get('/favorite_products', [IndexController::class, 'favorite_products']);
Route::get('/product_detail/{slug}/{id}', [IndexController::class, 'product_detail']);
Route::get('/banners/size/{size}', [BannerController::class, 'getBannersBySize']); // ví dụ: GET /api/banners/size/1 để lấy các banner có kích thước 800x600;
// GET /api/banners/size/2 để lấy các banner có kích thước 650x250.
// Route::get('/search', [IndexController::class, 'search']);
Route::get('/search-suggestions', [IndexController::class, 'searchSuggestions']);
Route::post('/image-search', [ImageSearchController::class, 'searchByImage']);
Route::post('/send-contacts', [ContactController::class, 'store']);  // Gửi liên hệ
Route::get('/load_comments', [CommentController::class, 'load_comments']);  // DS bình luận
Route::post('/send_comment', [CommentController::class, 'send_comment']);  // Gửi bình luận

Route::get('/filter', [IndexController::class, 'filter']);
Route::get('/filter_post', [IndexController::class, 'filter_post']);
// ADMIN filter
Route::post('/filter-by-date', [IndexController::class, 'filter_by_date']);
Route::post('/dashboard-filter', [IndexController::class, 'dashboard_filter']);
Route::post('/days-order', [IndexController::class, 'days_order']);
Route::get('/show-user-visit', [IndexController::class, 'show_user_visit']);

Route::get('/generate-token', [CallStringeeController::class, 'generateToken']);

// Login Google Account

Route::get('/login-google', [GoogleController::class, 'login_google']);
Route::get('/login/google/callback', [GoogleController::class, 'callback_google']);

Route::get('/login-customer-google', [GoogleController::class, 'login_customer_google']);
Route::get('/login/customer/google/callback', [GoogleController::class, 'callback_customer_google']);

// Login Facebook Account

Route::get('/login-facebook', [FacebookController::class, 'login_facebook']);
Route::get('/login/facebook/callback', [FacebookController::class, 'callback_facebook']);

Route::get('/login-customer-facebook', [FacebookController::class, 'login_customer_facebook']);
Route::get('/login/customer/facebook/callback', [FacebookController::class, 'callback_customer_facebook']);

Route::post('/check-coupon', [CouponController::class, 'check_coupon']);
Route::post('/coupons/send-user-vip-coupon', [CouponController::class, 'send_mail_user_vip_coupon']);
Route::post('/coupons/send-user-coupon', [CouponController::class, 'send_mail_user_coupon']);

// Wishlist

Route::post('/products/{id}/increment-favorite', [ProductController::class, 'incrementFavorite']);
Route::post('/products/{id}/decrement-favorite', [ProductController::class, 'decrementFavorite']);



// Route::post('/cart/add', [CartController::class, 'addToCart']);
// Route::get('/cart', [CartController::class, 'viewCart']);
// Route::delete('/cart/remove/{id}', [CartController::class, 'removeFromCart']);
// Route::delete('/cart/clear', [CartController::class, 'clearCart']);


Route::post('/confirm_order', [OrderController::class, 'confirm_order']);
Route::post('/pay/order', [PaymentController::class, 'payByStripe']);
Route::post('/pay', [PaymentController::class, 'pay']);

// Order user

Route::get('/get_user_orders/{id}', [OrderController::class, 'get_order_items_user']);

// Change user info
Route::put('/change_user_info/{id}', [UserController::class, 'change_user_info']);

// Change user password
Route::put('/change_user_password/{id}', [UserController::class, 'change_user_password']);

// Forgot password
Route::post('/forgot-password', [ForgotPasswordController::class, 'forgot_password']);
Route::post('/reset-password', [ForgotPasswordController::class, 'resetPassword']);

