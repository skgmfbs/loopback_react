import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SavingMemoView from './SavingMemoView';
import AddSavingMemoView from './AddSavingMemoView';
import EditSavingMemoView from './EditSavingMemoView';

const AppRoute = () => (
    <main>
        <Switch>
            <Route exact path="/" component={SavingMemoView} />
            <Route exact path="/add" component={AddSavingMemoView} />
            <Route exact path="/edit/:id" component={EditSavingMemoView} />
        </Switch>
    </main>
)

export default AppRoute;