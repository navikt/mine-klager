import { UNIT } from '@/lib/dictionary';
import { Language, type Translation } from '@/locales';
import { EventType } from './types';

export const EVENT_NAMES: Readonly<Record<EventType, Translation>> = {
  [EventType.KLAGE_MOTTATT_VEDTAKSINSTANS]: {
    [Language.NB]: `Klage mottatt ${UNIT.vedtaksinstans.nb}`,
    [Language.NN]: `Klage motteke ${UNIT.vedtaksinstans.nn}`,
    [Language.EN]: `Complaint received by ${UNIT.vedtaksinstans.en}`,
  },
  [EventType.KLAGE_MOTTATT_KLAGEINSTANS]: {
    [Language.NB]: `Klage mottatt ${UNIT.klageinstans.nb}`,
    [Language.NN]: `Klage motteke ${UNIT.klageinstans.nn}`,
    [Language.EN]: `Complaint received by ${UNIT.klageinstans.en}`,
  },
  [EventType.KLAGE_AVSLUTTET_I_KLAGEINSTANS]: {
    [Language.NB]: `Klage avsluttet hos ${UNIT.klageinstans.nb}`,
    [Language.NN]: `Klage avslutta hjå ${UNIT.klageinstans.nn}`,
    [Language.EN]: `Complaint concluded by ${UNIT.klageinstans.en}`,
  },
  [EventType.ANKE_MOTTATT_KLAGEINSTANS]: {
    [Language.NB]: `Anke mottatt ${UNIT.klageinstans.nb}`,
    [Language.NN]: `Anke motteke ${UNIT.klageinstans.nn}`,
    [Language.EN]: `Appeal received by ${UNIT.klageinstans.en}`,
  },
  [EventType.ANKE_SENDT_TRYGDERETTEN]: {
    [Language.NB]: `Anke sendt til ${UNIT.trygderetten.nb}`,
    [Language.NN]: `Anke sendt til ${UNIT.trygderetten.nn}`,
    [Language.EN]: `Appeal sent to the ${UNIT.trygderetten.en}`,
  },
  [EventType.ANKE_KJENNELSE_MOTTATT_FRA_TRYGDERETTEN]: {
    [Language.NB]: `Kjennelse mottatt fra ${UNIT.trygderetten.nb}`,
    [Language.NN]: `Kjennelse mottatt fra ${UNIT.trygderetten.nn}`,
    [Language.EN]: `Appeal decision received from the ${UNIT.trygderetten.en}`,
  },
  [EventType.ANKE_AVSLUTTET_I_TRYGDERETTEN]: {
    [Language.NB]: `Anke avsluttet hos ${UNIT.trygderetten.nb}`,
    [Language.NN]: `Anke avslutta hjå ${UNIT.trygderetten.nn}`,
    [Language.EN]: `Appeal concluded by the ${UNIT.trygderetten.en}`,
  },
  [EventType.ANKE_AVSLUTTET_I_KLAGEINSTANS]: {
    [Language.NB]: `Anke avsluttet hos ${UNIT.klageinstans.nb}`,
    [Language.NN]: `Anke avslutta hjå ${UNIT.klageinstans.nn}`,
    [Language.EN]: `Appeal concluded by ${UNIT.klageinstans.en}`,
  },
  [EventType.OMGJOERINGSKRAV_MOTTATT_KLAGEINSTANS]: {
    [Language.NB]: `Omgjøringskrav mottatt ${UNIT.klageinstans.nb}`,
    [Language.NN]: `Omgjeringskrav motteke ${UNIT.klageinstans.nn}`,
    [Language.EN]: `Request for reconsideration received by ${UNIT.klageinstans.en}`,
  },
  [EventType.OMGJOERINGSKRAV_AVSLUTTET_I_KLAGEINSTANS]: {
    [Language.NB]: `Omgjøringskrav avsluttet hos ${UNIT.klageinstans.nb}`,
    [Language.NN]: `Omgjeringskrav avslutta hjå ${UNIT.klageinstans.nn}`,
    [Language.EN]: `Request for reconsideration concluded by ${UNIT.klageinstans.en}`,
  },
  [EventType.GJENOPPTAKSBEGJAERING_MOTTATT_KLAGEINSTANS]: {
    [Language.NB]: `Begjæring om gjenopptak mottatt ${UNIT.klageinstans.nb}`,
    [Language.NN]: `Krav om gjenopning motteke ${UNIT.klageinstans.nn}`,
    [Language.EN]: `Request for reopening received by ${UNIT.klageinstans.en}`,
  },
  [EventType.GJENOPPTAKSBEGJAERING_SENDT_TRYGDERETTEN]: {
    [Language.NB]: `Begjæring om gjenopptak sendt til ${UNIT.trygderetten.nb}`,
    [Language.NN]: `Krav om gjenopning sendt til ${UNIT.trygderetten.nn}`,
    [Language.EN]: `Request for reopening sent to the ${UNIT.trygderetten.en}`,
  },
  [EventType.GJENOPPTAKSBEGJAERING_KJENNELSE_MOTTATT_FRA_TRYGDERETTEN]: {
    [Language.NB]: `Kjennelse mottatt fra ${UNIT.trygderetten.nb}`,
    [Language.NN]: `Kjennelse mottatt fra ${UNIT.trygderetten.nn}`,
    [Language.EN]: `Decision received from the ${UNIT.trygderetten.en}`,
  },
  [EventType.GJENOPPTAKSBEGJAERING_AVSLUTTET_I_TRYGDERETTEN]: {
    [Language.NB]: `Begjæring om gjenopptak avsluttet hos ${UNIT.trygderetten.nb}`,
    [Language.NN]: `Krav om gjenopning avslutta hjå ${UNIT.trygderetten.nn}`,
    [Language.EN]: `Request for reopening concluded by the ${UNIT.trygderetten.en}`,
  },
  [EventType.GJENOPPTAKSBEGJAERING_AVSLUTTET_I_KLAGEINSTANS]: {
    [Language.NB]: `Begjæring om gjenopptak avsluttet hos ${UNIT.klageinstans.nb}`,
    [Language.NN]: `Krav om gjenopning avslutta hjå ${UNIT.klageinstans.nn}`,
    [Language.EN]: `Request for reopening concluded by ${UNIT.klageinstans.en}`,
  },
};
