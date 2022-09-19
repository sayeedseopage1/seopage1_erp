<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Http\Requests\SearchRequest;

class SearchController extends AccountBaseController
{

    public function index()
    {
        return view('search.index', $this->data);
    }

    /**
     * @param SearchRequest $request
     * @return array|string[]|void
     */
    public function store(SearchRequest $request)
    {
        $module = $request->search_module;

        switch ($module) {
        case 'project':
            return Reply::redirect(route('projects.index') . '?search_keyword=' . $request->search_keyword);
        case 'ticket':
            return Reply::redirect(route('tickets.index') . '?search_keyword=' . $request->search_keyword);
        case 'invoice':
            return Reply::redirect(route('invoices.index') . '?search_keyword=' . $request->search_keyword);
        case 'notice':
            return Reply::redirect(route('notices.index') . '?search_keyword=' . $request->search_keyword);
        case 'task':
            return Reply::redirect(route('tasks.index') . '?search_keyword=' . $request->search_keyword);
        case 'creditNote':
            return Reply::redirect(route('creditnotes.index') . '?search_keyword=' . $request->search_keyword);
        case 'employee':
            return Reply::redirect(route('employees.index') . '?search_keyword=' . $request->search_keyword);
        case 'client':
            return Reply::redirect(route('clients.index') . '?search_keyword=' . $request->search_keyword);
        case 'estimate':
            return Reply::redirect(route('estimates.index') . '?search_keyword=' . $request->search_keyword);
        case 'lead':
            return Reply::redirect(route('leads.index') . '?search_keyword=' . $request->search_keyword);
        default:
            // Code...
            break;
        }
    }

}
