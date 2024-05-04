import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

import { Tables } from './database.types';

import { TrackHistory } from './DepartureInfo';

import './Blah.css'
import { PostgrestSingleResponse } from '@supabase/supabase-js';

function App() {
  // const d: Tables<'routes'>[] = []
  // const [routes, setRoutes] = useState([]);

  const e: Tables<'lastndepartures'>[] = []
  const [deps, setDeps] = useState(e);

  useEffect(() => {
    getDeps();
  }, []);

  async function getDeps() {
    const { data }: PostgrestSingleResponse<Tables<'lastndepartures'>[]> = await supabase
      .from('lastndepartures')
      .select("*");

    setDeps(data ?? []);
  }

  return (
    <div className="container">
      {deps.map(TrackHistory)}
    </div>
  )
}

export default App
