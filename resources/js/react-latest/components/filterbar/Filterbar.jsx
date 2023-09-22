import React, {useState} from 'react'
import { useFilter } from '../../hooks/useFilter' 
import styles from '../../styles/filterbar.module.css';

const initialOptions = {
  date: true,
  projects: {
    title: 'Projects',
    show: true,
  },
  clients: {
    title: 'Clients',
    show: true,
  },
  developers: {
    title: 'Developers',
    show: true,
  },
  sales: {
    title: 'Sales Executive',
    show: true,
  }
}

const Filterbar = ({
  onFilter,
  options= initialOptions,
}) => {
  // UI
  const [expandManu, setExpandManu] = useState([]);

  // initial Data
  const {
    getProjects,
    getClients,
    getEmployees
  } = useFilter();

  const [projects, setProjects] = useState([]);
  const [employees, setEmeployees]  = useState([]);
  const [clients, setClients] = useState();
  
   

  return (
    <div className={styles.filterbar}>

    </div>
  )
}

export default Filterbar