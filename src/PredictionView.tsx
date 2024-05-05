import { Tables } from './database.types'
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

import './PredictionView.css'

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
    // const s = predictedLeadTime.asSeconds() * -1;
    const s = predictedLeadTime.asMilliseconds() * -1;
    const blah = dayjs.duration(s).format("mm:ss");
    predictedLeadTimeFormatted = `-${blah}`;
  } else {
    predictedLeadTimeFormatted = predictedLeadTime?.format("mm:ss");
  }

  const trainTimeUrl = `https://traintime.mta.info/map?trainId=LIRR_${train_num}`;

  return (
    <div className="parent"
      style={{
        color: `#${route_text_color}`,
        backgroundColor: `#${route_color}`,
      }}>
      <div className="div1 top-row headsign">{trip_headsign}</div>
      <div className="div2 top-row">
        <span className="departure-time">
          {departureTimeFormatted}
        </span>
        <span className="departure-date">{departureDateFormatted}</span>
        <span
          className="peak-indicator"
          style={{
            color: `#${route_color}`,
            backgroundColor: `#${route_text_color}`,
          }}>
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
        <a href={trainTimeUrl}
          target="_blank"
          className="traintime-url"
          style={{
            color: `#${route_text_color}`
          }}
        >
          Train #{train_num}
        </a>
      </div>
    </div>
  );
}
