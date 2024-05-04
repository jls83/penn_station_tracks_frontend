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
  const f: Tables<'thingview'>[] = [];
  const [predictionData, setPredictionData] = useState(f);

  useEffect(() => {
    getPredictionData();
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
    const timeLimit = dayjs().subtract(3, 'day').format();
    const { data }: PostgrestSingleResponse<Tables<'thingview'>[]> = await supabase
      .from('thingview')
      .select("*");
    // .gt('departure_timestamp', timeLimit);

    setPredictionData(data ?? []);
  }

  return (
    <div className="container">
      {predictionData.map((pd) => (<PredictionData {...pd} />))}
    </div>
  )
}

export default App
