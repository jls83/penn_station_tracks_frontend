import { Route, Switch } from 'wouter';

import { PredictionView } from './PredictionView';
import { TrainHistoryView } from './TrainHistoryView';


function App() {
  // const [routes, setRoutes] = useState<Tables<'routes'>[]>([]);
  // const [deps, setDeps] = useState<Tables<'lastndepartures'>[]>([]);
  // const [predictionData, setPredictionData] = useState<Tables<'basicview'>[]>([]);
  // const [schedules, setSchedules] = useState<Tables<'scheduleview'>[]>([]);
  // const [trainHistoryData, setTrainHistoryData] = useState<Tables<'basicview'>[]>([]);

  // async function getDeps() {
  //   const { data }: PostgrestSingleResponse<Tables<'lastndepartures'>[]> = await supabase
  //     .from('lastndepartures')
  //     .select("*");

  //   setDeps(data ?? []);
  // }

  // async function getPredictionData() {
  //   // TODO: This should rely on some filter state I think. Will need to adjust
  //   // the backend logic to make sure the announced tracks are available also.
  //   const windowStart = dayjs();
  //   const windowStartFormatted = windowStart.format('YYYY-MM-DD HH:mm');
  //   const { data }: PostgrestSingleResponse<Tables<'basicview'>[]> = await supabase
  //     .from('basicview')
  //     .select("*")
  //     .gte('departure_timestamp_scheduled', windowStartFormatted)
  //     .limit(10);

  //   setPredictionData(data ?? []);
  // }

  // async function getTrainHistoryData() {
  //   // TODO: This should rely on some filter state I think. Will need to adjust
  //   // the backend logic to make sure the announced tracks are available also.
  //   const windowStart = dayjs();
  //   const windowStartFormatted = windowStart.format('YYYY-MM-DD HH:mm');
  //   const trainNum = 1166;
  //   const { data }: PostgrestSingleResponse<Tables<'basicview'>[]> = await supabase
  //     .from('basicview')
  //     .select("*")
  //     .eq("train_num", trainNum)
  //     .lte('departure_timestamp_scheduled', windowStartFormatted)
  //     .order('date', { ascending: false });

  //   setTrainHistoryData(data ?? []);
  // }

  // async function getSchedules() {
  //   const { data }: PostgrestSingleResponse<Tables<'scheduleview'>[]> = await supabase
  //     .from('scheduleview')
  //     .select("*")
  //     .eq('date', dayjs().format('YYYY-MM-DD'));

  //   setSchedules(data ?? []);
  // }

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
