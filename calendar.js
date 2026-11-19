// Local export only: preparing a file or link never writes to a user's calendar.
export function utcStamp(day,time){return new Date(`2027-05-${String(day).padStart(2,'0')}T${time}:00-04:00`).toISOString().replace(/[-:]/g,'').replace(/\.\d{3}Z$/,'Z');}
export function icsText(value){return String(value??'').replace(/\\/g,'\\\\').replace(/\r\n|\r|\n/g,'\\n').replace(/;/g,'\\;').replace(/,/g,'\\,');}
function fold(line){let result='',bytes=0;for(const char of line){const size=new TextEncoder().encode(char).length;if(bytes+size>75){result+='\r\n ';bytes=1;}result+=char;bytes+=size;}return result;}
export function buildCalendarFile(event,reminder='none',now=new Date()){
 const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//CHI Together//Prototype//EN','CALSCALE:GREGORIAN','METHOD:PUBLISH','BEGIN:VEVENT',`UID:${encodeURIComponent(event.id)}@chi-together.prototype`,`DTSTAMP:${now.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}Z$/,'Z')}`,`DTSTART:${utcStamp(event.day,event.start)}`,`DTEND:${utcStamp(event.day,event.end)}`,`SUMMARY:${icsText(event.title)}`,`LOCATION:${icsText(event.place)}`,`DESCRIPTION:${icsText('Prototype event. '+event.description)}`];
 if(['0','10','30','60','1440'].includes(String(reminder)))lines.push('BEGIN:VALARM','ACTION:DISPLAY',`DESCRIPTION:${icsText(event.title)}`,`TRIGGER:-PT${Number(reminder)}M`,'END:VALARM');
 lines.push('END:VEVENT','END:VCALENDAR');return lines.map(fold).join('\r\n')+'\r\n';
}
export function googleCalendarUrl(event){const params=new URLSearchParams({action:'TEMPLATE',text:event.title,dates:`${utcStamp(event.day,event.start)}/${utcStamp(event.day,event.end)}`,ctz:'America/New_York',details:'Prototype event. '+event.description,location:event.place});return 'https://calendar.google.com/calendar/render?'+params.toString();}

export function buildPlanCalendarFile(events,reminder='none',now=new Date()){
 const blocks=events.map(e=>buildCalendarFile(e,reminder,now).split('\r\n').filter(l=>l&&!['BEGIN:VCALENDAR','END:VCALENDAR','VERSION:2.0','CALSCALE:GREGORIAN','METHOD:PUBLISH'].includes(l)&&!l.startsWith('PRODID')).join('\r\n'));
 return ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//CHI Together//Prototype//EN','CALSCALE:GREGORIAN','METHOD:PUBLISH',...blocks,'END:VCALENDAR'].join('\r\n')+'\r\n';
}
