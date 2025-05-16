<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class QuestionController extends Controller
{
    /**
     * Get all questions with their form
     */
    public function index(): JsonResponse
    {
        $questions = Question::with(['form', 'dependentQuestion'])->get();
        return response()->json($questions);
    }

    /**
     * Store a new question
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'form_id' => 'required|exists:forms,id',
            'question_text' => 'required|string',
            'type' => 'required|in:text,radio,checkbox,boolean',
            'depends_on_question_id' => 'nullable|exists:questions,id',
            'depending_value' => 'nullable|string',
            'sort_order' => 'required|integer',
            'is_required' => 'required|boolean',
            'options' => 'nullable|array'
        ]);

        $question = Question::create($validated);
        return response()->json($question->load('form'), 201);
    }

    /**
     * Get a specific question with its relationships
     */
    public function show(Question $question): JsonResponse
    {
        return response()->json($question->load(['form', 'dependentQuestion']));
    }

    /**
     * Update a question
     */
    public function update(Request $request, Question $question): JsonResponse
    {
        $validated = $request->validate([
            'question_text' => 'sometimes|required|string',
            'type' => 'sometimes|required|in:text,radio,checkbox,boolean',
            'depends_on_question_id' => 'nullable|exists:questions,id',
            'depending_value' => 'nullable|string',
            'sort_order' => 'sometimes|required|integer',
            'is_required' => 'sometimes|required|boolean',
            'options' => 'nullable|array'
        ]);

        $question->update($validated);
        return response()->json($question->load('form'));
    }

    /**
     * Delete a question
     */
    public function destroy(Question $question): JsonResponse
    {
        $question->delete();
        return response()->json(null, 204);
    }
} 