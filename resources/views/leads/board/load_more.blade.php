@foreach ($leads as $lead)
    <x-cards.lead-card :lead="$lead" />
@endforeach
