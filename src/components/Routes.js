import React from "react"
import {Router, Route, Switch} from "react-router-dom"

const Routes = () => {
    return (
        <Switch>
            <Route exact path ="/">
                
            </Route>
            <Route exact path ="/notifications">
                <h1>notifications</h1>
            </Route>
            <Route exact path ="/preferences">
                    <h1>preferences</h1>
            </Route>
        </Switch>
    )
}

export default Routes;