<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\Brand;
use App\Models\Category;
use App\Models\CategoryPost;
use App\Models\Comment;
use App\Models\Order;
use App\Models\Post;
use App\Models\Product;
use App\Models\QA;
use App\Models\Statistic;
use App\Models\SubCategory;
use App\Models\User;
use App\Models\Visitors;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class IndexController extends Controller
{
    //
    public function __construct()
    {
        $list_categories = Category::where('status', '=', '1')
            ->where('showHome', 'Yes')->orderBy('sort_order')->get();
        // $list_sub_categories = SubCategory::where('status', '=', '1')
        //     ->where('showHome', 'Yes')->get();
        $list_brands = Brand::where('status', '=', '1')->get();

        \View::share([
            'list_categories' => $list_categories,
            // 'list_sub_categories' => $list_sub_categories,
            'list_brands' => $list_brands,
        ]);
    }

    public function all_brands()
    {
        $brands = Brand::where('status', 1)
            ->withCount('products')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'brands' => $brands,
        ], 200);
    }
    public function all_categories()
    {
        $categories = Category::where('status', 1)
            ->orderBy('created_at', 'desc')->get();

        $listCategory = [];
        Category::recursive($categories, 0, 1, $listCategory);

        return response()->json([
            'categories' => $listCategory,
        ], 200);
    }


    public function all_products()
    {
        $products = Product::where('status', 1)
            ->orderBy('created_at', 'desc')->get();


        return response()->json([
            'products' => $products,

        ], 200);
    }

    public function all_posts()
    {
        $posts = Post::where('status', 1)
            ->orderBy('created_at', 'desc')->get();

        return response()->json([
            'posts' => $posts,

        ], 200);
    }

    public function post_detail($id, Request $request)
    {
        $post = Post::find($id);
        if ($post === null) {
            return response()->json('Post not found', 404);
        }
        $post->increment('view');
        $category_posts_id = $post->category_posts_id;
        $related_posts = Post::where('category_posts_id', $category_posts_id)
            ->orderBy('created_at', 'desc')
            ->limit(4)->get()->except($id);

        return response()->json([
            'post' => $post,
            'related_posts' => $related_posts,
        ], 200);
    }

    public function all_category_posts()
    {
        $categoryPosts = CategoryPost::where('status', 1)
            ->orderBy('created_at', 'desc')->get();


        return response()->json([
            'categoryPosts' => $categoryPosts,

        ], 200);
    }
    public function new_products()
    {
        $list_new_products = Product::where('status', 1)
            ->orderBy('created_at', 'desc')->limit(8)->get();


        return response()->json([
            'new_products' => $list_new_products,

        ], 200);
    }
    public function favorite_products()
    {

        $list_favorite_products = Product::where('status', 1)
            ->orderBy('favorite', 'DESC')
            ->orderBy('created_at', 'desc')->limit(8)->get();

        return response()->json([

            'favorite_products' => $list_favorite_products,
        ], 200);
    }

    public function product_detail($slug, $id, Request $request)
    {

        $product = Product::find($id);
        if ($product === null) {
            return response()->json('Product not found', 404);
        }
        $product->increment('view');
        $category_id = $product->category_id;
        $related_products = Product::where('category_id', $category_id)
            ->orderBy('created_at', 'desc')
            ->limit(4)->get()->except($id);
        // $list_qa = QA::where('product_id', $id)->orderBy('created_at', 'asc')->get();

        return response()->json([
            // 'list_qa' => $list_qa,
            'product' => $product,
            'related_products' => $related_products,
        ], 200);
    }




    // public function related_products($id, Request $request)
    // {

    //     $category_id = Category::find($id);
    //     $related_products = Product::where('category_id', $category_id)
    //         ->orderBy('created_at', 'desc')
    //         ->limit(4)->get()->except($id);

    //     return response()->json([

    //         'related_products' => $related_products,
    //     ], 200);
    // }


    // public function search(Request $request)
    // {



    //     // Keywords for search
    //     $keywords = $request->input('keywords_submit', '');



    //     // Search products by name
    //     $searchResults = Product::where('name', 'like', '%' . $keywords . '%')
    //         ->get();

    //     // Return JSON response
    //     return response()->json([

    //         'searchResults' => $searchResults
    //     ]);
    // }

    public function searchSuggestions(Request $request)
    {
        // Nhận từ khóa tìm kiếm từ request
        $searchTerm = $request->query('keywords_suggest');

        // Tìm kiếm sản phẩm dựa trên tên hoặc mô tả
        $suggestions = Product::where('name', 'LIKE', '%' . $searchTerm . '%')
            ->orWhere('description', 'LIKE', '%' . $searchTerm . '%')
            ->take(10) // Lấy tối đa 10 kết quả
            ->get(['id', 'name', 'slug', 'image', 'price']); // Lấy các trường cần thiết cho gợi ý

        // Trả về kết quả dưới dạng JSON
        return response()->json($suggestions);
    }




    // public function filter(Request $request)
    // {
    //     $request->validate([
    //         'category_id' => 'nullable|integer',
    //         'brand_id' => 'nullable|integer',
    //         'subcategory_id' => 'nullable|integer',
    //         'min_price' => 'nullable|numeric',
    //         'max_price' => 'nullable|numeric',
    //     ]);

    //     try {
    //         $query = Product::query();

    //         if ($request->has('category_id') && !empty($request->category_id)) {
    //             $query->where('category_id', $request->category_id);
    //         }

    //         if ($request->has('brand_id') && !empty($request->brand_id)) {
    //             $query->where('brand_id', $request->brand_id);
    //         }

    //         if ($request->has('subcategory_id') && !empty($request->subcategory_id)) {
    //             $query->where('subcategory_id', $request->subcategory_id);
    //         }
    //         if ($request->has('min_price') && $request->has('max_price')) {
    //             if (!empty($request->min_price) && !empty($request->max_price)) {
    //                 $min = (float)$request->min_price;
    //                 $max = (float)$request->max_price;

    //                 // Check if min price is less than max price
    //                 if ($min <= $max) {
    //                     $query->whereBetween('price', [$min, $max]);
    //                 } else {
    //                     return response()->json(['error' => 'Min price must be less than max price'], 400);
    //                 }
    //             }
    //         }
    //         $products = $query->get();

    //         return response()->json($products);

    //     } catch (\Exception $e) {
    //         Log::error('Error filtering products: ' . $e->getMessage());
    //         Log::info('Filtering products with params:', $request->all());

    //         return response()->json(['error' => 'Internal Server Error'], 500);
    //     }
    // }



    public function filter(Request $request)
    {

        $query = Product::query();

        // Filtering by brand
        if ($request->has('brand_id') && !empty($request->brand_id)) {
            $query->where('brand_id', $request->brand_id);
        }

        // Filtering by category
        if ($request->has('category_id') && !empty($request->category_id)) {
            $query->where('category_id', $request->category_id);
        }



        // Sorting products
        if ($request->has('sort_by')) {
            $sort_by = $request->query('sort_by');
            switch ($sort_by) {
                case 'DESC':
                    $query->orderBy('price', 'DESC');
                    break;
                case 'ASC':
                    $query->orderBy('price', 'ASC');
                    break;
                case 'Sort_A_Z':
                    $query->orderBy('name', 'ASC');
                    break;
                case 'Sort_Z_A':
                    $query->orderBy('name', 'DESC');
                    break;
                case 'newest':
                    $query->orderBy('id', 'DESC');
                    break;
                default:
                    $query->orderBy('id', 'DESC');
                    break;
            }
        } else {
            // Default sorting if sort_by is not provided
            $query->orderBy('id', 'DESC');
        }



        if ($request->has('price')) {
            $price = $request->query('price');
            switch ($price) {
                case '1':
                    $query->where('price', '<', 20000);
                    break;
                case '2':
                    $query->whereBetween('price', [20000, 50000]);
                    break;
                case '3':
                    $query->whereBetween('price', [50000, 100000]);
                    break;
                case '4':
                    $query->whereBetween('price', [100000, 200000]);
                    break;
                case '5':
                    $query->whereBetween('price', [200000, 300000]);
                    break;
                case '6':
                    $query->where('price', '>', 300000);
                    break;
            }
        }

        // // Filtering by price range
        // if ($request->has('start_price') && $request->has('end_price')) {
        //     $min_price = (float) $request->query('start_price');
        //     $max_price = (float) $request->query('end_price');
        //     $query->whereBetween('price', [$min_price, $max_price]);
        // }

        // // Default ordering if no filter is applied
        // if (!$request->has('sort_by') && !$request->has('start_price') && !$request->has('end_price') && !$request->has('brand_id') && !$request->has('subcategory_id')) {
        //     $query->orderBy('id', 'DESC');
        // }

        // Paginate the results
        $products = $query->paginate(8);

        // // Min and Max price for filters
        // $min_price = Product::min('price');
        // $max_price = Product::max('price');
        // $min_price_range = $min_price + 500000;
        // $max_price_range = $max_price + 10000000;

        // Prepare the response data
        $response = [
            'products' => $products,
            'pagination' => [
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
                'total' => $products->total(),
            ],
        ];

        // Return JSON response
        return response()->json($response);
    }


    public function filter_post(Request $request)
    {

        $query = Post::query();



        // Filtering by category
        if ($request->has('category_id') && !empty($request->category_id)) {
            $query->where('category_posts_id', $request->category_id);
        }



        // Sorting products
        if ($request->has('sort_by')) {
            $sort_by = $request->query('sort_by');
            switch ($sort_by) {
                case 'DESC':
                    $query->orderBy('created_at', 'DESC');
                    break;
                case 'ASC':
                    $query->orderBy('created_at', 'ASC');
                    break;
                case 'Sort_A_Z':
                    $query->orderBy('title', 'ASC');
                    break;
                case 'Sort_Z_A':
                    $query->orderBy('title', 'DESC');
                    break;
            }
        }





        // Paginate the results
        $posts = $query->paginate(6);




        $response = [
            'posts' => $posts,

        ];

        // Return JSON response
        return response()->json($response);
    }

    public function filter_by_date(Request $request)
    {
        $data = $request->all();

        if (!isset($data['from_date']) || !isset($data['to_date'])) {
            return response()->json([
                'status' => 'error',
                'message' => 'Missing from_date or to_date',
            ], 400);
        }

        $from_date = $data['from_date'];
        $to_date = $data['to_date'];

        $get = Statistic::whereBetween('order_date', [$from_date, $to_date])
            ->orderBy('order_date', 'ASC')
            ->get();

        $chart_data = $get->map(function ($value) {
            return [
                'period' => $value->order_date,
                'order' => $value->total_order,
                'sales' => $value->sales,
                'profit' => $value->profit,
                'quantity' => $value->quantity,
            ];
        });

        return response()->json($chart_data, 200);
    }


    public function dashboard_filter(Request $request)
    {
        $data = $request->all();
        $dauthangnay = Carbon::now('Asia/Ho_Chi_Minh')->startOfMonth()->toDateString();
        $dau_thangtruoc = Carbon::now('Asia/Ho_Chi_Minh')->subMonth()->startOfMonth()->toDateString();
        $cuoi_thangtruoc = Carbon::now('Asia/Ho_Chi_Minh')->subMonth()->endOfMonth()->toDateString();

        $sub7days = Carbon::now('Asia/Ho_Chi_Minh')->subDays(7)->toDateString();
        $sub365days = Carbon::now('Asia/Ho_Chi_Minh')->subDays(365)->toDateString();
        $now = Carbon::now('Asia/Ho_Chi_Minh')->toDateString();

        // Kiểm tra giá trị của dashboard_value
        if (!isset($data['dashboard_value'])) {
            return response()->json([
                'status' => 'error',
                'message' => 'dashboard_value is required',
            ], 400);
        }

        switch ($data['dashboard_value']) {
            case '7ngay':
                $get = Statistic::whereBetween('order_date', [$sub7days, $now])->orderBy('order_date', 'ASC')->get();
                break;

            case 'thangtruoc':
                $get = Statistic::whereBetween('order_date', [$dau_thangtruoc, $cuoi_thangtruoc])->orderBy('order_date', 'ASC')->get();
                break;

            case 'thangnay':
                $get = Statistic::whereBetween('order_date', [$dauthangnay, $now])->orderBy('order_date', 'ASC')->get();
                break;

            case '365ngayqua':
                $get = Statistic::whereBetween('order_date', [$sub365days, $now])->orderBy('order_date', 'ASC')->get();
                break;

            default:
                return response()->json([
                    'status' => 'error',
                    'message' => 'Invalid dashboard_value',
                ], 400);
        }

        // Đảm bảo $chart_data được khởi tạo, ngay cả khi $get trống
        $chart_data = [];

        foreach ($get as $key => $value) {
            $chart_data[] = [
                'period' => $value->order_date,
                'order' => $value->total_order,
                'sales' => $value->sales,
                'profit' => $value->profit,
                'quantity' => $value->quantity,
            ];
        }

        // Trả về JSON response
        return response()->json($chart_data, 200);
    }

    public function days_order()
    {
        $sub60days = Carbon::now('Asia/Ho_Chi_Minh')->subDays(60)->toDateString();
        $now = Carbon::now('Asia/Ho_Chi_Minh')->toDateString();
        $get = Statistic::whereBetween('order_date', [$sub60days, $now])->orderBy('order_date', 'ASC')->get();

        $chart_data = [];

        foreach ($get as $key => $value) {
            $chart_data[] = [
                'period' => $value->order_date,
                'order' => $value->total_order,
                'sales' => $value->sales,
                'profit' => $value->profit,
                'quantity' => $value->quantity,
            ];
        }

        // Trả về JSON response
        return response()->json($chart_data, 200);
    }

    public function AuthLogin()
    {
        if (!Auth::id()) {
            abort(401, 'Không có quyền truy cập'); // Dừng lại nếu người dùng chưa đăng nhập
        }
    }

    public function show_user_visit(Request $request)
    {
        $this->AuthLogin();

        $user_ip_address = $request->ip();
        $early_last_month = Carbon::now('Asia/Ho_Chi_Minh')->subMonth()->startOfMonth()->toDateString();
        $end_of_last_month = Carbon::now('Asia/Ho_Chi_Minh')->subMonth()->endOfMonth()->toDateString();
        $early_this_month = Carbon::now('Asia/Ho_Chi_Minh')->startOfMonth()->toDateString();
        $oneyears = Carbon::now('Asia/Ho_Chi_Minh')->subDays(365)->toDateString();
        $now = Carbon::now('Asia/Ho_Chi_Minh')->toDateString();

        $visitor_of_last_month = Visitors::whereBetween('date_visit', [$early_last_month, $end_of_last_month])->get();
        $visitor_last_month_count = $visitor_of_last_month->count();

        $visitor_of_thismonth = Visitors::whereBetween('date_visit', [$early_this_month, $now])->get();
        $visitor_this_month_count = $visitor_of_thismonth->count();

        $visitor_of_year = Visitors::whereBetween('date_visit', [$oneyears, $now])->get();
        $visitor_year_count = $visitor_of_year->count();

        // Tổng người truy cập
        $visitors = Visitors::all();
        $visitors_total = $visitors->count();

        // hiện tại đang online
        $visitor_current = Visitors::where('ip_address', $user_ip_address)->get();
        $visitor_count = $visitor_current->count();

        if ($visitor_count < 1) {
            $visitor = new Visitors();
            $visitor->ip_address = $user_ip_address;
            $visitor->date_visit = Carbon::now('Asia/Ho_Chi_Minh')->toDateString();
            $visitor->save();
        }

        $product = Product::all()->count();
        $product_views = Product::orderBy('view', 'DESC')->take(20)->get();

        $post = Post::all()->count();
        $post_views = Post::orderBy('view', 'DESC')->take(20)->get();

        $order = Order::all()->count();

        $user = User::all()->count();

        return response()->json([
            $visitors_total,
            $visitor_count,
            $visitor_last_month_count,
            $visitor_this_month_count,
            $visitor_year_count,
            $product,
            $post,
            $order,
            $user,
            $product_views,
            $post_views
        ], 200);
    }
}
