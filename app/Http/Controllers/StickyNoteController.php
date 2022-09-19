<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Http\Requests\Sticky\StoreStickyNote;
use App\Http\Requests\Sticky\UpdateStickyNote;
use App\Models\StickyNote;

class StickyNoteController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.stickyNotes';
    }

    public function index()
    {
        $this->stickyNotes = StickyNote::where('user_id', user()->id)->orderBy('updated_at', 'desc')->get();

        if (request()->ajax()) {
            $this->pageTitle = __('app.menu.stickyNotes');
            $html = view('sticky-notes.ajax.notes', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'sticky-notes.ajax.notes';

        return view('sticky-notes.index', $this->data);
    }

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $this->stickyNotes = StickyNote::where('user_id', user()->id)->orderBy('updated_at', 'desc')->get();
        $this->pageTitle = __('modules.sticky.addNote');

        if (request()->ajax()) {
            $this->pageTitle = __('modules.sticky.addNote');
            $html = view('sticky-notes.ajax.create', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'sticky-notes.ajax.create';

        return view('sticky-notes.index', $this->data);
    }

    public function store(StoreStickyNote $request)
    {
        $sticky = new StickyNote();
        $sticky->note_text  = $request->notetext;
        $sticky->colour     = $request->colour;
        $sticky->user_id = user()->id;
        $sticky->save();

        return Reply::successWithData(__('messages.noteCreated'), ['redirectUrl' => route('sticky-notes.index')]);
    }

    public function show($id)
    {
        $this->stickyNotes = StickyNote::where('user_id', user()->id)->where('id', $id)->firstOrFail();
        $this->pageTitle = __('app.note') . ' ' . __('app.details');

        if (request()->ajax()) {
            $html = view('sticky-notes.ajax.show', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'sticky-notes.ajax.show';

        return view('sticky-notes.index', $this->data);
    }

    public function edit($id)
    {
        $this->stickyNote = StickyNote::where('user_id', user()->id)->where('id', $id)->firstOrFail();
        $this->pageTitle = __('app.edit') . ' ' . __('app.note');

        if (request()->ajax()) {
            $html = view('sticky-notes.ajax.edit', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }
        
        $this->view = 'sticky-notes.ajax.edit';

        return view('sticky-notes.index', $this->data);
    }

    public function update(UpdateStickyNote $request, $id)
    {
        $sticky = StickyNote::findOrFail($id);
        $sticky->note_text  = $request->notetext;
        $sticky->colour     = $request->colour;
        $sticky->save();

        return Reply::successWithData(__('messages.noteUpdated'), ['redirectUrl' => route('sticky-notes.index')]);
    }

    public function destroy($id)
    {
        StickyNote::destroy($id);
        return Reply::successWithData(__('messages.deleteSuccess'), ['redirectUrl' => route('sticky-notes.index')]);
    }

}
