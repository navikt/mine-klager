import { Languages, type Translation } from '@/locales';
import { EventType } from './types';

export const EVENT_NAMES: Readonly<Record<EventType, Translation>> = {
  [EventType.KLAGE_MOTTATT_VEDTAKSINSTANS]: {
    [Languages.NB]: 'Klage mottatt Nav vedtaksinstans',
    [Languages.NN]: 'Klage motteke Nav vedtaksinstans',
    [Languages.EN]: 'Complaint received by Nav Decision-making Unit (Nav vedtaksinstans)',
  },
  [EventType.KLAGE_MOTTATT_KLAGEINSTANS]: {
    [Languages.NB]: 'Klage mottatt Nav klageinstans',
    [Languages.NN]: 'Klage motteke Nav klageinstans',
    [Languages.EN]: 'Complaint received by Nav Complaints Unit (Nav klageinstans)',
  },
  [EventType.KLAGE_AVSLUTTET_I_KLAGEINSTANS]: {
    [Languages.NB]: 'Klage avsluttet hos Nav klageinstans',
    [Languages.NN]: 'Klage avslutta hjå Nav klageinstans',
    [Languages.EN]: 'Complaint concluded by Nav Complaints Unit (Nav klageinstans)',
  },
  [EventType.ANKE_MOTTATT_KLAGEINSTANS]: {
    [Languages.NB]: 'Anke mottatt Nav klageinstans',
    [Languages.NN]: 'Anke motteke Nav klageinstans',
    [Languages.EN]: 'Appeal received by Nav Complaints Unit (Nav klageinstans)',
  },
  [EventType.ANKE_SENDT_TRYGDERETTEN]: {
    [Languages.NB]: 'Anke sendt til Trygderetten',
    [Languages.NN]: 'Anke sendt til Trygderetten',
    [Languages.EN]: 'Appeal sent to the National Insurance Court',
  },
  [EventType.ANKE_KJENNELSE_MOTTATT_FRA_TRYGDERETTEN]: {
    [Languages.NB]: 'Kjennelse mottatt fra Trygderetten',
    [Languages.NN]: 'Kjennelse mottatt fra Trygderetten',
    [Languages.EN]: 'Appeal decision received from the National Insurance Court',
  },
  [EventType.ANKE_AVSLUTTET_I_TRYGDERETTEN]: {
    [Languages.NB]: 'Anke avsluttet hos Trygderetten',
    [Languages.NN]: 'Anke avslutta hjå Trygderetten',
    [Languages.EN]: 'Appeal concluded by the National Insurance Court',
  },
  [EventType.ANKE_AVSLUTTET_I_KLAGEINSTANS]: {
    [Languages.NB]: 'Anke avsluttet hos Nav klageinstans',
    [Languages.NN]: 'Anke avslutta hjå Nav klageinstans',
    [Languages.EN]: 'Appeal concluded by Nav Complaints Unit (Nav klageinstans)',
  },
  [EventType.OMGJOERINGSKRAV_MOTTATT_KLAGEINSTANS]: {
    [Languages.NB]: 'Omgjøringskrav mottatt Nav klageinstans',
    [Languages.NN]: 'Omgjøringskrav motteke Nav klageinstans',
    [Languages.EN]: 'Request for reconsideration received by Nav Complaints Unit (Nav klageinstans)',
  },
  [EventType.OMGJOERINGSKRAV_AVSLUTTET_I_KLAGEINSTANS]: {
    [Languages.NB]: 'Omgjøringskrav avsluttet hos Nav klageinstans',
    [Languages.NN]: 'Omgjøringskrav avslutta hjå Nav klageinstans',
    [Languages.EN]: 'Request for reconsideration concluded by Nav Complaints Unit (Nav klageinstans)',
  },
};
