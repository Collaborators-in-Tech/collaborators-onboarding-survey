<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class FormSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('forms')->insert([
            'name'          => "Collaboration Group Form",
            'description'   => "Form to join a collaboration group"
        ]);
    }
}
