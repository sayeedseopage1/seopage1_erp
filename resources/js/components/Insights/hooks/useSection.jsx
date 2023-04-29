import * as React from 'react';
import axios from 'axios';
import { addSection, setSections } from '../services/slices/sectionsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addReport } from '../services/slices/reportSlice';
import { openDashboardModal, setDashboardModalData } from '../services/slices/dashboardModalSlice';
import { closeSectionModal } from '../services/slices/sectionModalSlice';

export const useSections = () => {
    const dispatch = useDispatch();
    const {sections} = useSelector(state => state.sections)
    const [sectionsFetching, setSectionFetching] = React.useState(false);
    const [waitingForPostResponse, setWaitingForPostResponse] = React.useState(false);

    React.useEffect(() => {
        const fetch = async () => {
            await axios.get('/account/insights/sections/get').then(res => {
                dispatch(setSections(res.data));
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


    // store section
    const storeSection = async(data) => {
        setWaitingForPostResponse(true);
        await axios.post("/account/insights/sections/add", data)
                .then(res => {
                    const d = res.data;
                    addSection(res.data);
                    if(d.type === 'DASHBOARD_SECTION' && from === 'DASHBOARD_MODAL'){
                        console.log(d.type)
                        dispatch(setDashboardModalData({ section: d }))
                        dispatch(openDashboardModal());
                    }else if(d.type === 'DASHBOARD_SECTION' && from === ''){
                        dispatch(setDashboardModalData({ section:d }))
                        console.log('d2', d.type)
                        dispatch(closeSectionModal());
                    }else if(d.type === 'REPORT_SECTION' && from === 'REPORT_MODAL'){
                        console.log('report section');
                    }else if(d.type === 'REPORT_SECTION' && from === ''){
                        console.log('report section');
                    }
                    dispatch(closeSectionModal());
                    setWaitingForPostResponse(false)
                })
    }


    return {sections,getSectionsByType, storeSection, sectionsFetching, waitingForPostResponse};
}