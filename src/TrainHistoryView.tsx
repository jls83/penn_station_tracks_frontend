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

export function TrainHistoryView({ train_history_data }: { train_history_data: Tables<'basicview'>[] }) {
  if (!train_history_data || !train_history_data[0]) {
    return;
  }

  const first = train_history_data[0];

  const {
    trip_headsign,
    train_num,
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
          {train_history_data.map(DepartureRow)}
        </tbody>
      </table>
    </div>
  );
}
