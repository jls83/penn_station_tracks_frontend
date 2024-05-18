import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { Tables } from './database.types'
import './PredictionView.css'
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';
import { useEffect, useState } from 'react';
import { Link } from 'wouter';

dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

export function SinglePredictionView({
  trip_headsign,
  train_num,
  date,
  departure_time,
  predicted_track,
  actual_track,
  predicted_lead_time,
  route_color,
  route_text_color,
  peak_offpeak,
}: Tables<'basicview'>) {

  const departure_timestamp = `${date} ${departure_time}`;
  const departure_d = dayjs(departure_timestamp)
  const departureTimeFormatted = departure_d.format('HH:mm');
  const departureDateFormatted = departure_d.format('ddd');

  let predictedLeadTime = predicted_lead_time !== null
    ? dayjs.duration(predicted_lead_time, 'seconds')
    : null;

  let predictedLeadTimeFormatted;

  if (predictedLeadTime === null) {
    predictedLeadTimeFormatted = "??";
  } else if (predictedLeadTime.asMilliseconds() < 0) {
    const s = predictedLeadTime.asMilliseconds() * -1;
    const absDuration = dayjs.duration(s).format("mm:ss");
    predictedLeadTimeFormatted = `-${absDuration}`;
  } else {
    predictedLeadTimeFormatted = predictedLeadTime?.format("mm:ss");
  }

  const trainHistoryUrl = `/train_history/${train_num}`;

  const routeColorStyle = {
    color: `#${route_text_color}`,
    backgroundColor: `#${route_color}`,
  };

  const routeColorStyleInverted = {
    color: `#${route_color}`,
    backgroundColor: `#${route_text_color}`,
  };

  return (
    <div className="parent"
      style={routeColorStyle}>
      <div className="div1 top-row headsign">{trip_headsign}</div>
      <div className="div2 top-row">
        <span className="departure-time">
          {departureTimeFormatted}
        </span>
        <span className="departure-date">{departureDateFormatted}</span>
        <span
          className="peak-indicator"
          style={routeColorStyleInverted}>
          {peak_offpeak ? "P" : "O"}
        </span>
      </div>
      <div className="div3 bottom-row track">
        <div className="section-header">Predicted</div>
        {predicted_track}
      </div>
      <div className="div4 bottom-row track">
        <div className="section-header">Actual</div>
        {actual_track ?? "--"}
      </div>
      <div className="div5 bottom-row lead-time">
        <div className="section-header">Avg. Lead Time</div>
        {predictedLeadTimeFormatted}
      </div>
      <div className="div6 footer-row train-num">
        <Link href={trainHistoryUrl}
          target="_blank"
          className="traintime-url"
          style={routeColorStyle}
        >
          Train #{train_num}
        </Link>
      </div>
    </div>
  );
}

export function PredictionView() {
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

  const [predictionData, setPredictionData] = useState<Tables<'basicview'>[]>([]);

  useEffect(() => {
    getPredictionData();
  });

  return (
    <div>
      {predictionData.map(SinglePredictionView)}
    </div>
  )

}
