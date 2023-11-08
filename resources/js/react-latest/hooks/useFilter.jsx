import _ from 'lodash';
import { useUsers } from './useUsers';
import {useState} from 'react';
import { useLazyGetAllProjectsOptionsQuery } from '../services/api/FilterBarOptionsApiSlice';

export const useFilter = () => {
  const { users, usersIsFetching } = useUsers();


  // get employees data
  const getEmployees = (roleId) => {
    if(users){
      if(_.isArray(roleId)){
        return _.filter(users, user => !_.isNaN(user.role_id) && _.includes(roleId, Number(user.role_id)));
      }
      return _.filter(users, user => !_.isNaN(user.role_id) && Number(user.role_id) === roleId);
    }
  }

  // get clients data
  const getClients = () => {
    if(users){
      return _.filter(users, user => !user.role_id || Number(user.role_id) === 3);
    }
  }


  // get project details
  const [
    getAllProjectsOptions,
    {isFetching: fetchingProject}
  ] = useLazyGetAllProjectsOptionsQuery();


  const getProjects = async () => {
      try{
          const res = await getAllProjectsOptions('').unwrap();
          return res;
      }catch(err){
        console.log(err)
      }
  }


  // loading state
  const isLoading = {
    user: usersIsFetching,
    project: fetchingProject,
    loading: usersIsFetching || fetchingProject,
  }

  return {
    getEmployees,
    getClients,
    getProjects,
    isLoading,
  }
}
