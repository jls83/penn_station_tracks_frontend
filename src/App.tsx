import { Route, Switch } from 'wouter';

import { PredictionView } from './PredictionView';
import { TrainHistoryView } from './TrainHistoryView';


function App() {
  return (
    <div className="container">
      <Switch>
        <Route path="/train_history/:train_num" component={TrainHistoryView}></Route>
        <Route path="/" component={PredictionView}></Route>
        <Route>404: Not Found</Route>
      </Switch>
    </div>
  )
}

export default App
