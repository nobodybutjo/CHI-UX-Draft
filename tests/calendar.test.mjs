import test from 'node:test';
import assert from 'node:assert/strict';
import {buildCalendarFile,googleCalendarUrl} from '../calendar.js';
const event={id:'example',title:'Tea, research; together',day:'10',start:'12:30',end:'13:15',place:'Pittsburgh',description:'Hello\r\nEND:VEVENT'};
test('Pittsburgh daylight time exports as the correct UTC interval',()=>{const file=buildCalendarFile(event);assert.match(file,/DTSTART:20270510T163000Z/);assert.match(file,/DTEND:20270510T171500Z/);assert.ok(!file.includes('BEGIN:VALARM'));});
test('Selected alert survives export without allowing text to inject calendar records',()=>{const file=buildCalendarFile(event,'30');assert.match(file,/TRIGGER:-PT30M/);assert.ok(file.includes('SUMMARY:Tea\\, research\\; together'));assert.equal(file.split('\r\n').filter(x=>x==='END:VEVENT').length,1);});
test('Unicode lines fold within 75 UTF-8 bytes and use CRLF',()=>{const file=buildCalendarFile({...event,title:'一起交流'.repeat(40)},'none');assert.ok(file.split('\r\n').every(line=>new TextEncoder().encode(line).length<=75));assert.ok(file.replace(/\r\n/g,'').indexOf('\n')===-1);});
test('Google draft encodes the title, location and same UTC times',()=>{const url=new URL(googleCalendarUrl(event));assert.equal(url.hostname,'calendar.google.com');assert.equal(url.searchParams.get('text'),event.title);assert.equal(url.searchParams.get('dates'),'20270510T163000Z/20270510T171500Z');});
