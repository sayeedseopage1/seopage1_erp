import React from 'react';
import { useContext } from 'react';
import { RefreshContext } from '../independentTask';

export default function useIndependentTaskContext(){
  return useContext(RefreshContext);
};