<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Company Information & Contact Details (Configured via .env)
    |--------------------------------------------------------------------------
    */
    'company' => [
        'name' => env('COMPANY_NAME', 'FERNBLAKE LIMITED'),
        'registration_number' => env('COMPANY_REG_NUMBER', env('COMPANY_REG_NO', '16020960')),
        'reg_number' => env('COMPANY_REG_NUMBER', env('COMPANY_REG_NO', '16020960')),
        'vat_id' => env('COMPANY_VAT_ID', ''),
        'email' => env('COMPANY_EMAIL', env('COMPANY_SUPPORT_EMAIL', 'info@zeltrionix.co.uk')),
        'support_email' => env('COMPANY_EMAIL', env('COMPANY_SUPPORT_EMAIL', 'info@zeltrionix.co.uk')),
        'billing_email' => env('COMPANY_BILLING_EMAIL', env('COMPANY_EMAIL', env('COMPANY_SUPPORT_EMAIL', 'info@zeltrionix.co.uk'))),
        'phone' => env('COMPANY_PHONE', ''),
        'address' => env('COMPANY_ADDRESS', 'Academy House, 11 Dunraven Place, Bridgend, Mid Glamorgan, United Kingdom, CF31 1JF'),
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
