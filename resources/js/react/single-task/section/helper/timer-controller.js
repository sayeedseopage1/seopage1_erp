

export function StartTimer({event, fetcher, task, cb}){
    event.preventDefault();
    fetcher(`/${task?.id}/json?mode=developer_first_task_check&project_id=${task?.project_id}`)
    .unwrap()
    .then(res => {
        if (res.is_first_task) {
            cb(true) 
        } else startTimerControl();
    })
    .catch((err) => console.log(err)); 
}
