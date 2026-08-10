<?php

namespace App\Http\Controllers;

use App\Models\Bot;
use App\Models\Document;
use App\Services\DocumentProcessorService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    protected DocumentProcessorService $processor;

    public function __construct(DocumentProcessorService $processor)
    {
        $this->processor = $processor;
    }

    public function store(Request $request, Bot $bot)
    {
        if ($bot->user_id !== $request->user()->id) {
            abort(403);
        }

        $request->validate([
            'document' => 'required|file|mimes:txt,pdf,md,doc,docx|max:10240', // 10MB max
        ]);

        $file = $request->file('document');
        $filename = $file->getClientOriginalName();
        $path = $file->store("knowledge_base/{$bot->uuid}");

        $doc = $bot->documents()->create([
            'filename' => $filename,
            'file_path' => $path,
            'file_size' => $file->getSize(),
            'status' => 'pending',
        ]);

        // Process immediately synchronously or dispatch job
        $this->processor->processDocument($doc);

        return back()->with('success', 'Document uploaded and processed!');
    }

    public function destroy(Request $request, Document $document)
    {
        if ($document->bot->user_id !== $request->user()->id) {
            abort(403);
        }

        if (Storage::exists($document->file_path)) {
            Storage::delete($document->file_path);
        }

        $document->delete();

        return back()->with('success', 'Document removed.');
    }
}
