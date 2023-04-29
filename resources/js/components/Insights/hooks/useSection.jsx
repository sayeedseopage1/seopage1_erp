import * as React from 'react';
import axios from 'axios';
import { addDashboard } from '../services/slices/dashboardSlice';
import { useDispatch } from 'react-redux';
import { addReport } from '../services/slices/reportSlice';

export const useSections = () => {
    const dispatch = useDispatch();
    const [sections, setSections]  = React.useState([]);
    const [sectionsFetching, setSectionFetching] = React.useState(false);
    const [waitingForPostResponse, setWaitingForPostResponse] = React.useState(false);

    React.useEffect(() => {
        const fetch = async () => {
            await axios.get('/account/insights/sections/get').then(res => {
                if(res.data){
                    setSections(res.data);
                    res.data?.map(d => {
                        if(d.type === 'DASHBOARD_SECTION'){
                            dispatch(addDashboard({id: d.id, section: d.section_name, title: ''}))
                        }else if(d.type === 'REPORT_SECTION') {
                            dispatch(addReport({
                                id: d.id,
                                section: d.section_name,
                                title: "",
                                type: ""
                            }))
                        }else return;
                    })
                }
            }).catch(err => {
                console.log(err);
            })
        }


        if(sections.length === 0){
            fetch();
        }

        return () =>  fetch();
    }, [])


    const getSectionsByType = (type) =>{
        return sections?.filter(s => s.type === type);
    } 


    return {sections,getSectionsByType, sectionsFetching, waitingForPostResponse};
}