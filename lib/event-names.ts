import { UNIT } from '@/lib/dictionary';
import { Languages, type Translation } from '@/locales';
import { EventType } from './types';

export const EVENT_NAMES: Readonly<Record<EventType, Translation>> = {
  [EventType.KLAGE_MOTTATT_VEDTAKSINSTANS]: {
    [Languages.NB]: `Klage mottatt ${UNIT.vedtaksinstans.nb}`,
    [Languages.NN]: `Klage motteke ${UNIT.vedtaksinstans.nn}`,
    [Languages.EN]: `Complaint received by ${UNIT.vedtaksinstans.en}`,
  },
  [EventType.KLAGE_MOTTATT_KLAGEINSTANS]: {
    [Languages.NB]: `Klage mottatt ${UNIT.klageinstans.nb}`,
    [Languages.NN]: `Klage motteke ${UNIT.klageinstans.nn}`,
    [Languages.EN]: `Complaint received by ${UNIT.klageinstans.en}`,
  },
  [EventType.KLAGE_AVSLUTTET_I_KLAGEINSTANS]: {
    [Languages.NB]: `Klage avsluttet hos ${UNIT.klageinstans.nb}`,
    [Languages.NN]: `Klage avslutta hjå ${UNIT.klageinstans.nn}`,
    [Languages.EN]: `Complaint concluded by ${UNIT.klageinstans.en}`,
  },
  [EventType.ANKE_MOTTATT_KLAGEINSTANS]: {
    [Languages.NB]: `Anke mottatt ${UNIT.klageinstans.nb}`,
    [Languages.NN]: `Anke motteke ${UNIT.klageinstans.nn}`,
    [Languages.EN]: `Appeal received by ${UNIT.klageinstans.en}`,
  },
  [EventType.ANKE_SENDT_TRYGDERETTEN]: {
    [Languages.NB]: `Anke sendt til ${UNIT.trygderetten.nb}`,
    [Languages.NN]: `Anke sendt til ${UNIT.trygderetten.nn}`,
    [Languages.EN]: `Appeal sent to the ${UNIT.trygderetten.en}`,
  },
  [EventType.ANKE_KJENNELSE_MOTTATT_FRA_TRYGDERETTEN]: {
    [Languages.NB]: `Kjennelse mottatt fra ${UNIT.trygderetten.nb}`,
    [Languages.NN]: `Kjennelse mottatt fra ${UNIT.trygderetten.nn}`,
    [Languages.EN]: `Appeal decision received from the ${UNIT.trygderetten.en}`,
  },
  [EventType.ANKE_AVSLUTTET_I_TRYGDERETTEN]: {
    [Languages.NB]: `Anke avsluttet hos ${UNIT.trygderetten.nb}`,
    [Languages.NN]: `Anke avslutta hjå ${UNIT.trygderetten.nn}`,
    [Languages.EN]: `Appeal concluded by the ${UNIT.trygderetten.en}`,
  },
  [EventType.ANKE_AVSLUTTET_I_KLAGEINSTANS]: {
    [Languages.NB]: `Anke avsluttet hos ${UNIT.klageinstans.nb}`,
    [Languages.NN]: `Anke avslutta hjå ${UNIT.klageinstans.nn}`,
    [Languages.EN]: `Appeal concluded by ${UNIT.klageinstans.en}`,
  },
  [EventType.OMGJOERINGSKRAV_MOTTATT_KLAGEINSTANS]: {
    [Languages.NB]: `Omgjøringskrav mottatt ${UNIT.klageinstans.nb}`,
    [Languages.NN]: `Omgjøringskrav motteke ${UNIT.klageinstans.nn}`,
    [Languages.EN]: `Request for reconsideration received by ${UNIT.klageinstans.en}`,
  },
  [EventType.OMGJOERINGSKRAV_AVSLUTTET_I_KLAGEINSTANS]: {
    [Languages.NB]: `Omgjøringskrav avsluttet hos ${UNIT.klageinstans.nb}`,
    [Languages.NN]: `Omgjøringskrav avslutta hjå ${UNIT.klageinstans.nn}`,
    [Languages.EN]: `Request for reconsideration concluded by ${UNIT.klageinstans.en}`,
  },
};
