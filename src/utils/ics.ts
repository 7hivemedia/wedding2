import { WEDDING_CONFIG } from '../config.js';

function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');
}

export function downloadWeddingCalendarIcs(): void {
  const nowStamp = new Date()
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}Z$/, 'Z');

  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Hariom & Akansha Wedding//Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Hariom & Akansha Wedding Celebrations',
    'X-WR-TIMEZONE:Asia/Kolkata',
  ];

  for (const ev of WEDDING_CONFIG.eventsSection.events) {
    lines.push(
      'BEGIN:VEVENT',
      `UID:${ev.id}-hariom-akansha-2027@wedding.local`,
      `DTSTAMP:${nowStamp}`,
      `DTSTART;TZID=Asia/Kolkata:${ev.isoStart}`,
      `DTEND;TZID=Asia/Kolkata:${ev.isoEnd}`,
      `SUMMARY:${escapeIcsText(`${ev.title} – Hariom & Akansha Wedding`)}`,
      `DESCRIPTION:${escapeIcsText(`${ev.title} (${ev.hindi}) - ${ev.time}`)}`,
      `LOCATION:${escapeIcsText(ev.location)}`,
      'END:VEVENT'
    );
  }

  lines.push('END:VCALENDAR');

  const blob = new Blob([lines.join('\r\n')], {
    type: 'text/calendar;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = WEDDING_CONFIG.actions.calendarFilename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
