import { Json, Tables } from './database.types'
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

import './PredictionView.css'

// TODO: move to a common.ts file
interface Foo {
  track: number,
  announcement_timestamp: string,
  departure_timestamp: string,
}

interface Bar {
  trip_headsign: string,
  train_num: number,
  departure_timestamp: string,
  predicted_track: number,
  actual_track: number,
  predicted_lead_time: number,
  route_color: string,
  route_text_color: string,
}

function RouteBanner(route: Tables<'routes'>) {
  return (
    <div style={{
      color: `#${route.route_text_color}`,
      backgroundColor: `#${route.route_color}`,
      fontFamily: 'Helvetica Neue',
      fontSize: '2em',
      padding: '0.2em 0.4em',
      fontWeight: 500,
      textAlign: 'center',
    }}>{route.route_long_name}</div>
  )
}

export function PredictionData({
  trip_headsign,
  train_num,
  departure_timestamp,
  predicted_track,
  actual_track,
  predicted_lead_time,
  route_color,
  route_text_color,
}: Tables<'thingview'>) {
  const departure_d = dayjs.utc(departure_timestamp).tz("America/New_York");
  const departureTimeFormatted = departure_d.format('HH:mm');

  const predictedLeadTimeFormatted = predicted_lead_time !== null ? Math.round(predicted_lead_time) : "??";

  return (
    <div className="parent"
      style={{
        color: `#${route_text_color}`,
        backgroundColor: `#${route_color}`,
      }}>
      <div className="div1 top-row headsign">{trip_headsign}</div>
      <div className="div2 top-row departure-time">{departureTimeFormatted}</div>
      <div className="div3 bottom-row track">
        <div className="section-header">Predicted</div>
        {predicted_track}
      </div>
      <div className="div4 bottom-row track">
        <div className="section-header">Actual</div>
        {actual_track}
      </div>
      <div className="div5 bottom-row lead-time">
        <div className="section-header">Lead Time</div>
        {predictedLeadTimeFormatted}
      </div>
      <div className="div6 footer-row train-num">
        Train #{train_num}
      </div>
    </div>
  );
}
