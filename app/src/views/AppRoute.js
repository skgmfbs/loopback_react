import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignInView from './SignInView';
import SignUpView from './SignUpView';
import SavingMemoView from './SavingMemoView';
import AddSavingMemoView from './AddSavingMemoView';
import EditSavingMemoView from './EditSavingMemoView';

const AppRoute = () => (
    <main>
        <Switch>
            <Route exact path="/" component={SignInView} />
            <Route exact path="/signup" component={SignUpView} />
            <Route exact path="/memo" component={SavingMemoView} />
            <Route exact path="/memo/add" component={AddSavingMemoView} />
            <Route exact path="/memo/edit/:id" component={EditSavingMemoView} />
        </Switch>
    </main>
)

export default AppRoute;