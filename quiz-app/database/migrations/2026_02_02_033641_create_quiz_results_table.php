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
        Schema::create('quiz_results', function (Blueprint $table) {
            $table->id('id_result');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('category_id');
            $table->decimal('score', 5, 2)->default(0);
            $table->foreign('user_id')->references('id_user')->on('users')->onDelete('cascade');
            $table->foreign('category_id')->references('id_category')->on('categories')->onDelete('cascade');
            $table->integer('total_benar')->default(0);
            $table->integer('total_salah')->default(0);
            $table->unique(['user_id', 'category_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quiz_results');
    }
};
