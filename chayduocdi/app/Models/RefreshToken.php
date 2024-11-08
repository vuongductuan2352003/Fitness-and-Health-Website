<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RefreshToken extends Model
{
    protected $fillable = ['refresh_token', 'refresh_token_expires_at', 'is_active'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
