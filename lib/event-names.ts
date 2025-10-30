import { INSTANS } from '@/lib/dictionary';
import { Language, type Translation } from '@/locales';
import { EventType } from './types';

export const EVENT_NAMES: Readonly<Record<EventType, Translation>> = {
  [EventType.KLAGE_MOTTATT_VEDTAKSINSTANS]: {
    [Language.NB]: `Klage mottatt ${INSTANS.vedtaksinstans.nb}`,
    [Language.NN]: `Klage motteke ${INSTANS.vedtaksinstans.nn}`,
    [Language.EN]: `Complaint received by ${INSTANS.vedtaksinstans.en}`,
  },
  [EventType.KLAGE_MOTTATT_KLAGEINSTANS]: {
    [Language.NB]: `Klage mottatt ${INSTANS.klageinstans.nb}`,
    [Language.NN]: `Klage motteke ${INSTANS.klageinstans.nn}`,
    [Language.EN]: `Complaint received by ${INSTANS.klageinstans.en}`,
  },
  [EventType.KLAGE_AVSLUTTET_I_KLAGEINSTANS]: {
    [Language.NB]: `Klage fullført hos ${INSTANS.klageinstans.nb}`,
    [Language.NN]: `Klage fullført hjå ${INSTANS.klageinstans.nn}`,
    [Language.EN]: `Complaint concluded by ${INSTANS.klageinstans.en}`,
  },
  [EventType.ANKE_MOTTATT_KLAGEINSTANS]: {
    [Language.NB]: `Anke mottatt ${INSTANS.klageinstans.nb}`,
    [Language.NN]: `Anke motteke ${INSTANS.klageinstans.nn}`,
    [Language.EN]: `Appeal received by ${INSTANS.klageinstans.en}`,
  },
  [EventType.ANKE_SENDT_TRYGDERETTEN]: {
    [Language.NB]: `Anke sendt til ${INSTANS.trygderetten.nb}`,
    [Language.NN]: `Anke sendt til ${INSTANS.trygderetten.nn}`,
    [Language.EN]: `Appeal sent to the ${INSTANS.trygderetten.en}`,
  },
  [EventType.ANKE_KJENNELSE_MOTTATT_FRA_TRYGDERETTEN]: {
    [Language.NB]: `Kjennelse mottatt fra ${INSTANS.trygderetten.nb}`,
    [Language.NN]: `Kjennelse mottatt fra ${INSTANS.trygderetten.nn}`,
    [Language.EN]: `Decision received from the ${INSTANS.trygderetten.en}`,
  },
  [EventType.ANKE_AVSLUTTET_I_TRYGDERETTEN]: {
    [Language.NB]: `Anke fullført hos ${INSTANS.trygderetten.nb}`,
    [Language.NN]: `Anke fullført hjå ${INSTANS.trygderetten.nn}`,
    [Language.EN]: `Appeal concluded by the ${INSTANS.trygderetten.en}`,
  },
  [EventType.ANKE_AVSLUTTET_I_KLAGEINSTANS]: {
    [Language.NB]: `Anke fullført hos ${INSTANS.klageinstans.nb}`,
    [Language.NN]: `Anke fullført hjå ${INSTANS.klageinstans.nn}`,
    [Language.EN]: `Appeal concluded by ${INSTANS.klageinstans.en}`,
  },
  [EventType.OMGJOERINGSKRAV_MOTTATT_KLAGEINSTANS]: {
    [Language.NB]: `Omgjøringskrav mottatt ${INSTANS.klageinstans.nb}`,
    [Language.NN]: `Omgjeringskrav motteke ${INSTANS.klageinstans.nn}`,
    [Language.EN]: `Request for reconsideration received by ${INSTANS.klageinstans.en}`,
  },
  [EventType.OMGJOERINGSKRAV_AVSLUTTET_I_KLAGEINSTANS]: {
    [Language.NB]: `Omgjøringskrav fullført hos ${INSTANS.klageinstans.nb}`,
    [Language.NN]: `Omgjeringskrav fullført hjå ${INSTANS.klageinstans.nn}`,
    [Language.EN]: `Request for reconsideration concluded by ${INSTANS.klageinstans.en}`,
  },
  [EventType.GJENOPPTAKSBEGJAERING_MOTTATT_KLAGEINSTANS]: {
    [Language.NB]: `Begjæring om gjenopptak mottatt ${INSTANS.klageinstans.nb}`,
    [Language.NN]: `Krav om gjenopning motteke ${INSTANS.klageinstans.nn}`,
    [Language.EN]: `Request for reopening received by ${INSTANS.klageinstans.en}`,
  },
  [EventType.GJENOPPTAKSBEGJAERING_SENDT_TRYGDERETTEN]: {
    [Language.NB]: `Begjæring om gjenopptak sendt til ${INSTANS.trygderetten.nb}`,
    [Language.NN]: `Krav om gjenopning sendt til ${INSTANS.trygderetten.nn}`,
    [Language.EN]: `Request for reopening sent to the ${INSTANS.trygderetten.en}`,
  },
  [EventType.GJENOPPTAKSBEGJAERING_KJENNELSE_MOTTATT_FRA_TRYGDERETTEN]: {
    [Language.NB]: `Kjennelse mottatt fra ${INSTANS.trygderetten.nb}`,
    [Language.NN]: `Kjennelse mottatt fra ${INSTANS.trygderetten.nn}`,
    [Language.EN]: `Decision received from the ${INSTANS.trygderetten.en}`,
  },
  [EventType.GJENOPPTAKSBEGJAERING_AVSLUTTET_I_TRYGDERETTEN]: {
    [Language.NB]: `Begjæring om gjenopptak fullført hos ${INSTANS.trygderetten.nb}`,
    [Language.NN]: `Krav om gjenopning fullført hjå ${INSTANS.trygderetten.nn}`,
    [Language.EN]: `Request for reopening concluded by the ${INSTANS.trygderetten.en}`,
  },
  [EventType.GJENOPPTAKSBEGJAERING_AVSLUTTET_I_KLAGEINSTANS]: {
    [Language.NB]: `Begjæring om gjenopptak fullført hos ${INSTANS.klageinstans.nb}`,
    [Language.NN]: `Krav om gjenopning fullført hjå ${INSTANS.klageinstans.nn}`,
    [Language.EN]: `Request for reopening concluded by ${INSTANS.klageinstans.en}`,
  },
};
