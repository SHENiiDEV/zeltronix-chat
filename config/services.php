<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Company Information & Contact Details (Configured via .env)
    |--------------------------------------------------------------------------
    */
    'company' => [
        'name' => env('COMPANY_NAME', 'Zeltrionix Inc.'),
        'support_email' => env('COMPANY_SUPPORT_EMAIL', 'support@zeltrionix.com'),
        'billing_email' => env('COMPANY_BILLING_EMAIL', 'billing@zeltrionix.com'),
        'phone' => env('COMPANY_PHONE', '+1 (800) 555-0199'),
        'address' => env('COMPANY_ADDRESS', '100 Tech Plaza, San Francisco, CA 94107'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    */

    'provider' => env('AI_PROVIDER', 'deepseek'),

    'deepseek' => [
        'api_key' => env('DEEPSEEK_API_KEY'),
        'model' => env('DEEPSEEK_CHAT_MODEL', 'deepseek-chat'),
        'base_url' => env('DEEPSEEK_BASE_URL', 'https://api.deepseek.com'),
    ],

    'openai' => [
        'api_key' => env('OPENAI_API_KEY'),
        'model' => env('OPENAI_CHAT_MODEL', 'gpt-4o-mini'),
    ],

    'pinecone' => [
        'api_key' => env('PINECONE_API_KEY'),
        'host' => env('PINECONE_HOST'),
    ],

    'postmark' => [
        'key' => env('POSTMARK_API_KEY'),
    ],

    'resend' => [
        'key' => env('RESEND_API_KEY'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

];
