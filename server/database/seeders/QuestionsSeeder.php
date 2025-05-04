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
                'question_text' => 'Ange Ditt fullständiga namn',
                'type' => 'text',
                'is_required' => true,
                'sort_order' => 1,
                'depends_on_question_id' => null,
                'depending_value' => null,
                'options' => null
            ],
            [
                'form_id' => 1,
                'question_text' => 'Vilken yerkesroll alignar med dig just nu, eller vilken roll strävar du arr uppnå?',
                'type' => 'text',
                'is_required' => true,
                'sort_order' => 2,
                'depends_on_question_id' => null,
                'depending_value' => null,
                'options' => null
            ],
            [
                'form_id' => 1,
                'question_text' => 'Vad är det stärsta behovet du har just nu i din karriärutveckling?',
                'type' => 'text',
                'is_required' => true,
                'sort_order' => 3,
                'depends_on_question_id' => null,
                'depending_value' => null,
                'options' => null
            ],
            [
                'form_id' => 1,
                'question_text' => 'Vad hoppas du få ut av att vara en del av Collaborators?',
                'type' => 'text',
                'is_required' => true,
                'sort_order' => 4,
                'depends_on_question_id' => null,
                'depending_value' => null,
                'options' => null
                
            ],
            [
                'form_id' => 1,
                'question_text' => 'Vad ser du som ditt främsta syfte av att vara en del av Collaborators?',
                'type' => 'checkbox',
                'is_required' => true,
                'sort_order' => 5,
                'depends_on_question_id' => null,
                'depending_value' => null,
                'options' => json_encode(['Nätverka','Nätverka & Bygga project']),
            ],
            [
                'form_id' => 1,
                'question_text' => 'Vilka tider passar dig bäst för att delta i projekten just nu?',
                'type' => 'checkbox',
                'is_required' => true,
                'sort_order' => 6,
                'depends_on_question_id' => 5,  // Depends on the "reason for joining" question
                'depending_value' => 'Nätverka & Bygga project',
                'options' => json_encode(['Heldag','Förmiddagt','Eftermiddag','Kvällar','Helger']),
            ],
            [
                'form_id' => 1,
                'question_text' => 'Hur många timmar kan du bidra med i projekten',
                'type' => 'checkbox',
                'is_required' => true,
                'sort_order' => 7,
                'depends_on_question_id' => 5,  
                'depending_value' => 'Nätverka & Bygga project',
                'options' => json_encode(['1-3','4-6','6 <']),
            ],
            [
                'form_id' => 1,
                'question_text' => 'Beskriva dig själv med emojis :)',
                'type' => 'text',
                'is_required' => false,
                'sort_order' => 8,
                'depends_on_question_id' => null,
                'depending_value' => null,
                'options' => null
            ],
            [
                'form_id' => 1,
                'question_text' => 'Har du några andra önskemål, idéer om hur vi kan förbättra gruppens möjligheter, eller feedback du vill dela med dig av?',
                'type' => 'text',
                'is_required' => false,
                'sort_order' => 9,
                'depends_on_question_id' => null, 
                'depending_value' => null,
                'options' => null
            ],
            [
                'form_id' => 1,
                'question_text' => 'Ange din e-postaddress',
                'type' => 'text',
                'is_required' => true,
                'sort_order' => 10,
                'depends_on_question_id' => null, 
                'depending_value' => null,
                'options' => null
            ],
            [
                'form_id' => 1,
                'question_text' => 'Do you agree to our terms and conditions?',
                'type' => 'boolean',
                'is_required' => true,
                'sort_order' => 11,
                'depends_on_question_id' => null,
                'depending_value' => null,
                'options' => null
            ],


        ]);
    }
}
