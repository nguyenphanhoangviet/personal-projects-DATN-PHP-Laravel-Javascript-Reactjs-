<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Exception;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    //
    public function index()
    {
        $roles = Role::paginate(10);
        return response()->json($roles, 200);
    }

    public function show($id)
    {
        $role = Role::find($id);
        if ($role) {
            return response()->json($role, 200);
        } else
            return response()->json('role not found');
    }
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|unique:roles,name',
                'status' => 'nullable',

            ]);

            $role = new Role();

            $role->name = $request->name;
            $role->status = $request->status;


            $role->save();
            return response()->json('role added', 201);

        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }
    public function update($id, Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|unique:roles,name,'.$id,
                'status' => 'nullable',
            ]);

            $role = Role::find($id);
            if (!$role) {
                return response()->json('Role not found', 404);
            }

            $role->name = $request->name;
            $role->status = $request->status;


            $role->update();
            return response()->json('role updated', 200);
        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }

    public function destroy($id)
    {
        $role = Role::find($id);
        if ($role) {
            $role->delete();
            return response()->json('role deleted');
        } else
            return response()->json('role not found');
    }
}
