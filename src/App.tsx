import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import dayjs from 'dayjs';

import { Tables } from './database.types';

// import { TrackHistory } from './DepartureInfo';
import { PredictionData } from './PredictionView';
import { TrackHistory } from './DepartureInfo';
import { TrainHistoryView } from './TrainHistoryView';


function App() {
  const [routes, setRoutes] = useState<Tables<'routes'>[]>([]);
  const [deps, setDeps] = useState<Tables<'lastndepartures'>[]>([]);
  const [predictionData, setPredictionData] = useState<Tables<'basicview'>[]>([]);
  const [schedules, setSchedules] = useState<Tables<'scheduleview'>[]>([]);
  const [trainHistoryData, setTrainHistoryData] = useState<Tables<'basicview'>[]>([]);

  useEffect(() => {
    getTrainHistoryData();
    // getPredictionData();
    // getSchedules();
    // getDeps();
  }, []);

  async function getDeps() {
    const { data }: PostgrestSingleResponse<Tables<'lastndepartures'>[]> = await supabase
      .from('lastndepartures')
      .select("*");

    setDeps(data ?? []);
  }

  async function getPredictionData() {
    // TODO: This should rely on some filter state I think. Will need to adjust
    // the backend logic to make sure the announced tracks are available also.
    const windowStart = dayjs();
    const windowStartFormatted = windowStart.format('YYYY-MM-DD HH:mm');
    const { data }: PostgrestSingleResponse<Tables<'basicview'>[]> = await supabase
      .from('basicview')
      .select("*")
      .gte('departure_timestamp_scheduled', windowStartFormatted)
      .limit(10);

    setPredictionData(data ?? []);
  }

  async function getTrainHistoryData() {
    // TODO: This should rely on some filter state I think. Will need to adjust
    // the backend logic to make sure the announced tracks are available also.
    const windowStart = dayjs();
    const windowStartFormatted = windowStart.format('YYYY-MM-DD HH:mm');
    const trainNum = 1166;
    const { data }: PostgrestSingleResponse<Tables<'basicview'>[]> = await supabase
      .from('basicview')
      .select("*")
      .eq("train_num", trainNum)
      .lte('departure_timestamp_scheduled', windowStartFormatted)
      .order('date', { ascending: false });

    console.log(data);

    setTrainHistoryData(data ?? []);
  }

  async function getSchedules() {
    const { data }: PostgrestSingleResponse<Tables<'scheduleview'>[]> = await supabase
      .from('scheduleview')
      .select("*")
      .eq('date', dayjs().format('YYYY-MM-DD'));

    setSchedules(data ?? []);
  }

  return (
    <div className="container">
      <TrainHistoryView train_history_data={trainHistoryData} />
    </div>
  )
}

export default App
