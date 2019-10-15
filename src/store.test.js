import React from 'react';
import { mount } from 'enzyme';

import TodosContainer from './store';
import { Provider, Subscribe } from 'unstated'

import './setupTests';
it('TodosContainer', () => {
  const todos = new TodosContainer();

  console.log(todos);
})