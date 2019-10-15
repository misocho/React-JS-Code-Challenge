import React from 'react';
import TodosContainer from './store';
import { Provider, Subscribe } from 'unstated'
import { mount } from 'enzyme';
it('ReadStorage', () => {
  const wrapper = mount(
    <Provider>
      <Subscribe to={[TodosContainer]}></Subscribe>
    </Provider>
  )
})