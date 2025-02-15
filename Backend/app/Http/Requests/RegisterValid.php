<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterValid extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
            'name' => ['required', 'min:2', 'max:30'],
            'email' => 'required|email|ends_with:@gmail.com|unique:users',
            'password' => 'required|min:8|same:password2',
            'password2' => 'required|min:8',

        ];
    }
    public function messages() {
        return [
         'name.required' => 'Phải nhập đủ họ tên',
         'name.min' => 'Nhập họ tên ít nhất 2 ký tự',
         'name.max' => 'Nhập họ tên nhiều nhất 30 kí tự',
         'email.required' => 'Bạn chưa nhập email',
         'email.email' => 'Nhập email chưa đúng',
         'email.ends_with' => 'Email phải có đuôi là gmail.com',
         'password.required' => 'Bạn chưa nhập mật khẩu',
         'password.min' => 'Mật khẩu từ 8 ký tự trở lên',
         'password.same' => 'Hai mật khẩu không giống nhau',
         'password2.required' => 'Bạn chưa nhập lại mật khẩu',
         'password2.min' => 'Mật khẩu nhập lại cùng từ 8 ký tự trở lên'
       ];
     }

}
