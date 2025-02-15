<?php

namespace App\Http\Controllers;


use App\Models\QA;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Events\NewQuestionEvent;

class QAController extends Controller
{
    // Get the list of questions and answers
    public function index()
    {
        $questions = QA::with(['users', 'answers'])->where('parent_id', 0)->get();

        return response()->json($questions, 200);
    }

    // Add a question for a product
    public function store(Request $request, $productId)
    {
        $request->validate([
            'message' => 'required|string',
        ]);



        $question = QA::create([
            'user_id' => Auth::id(),
            'message' => $request->message,
            'parent_id' => 0,  // Indicating this is a question

        ]);
        event(new NewQuestionEvent($question));

        return response()->json(['message' => 'Question added successfully', 'question' => $question], 201);
    }

    // Add an answer to a question
    public function answer(Request $request, $id)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        $question = QA::find($id);

        if (!$question) {
            return response()->json(['message' => 'Question not found'], 404);
        }

        // Check if the user is an admin (role_id = 1) or manager (role_id = 3)
        if (!in_array(Auth::user()->role_id, [1, 3])) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Create an answer (linking to the original question)
        $answer = QA::create([
            'user_id' => Auth::id(),
            'message' => $request->message,
            'parent_id' => $question->id,  // Link answer to the question
        ]);

        return response()->json(['message' => 'Answer added successfully', 'answer' => $answer], 201);
    }
}
