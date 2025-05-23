<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Form;
use App\Models\FormSubmission;
use App\Models\FormSubmissionAnswer;
use App\Models\Question;

class FormSubmissionAnswerSeeder extends Seeder
{
    public function run(): void
    {
        $form = Form::first(); // Assumes you already have at least one form
        if (!$form) {
            $this->command->error('No form found. Please seed the forms table first.');
            return;
        }

        $questions = Question::where('form_id', $form->id)->orderBy('sort_order')->get();
        if ($questions->isEmpty()) {
            $this->command->error('No questions found for this form.');
            return;
        }

        $sampleData = [
            [
                'email' => 'test1@example.com',
                'consent_given' => true,
                'answers' => [
                    1 => 'user1 test',
                    2 => 'Front End Developer',
                    3 => 'Coaching',
                    4 => 'I am not sure yet',
                    5 => 'Nätverka & Bygga projekt',
                    6 => 'Kvällar',
                    7 => '4-6',
                    8 => ':)',
                    9 => 'Nej',
                    10 => 'test1@example.com',
                    11 => true,
                ],
            ],
            [
                'email' => 'test2@example.com',
                'consent_given' => true,
                'answers' => [
                    1 => 'user2 test',
                    2 => 'Front End Developer',
                    3 => 'Coaching',
                    4 => 'I am not sure yet',
                    5 => 'Nätverka',
                    8 => ':)',
                    9 => 'Nej',
                    10 => 'test2@example.com',
                    11 => true,
                ],
            ],
        ];

        foreach ($sampleData as $data) {
            // Create form submission
            $submission = FormSubmission::create([
                'form_id' => $form->id,
                'email' => $data['email'],
                'consent_given' => $data['consent_given'],
            ]);

            // Add answers
            foreach ($data['answers'] as $questionId => $answerValue) {
                // Ensure the question exists
                $question = $questions->firstWhere('id', $questionId);
                if (!$question) {
                    $this->command->warn("Question ID $questionId not found. Skipping.");
                    continue;
                }

                FormSubmissionAnswer::create([
                    'submission_id' => $submission->id,
                    'question_id' => $questionId,
                    'answer' => is_bool($answerValue) ? ($answerValue ? 'true' : 'false') : $answerValue,
                ]);
            }
        }

        $this->command->info('Form submissions and answers seeded successfully.');
    }
}
