import React, { useState, useEffect, Fragment} from 'react';
import { Listbox } from '@headlessui/react';
import Dropdown from '../ui/Dropdown';
import Button from '../ui/Button';
import { useTeams } from '../hooks/useTeams';
import  {HiOutlineSelector, HiCheck}  from 'react-icons/hi'
import dayjs from 'dayjs';
import './sidebarGoalFilter.css'

const SidebarGoalFilter = () => {
    const [selectedTeam, setSelectedTeam] = useState(null);  
    const { teams } = useTeams();


    // const getMonth = (index) => ({
    //     name: dayjs().month(index).format('MMMM'),
    //     start: dayjs().month(index).startOf('month'),
    //     end: dayjs().month(index).endOf('month'),
    //     duration: function(){ return `${this.start.format('MMM DD, YYYY')} - ${this.end.format('MMM DD, YYYY')}`},  
    // }) 

    
    return (
        <>
            <div className="w-100 f-14">
                <Listbox
                    value={selectedTeam}
                    onChange={setSelectedTeam} 
                >
                    <div className="position-relative w-100 mt-1">
                        <Listbox.Button className='goal-filter--team-sel-display'>
                            <i className='fa-solid fa-user-group' />
                        </Listbox.Button> 

                        <Listbox.Options className="goal-filter--team-dd-options"> 
                        {
                            teams? 
                                teams.map(team => (
                                    <Listbox.Option
                                        key={team.id} 
                                        value={team}
                                        className={({selected, active}) => selected ? 'goal-filter--dd-list selected' : active ? 'goal-filter--dd-list active' : 'goal-filter--dd-list'}
                                    >  
                                        <div className="goal-filter--dd-list">{team.team_name}</div>   
                                    </Listbox.Option>
                                ))
                            : null
                        }   
                        </Listbox.Options>
                    </div>   
                </Listbox>
            </div>   
        </>
    )
}

export default SidebarGoalFilter