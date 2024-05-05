import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import { PostgrestSingleResponse } from '@supabase/supabase-js';

import { Tables } from './database.types';

// import { TrackHistory } from './DepartureInfo';
import { PredictionData } from './PredictionView';
import dayjs from 'dayjs';


function App() {
  // const d: Tables<'routes'>[] = []
  // const [routes, setRoutes] = useState([]);

  // const e: Tables<'lastndepartures'>[] = []
  // const [deps, setDeps] = useState(e);
  //
  const f: Tables<'basicview'>[] = [];
  const [predictionData, setPredictionData] = useState(f);

  const g: Tables<'scheduleview'>[] = []
  const [schedules, setSchedules] = useState(g);

  useEffect(() => {
    getPredictionData();
    getSchedules();
  }, []);

  // async function getDeps() {
  //   const { data }: PostgrestSingleResponse<Tables<'lastndepartures'>[]> = await supabase
  //     .from('lastndepartures')
  //     .select("*");

  //   setDeps(data ?? []);
  // }

  async function getPredictionData() {
    // TODO: this filtering will work better when i have the actual schedules in
    // place.
    const windowStart = dayjs().subtract(2, 'day').format('YYYY-MM-DD');
    const windowEnd = dayjs().add(1, 'day').format('YYYY-MM-DD');
    const { data }: PostgrestSingleResponse<Tables<'basicview'>[]> = await supabase
      .from('basicview')
      .select("*")
      .lte('date', windowEnd)
      .gte('date', windowStart);

    setPredictionData(data ?? []);
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
      {predictionData.map((pd) => (<PredictionData {...pd} />))}
    </div>
  )
}

export default App
