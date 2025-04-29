<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class QuestionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('questions')->insert([
            [
                'form_id' => 1,
                'question_text' => 'What is your name?',
                'type' => 'text',
                'is_required' => true,
                'sort_order' => 1,
                'depends_on_question_id' => null,
                'depending_value' => null,
            ],
            [
                'form_id' => 1,
                'question_text' => 'What is your email address?',
                'type' => 'text',
                'is_required' => true,
                'sort_order' => 2,
                'depends_on_question_id' => null,
                'depending_value' => null,
            ],
            [
                'form_id' => 1,
                'question_text' => 'What is the reason for joining this group?',
                'type' => 'radio',
                'is_required' => true,
                'sort_order' => 3,
                'depends_on_question_id' => null,
                'depending_value' => null,
            ],
            [
                'form_id' => 1,
                'question_text' => 'Networking',
                'type' => 'radio',
                'is_required' => true,
                'sort_order' => 4,
                'depends_on_question_id' => 3,  // Depends on the "reason for joining" question
                'depending_value' => 'networking',
            ],
            [
                'form_id' => 1,
                'question_text' => 'How many hours can you work per day',
                'type' => 'text',
                'is_required' => true,
                'sort_order' => 5,
                'depends_on_question_id' => 3,  // Depends on the "reason for joining" question
                'depending_value' => 'doing projects',
            ],
            [
                'form_id' => 1,
                'question_text' => 'Please describe yourself in a few sentences.',
                'type' => 'text',
                'is_required' => false,
                'sort_order' => 6,
                'depends_on_question_id' => null,
                'depending_value' => null,
            ],
            [
                'form_id' => 1,
                'question_text' => 'Please select your skills:',
                'type' => 'checkbox',
                'is_required' => false,
                'sort_order' => 7,
                'depends_on_question_id' => 5,  // Depends on the "Working on Projects" question
                'depending_value' => 'doing projects',
            ],
            [
                'form_id' => 1,
                'question_text' => 'Do you agree to our terms and conditions?',
                'type' => 'boolean',
                'is_required' => true,
                'sort_order' => 8,
                'depends_on_question_id' => null,
                'depending_value' => null,
            ],


        ]);
    }
}
