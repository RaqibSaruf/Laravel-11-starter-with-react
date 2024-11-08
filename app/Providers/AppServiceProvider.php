<?php

declare(strict_types=1);

namespace App\Providers;

use App\Enums\RolesEnum;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::before(function (User $user, $ability) {
            return $user->hasRole([RolesEnum::SUPERADMIN->value, RolesEnum::ADMIN->value]) ? true : null;
        });

        Model::shouldBeStrict();
    }
}
