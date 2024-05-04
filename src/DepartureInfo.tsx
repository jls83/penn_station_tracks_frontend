import { Json, Tables } from './database.types'
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

import './Blah.css'

interface Foo {
  track: number,
  announcement_timestamp: string,
  departure_timestamp: string,
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

function getDepartureTimeData({ announcement_timestamp, departure_timestamp }: Foo) {
  const announcement_d = dayjs.utc(announcement_timestamp).tz("America/New_York");
  const departure_d = dayjs.utc(departure_timestamp).tz("America/New_York");

  const departureDateFormatted = departure_d.format('YYYY-MM-DD');
  const departureTimeFormatted = departure_d.format('HH:mm:ss');
  const announcementTimeFormatted = announcement_d.format('HH:mm:ss');

  // TODO: leadTime isnt the right word
  const leadTime = dayjs.duration(departure_d.diff(announcement_d));

  const leadTimeMillis = leadTime.asMilliseconds();
  let leadTimeFormatted;
  if (leadTimeMillis < 0) {
    const negatedDelay = dayjs.duration(leadTimeMillis * -1, 'milliseconds');
    leadTimeFormatted = '-' + negatedDelay.format('mm:ss');
  } else {
    leadTimeFormatted = leadTime.format('mm:ss');
  }

  return {
    departureDateFormatted,
    departureTimeFormatted,
    announcementTimeFormatted,
    leadTimeFormatted,
  };
}

function DepartureInfo(d: Foo) {
  const departureTimeData = getDepartureTimeData(d);
  return (
    <div className="parent">
      <div className="div1 date">{departureTimeData.departureDateFormatted}</div>
      <div className="div2 metric-name">Track:</div>
      <div className="div3"> {d.track}</div>
      <div className="div4 metric-name">Scheduled:</div>
      <div className="div5"> {departureTimeData.departureTimeFormatted}</div>
      <div className="div6 metric-name">Announced:</div>
      <div className="div7"> {departureTimeData.announcementTimeFormatted}</div>
      <div className="div8 metric-name">Lead Time:</div>
      <div className="div9"> {departureTimeData.leadTimeFormatted}</div>
    </div>
  )
}

export function TrackHistory(dep: Tables<'lastndepartures'>) {
  const blah = dep?.array_agg ?? [];

  return (
    <tr>
      <th>{dep.train_num}</th>
      {blah.map((d: Json) => (
        <td>
          <DepartureInfo {...((d as object) as Foo)} />
        </td>
      ))}
    </tr>
  )
}
