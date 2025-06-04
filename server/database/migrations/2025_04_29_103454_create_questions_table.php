<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('form_id')->constrained('forms')->onDelete('cascade');
            $table->text("question_text");
            $table->text("description")->nullable();
            $table->enum('type',['text','radio','checkbox','boolean']);
            $table->boolean('depends_on_question')->default(false);
            $table->string('depending_value')->nullable();
            $table->integer('sort_order');
            $table->boolean('is_required');
            $table->json('options')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
