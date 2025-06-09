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
                'description' => null,
                'type' => 'text',
                'is_required' => true,
                'sort_order' => 1,
                'depends_on_question' => false,
                'depending_value' => null,
                'options' => null
            ],
            [
                'form_id' => 1,
                'question_text' => 'Vilken yerkesroll alignar med dig just nu, eller vilken roll strävar du arr uppnå?',
                'description' => null,
                'type' => 'text',
                'is_required' => true,
                'sort_order' => 2,
                'depends_on_question' => false,
                'depending_value' => null,
                'options' => null
            ],
            [
                'form_id' => 1,
                'question_text' => 'Vad är det stärsta behovet du har just nu i din karriärutveckling?',
                'description' => 'Behöver du mer erfarenhet av projektarbete, teknisk, utveckling,coaching,intervjuträning eller nått annat?',
                'type' => 'text',
                'is_required' => true,
                'sort_order' => 3,
                'depends_on_question' => false,
                'depending_value' => null,
                'options' => null
            ],
            [
                'form_id' => 1,
                'question_text' => 'Vad hoppas du få ut av att vara en del av Collaborators?',
                'description' => null,
                'type' => 'text',
                'is_required' => true,
                'sort_order' => 4,
                'depends_on_question' => false,
                'depending_value' => null,
                'options' => null
                
            ],
            [
                'form_id' => 1,
                'question_text' => 'Vad ser du som ditt främsta syfte av att vara en del av Collaborators?',
                'description' => 'Vill du nätverka och få inspiration genom att komma i kontakt 
                                    med andra inom branschen, eller föredrar du att vara med och bygga projekt för att utveckla dina färdigheter och erfarenheter?',
                'type' => 'checkbox',
                'is_required' => true,
                'sort_order' => 5,
                'depends_on_question' => false,
                'depending_value' => null,
                'options' => json_encode(['Nätverka','Nätverka & Bygga project']),
            ],
            [
                'form_id' => 1,
                'question_text' => 'Vilka tider passar dig bäst för att delta i projekten just nu?',
                'description' => null,
                'type' => 'checkbox',
                'is_required' => true,
                'sort_order' => 6,
                'depends_on_question' => true,  // Depends on the "reason for joining" question
                'depending_value' => 'Nätverka & Bygga project',
                'options' => json_encode(['Heldag','Förmiddagt','Eftermiddag','Kvällar','Helger']),
            ],
            [
                'form_id' => 1,
                'question_text' => 'Hur många timmar kan du bidra med i projekten',
                'description' => null,
                'type' => 'checkbox',
                'is_required' => true,
                'sort_order' => 7,
                'depends_on_question' => true,  
                'depending_value' => 'Nätverka & Bygga project',
                'options' => json_encode(['1-3','4-6','6 <']),
            ],
            [
                'form_id' => 1,
                'question_text' => 'Beskriva dig själv med emojis :)',
                'description' => null,
                'type' => 'text',
                'is_required' => false,
                'sort_order' => 8,
                'depends_on_question' => false,
                'depending_value' => null,
                'options' => null
            ],
            [
                'form_id' => 1,
                'question_text' => 'Har du några andra önskemål, idéer om hur vi kan förbättra gruppens möjligheter, eller feedback du vill dela med dig av?',
                'description' => 'Det kommer komma en ordentlig onboarding och en plattform där all information kommer
                                    att vara tillgänglig.',
                'type' => 'text',
                'is_required' => false,
                'sort_order' => 9,
                'depends_on_question' => false, 
                'depending_value' => null,
                'options' => null
            ],
            [
                'form_id' => 1,
                'question_text' => 'Ange din e-postaddress',
                'description' => null,
                'type' => 'email',
                'is_required' => true,
                'sort_order' => 10,
                'depends_on_question' => false, 
                'depending_value' => null,
                'options' => null
            ],


        ]);
    }
}
