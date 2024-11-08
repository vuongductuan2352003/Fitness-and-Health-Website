<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRefreshTokensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('refresh_tokens', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Liên kết với bảng users
            $table->string('refresh_token', 64)->unique(); // Token duy nhất
            $table->timestamp('refresh_token_expires_at')->nullable(); // Thời gian hết hạn
            $table->boolean('is_active')->default(1); // Trạng thái hoạt động của token
            $table->timestamps(); // Thời gian tạo và cập nhật token
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('refresh_tokens');
    }
}
