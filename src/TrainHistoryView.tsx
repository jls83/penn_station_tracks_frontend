import { useEffect, useState } from 'react'
import { useParams } from "wouter";
import { supabase } from './supabaseClient'
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { Tables } from './database.types'
import './TrainHistoryView.css'

dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

function DepartureRow(d: Tables<'basicview'>) {
  const { date, actual_track, predicted_track } = d;
  const missedPrediction = (actual_track !== predicted_track);
  return (
    <tr>
      <td className='date-cell'>{date}</td>
      <td className={`${missedPrediction ? "missed-prediction" : ""}`}>
        {actual_track}
      </td>
      <td>{predicted_track}</td>
    </tr>
  );
}

export function TrainHistoryView() {
  async function getTrainHistoryData(trainNum: number) {
    // TODO: This should rely on some filter state I think. Will need to adjust
    // the backend logic to make sure the announced tracks are available also.
    const windowStart = dayjs();
    const windowStartFormatted = windowStart.format('YYYY-MM-DD HH:mm');
    // const trainNum = 1166;
    const { data }: PostgrestSingleResponse<Tables<'basicview'>[]> = await supabase
      .from('basicview')
      .select("*")
      .eq("train_num", trainNum)
      .lte('departure_timestamp_scheduled', windowStartFormatted)
      .order('date', { ascending: false });

    setTrainHistoryData(data ?? []);
  }

  const params = useParams();
  if (!params.train_num) return;

  const trainNum = Number(params.train_num);

  const [trainHistoryData, setTrainHistoryData] = useState<Tables<'basicview'>[]>([]);

  useEffect(() => {
    getTrainHistoryData(trainNum);
  }, []);


  if (trainHistoryData.length < 1) return;

  const first = trainHistoryData[0];

  const {
    trip_headsign,
    // train_num,
    date,
    departure_time,
    // predicted_track,
    // actual_track,
    // predicted_lead_time,
    route_color,
    route_text_color,
    peak_offpeak,
  } = first;

  const departure_timestamp = `${date} ${departure_time}`;
  const departure_d = dayjs(departure_timestamp)
  const departureTimeFormatted = departure_d.format('HH:mm');

  const routeColorStyle = {
    color: `#${route_text_color}`,
    backgroundColor: `#${route_color}`,
  };

  const routeColorStyleInverted = {
    color: `#${route_color}`,
    backgroundColor: `#${route_text_color}`,
  };

  return (
    <div className="wrapper">
      <div className="train-header"
        style={routeColorStyle}>
        <div className="div1 top-row headsign">
          {trip_headsign}
        </div>
        <div className="div2 top-row departure-info">
          <span className="departure-time">
            {departureTimeFormatted}
          </span>
          <span
            className="peak-indicator"
            style={routeColorStyleInverted}>
            {peak_offpeak ? "P" : "O"}
          </span>
        </div>
      </div>
      <table>
        <thead style={routeColorStyle}>
          <tr>
            <th scope='col'>Date</th>
            <th scope='col'>Actual Track</th>
            <th scope='col'>Predicted Track</th>
          </tr>
        </thead>
        <tbody>
          {trainHistoryData.map(DepartureRow)}
        </tbody>
      </table>
    </div>
  );
}
