<?php

namespace App\Http\Controllers;

use App\Models\FormSubmissionAnswer;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class FormSubmissionAnswerController extends Controller
{
    /**
     * Get all answers for a submission
     */
    public function index(Request $request): JsonResponse
    {
        $answers = FormSubmissionAnswer::with(['question', 'submission'])
            ->where('submission_id', $request->submission_id)
            ->get();
        
        return response()->json($answers);
    }

    /**
     * Store a new answer
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'submission_id' => 'required|exists:form_submissions,id',
            'question_id' => 'required|exists:questions,id',
            'answer' => 'required|string'
        ]);

        $answer = FormSubmissionAnswer::create($validated);
        return response()->json($answer->load(['question', 'submission']), 201);
    }

    /**
     * Get a specific answer
     */
    public function show(FormSubmissionAnswer $answer): JsonResponse
    {
        return response()->json($answer->load(['question', 'submission']));
    }

    /**
     * Update an answer
     */
    public function update(Request $request, FormSubmissionAnswer $answer): JsonResponse
    {
        $validated = $request->validate([
            'answer' => 'required|string'
        ]);

        $answer->update($validated);
        return response()->json($answer->load(['question', 'submission']));
    }

    /**
     * Delete an answer
     */
    public function destroy(FormSubmissionAnswer $answer): JsonResponse
    {
        $answer->delete();
        return response()->json(null, 204);
    }
} 