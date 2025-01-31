<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function create()
    {
        // Creating a new user
        User::create(['name' => 'James', 'email' => 'james@example.com']);

        // Retrieving all users
        $users = User::all();
        
        return response()->json($users);
    }
}