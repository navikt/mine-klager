import { EventType } from '@/lib/api';
import { Languages } from '@/locales';

export const EVENT_NAMES: Readonly<Record<EventType, Record<Languages, string>>> = {
  [EventType.KLAGE_MOTTATT_VEDTAKSINSTANS]: {
    [Languages.NB]: 'Klage mottatt vedtaksinstans',
    [Languages.NN]: 'Klage mottatt vedtaksinstans',
    [Languages.EN]: 'Complaint received by decision-making body',
  },
  [EventType.KLAGE_MOTTATT_KLAGEINSTANS]: {
    [Languages.NB]: 'Klage mottatt klageinstans',
    [Languages.NN]: 'Klage mottatt klageinstans',
    [Languages.EN]: 'Complaint received by complaints body',
  },
  [EventType.KLAGE_AVSLUTTET_I_KLAGEINSTANS]: {
    [Languages.NB]: 'Klage avsluttet i klageinstans',
    [Languages.NN]: 'Klage avsluttet i klageinstans',
    [Languages.EN]: 'Complaint concluded by complaints body',
  },
  [EventType.ANKE_MOTTATT_KLAGEINSTANS]: {
    [Languages.NB]: 'Anke mottatt klageinstans',
    [Languages.NN]: 'Anke mottatt klageinstans',
    [Languages.EN]: 'Appeal received by complaints body',
  },
  [EventType.ANKE_SENDT_TRYGDERETTEN]: {
    [Languages.NB]: 'Anke sendt til Trygderetten',
    [Languages.NN]: 'Anke sendt til Trygderetten',
    [Languages.EN]: 'Appeal sent to the National Insurance Court',
  },
  [EventType.ANKE_KJENNELSE_MOTTATT_FRA_TRYGDERETTEN]: {
    [Languages.NB]: 'Anke kjennelse mottatt fra Trygderetten',
    [Languages.NN]: 'Anke kjennelse mottatt fra Trygderetten',
    [Languages.EN]: 'Appeal decision received from the National Insurance Court',
  },
  [EventType.ANKE_AVSLUTTET_I_TRYGDERETTEN]: {
    [Languages.NB]: 'Anke avsluttet i Trygderetten',
    [Languages.NN]: 'Anke avsluttet i Trygderetten',
    [Languages.EN]: 'Appeal concluded by the National Insurance Court',
  },
  [EventType.ANKE_AVSLUTTET_I_KLAGEINSTANS]: {
    [Languages.NB]: 'Anke avsluttet i klageinstans',
    [Languages.NN]: 'Anke avsluttet i klageinstans',
    [Languages.EN]: 'Appeal concluded by complaints body',
  },
};

export const NEXT_EVENT_NAMES: Readonly<Record<EventType, Record<Languages, string>>> = {
  [EventType.KLAGE_MOTTATT_VEDTAKSINSTANS]: {
    [Languages.NB]: 'Nav vedtaksinstans jobber med klagen din',
    [Languages.NN]: 'Nav vedtaksinstans jobber med klagen din',
    [Languages.EN]: 'Nav decision-making body is working on your complaint',
  },
  [EventType.KLAGE_MOTTATT_KLAGEINSTANS]: {
    [Languages.NB]: 'Nav klageinstans jobber med klagen din',
    [Languages.NN]: 'Nav klageinstans jobber med klagen din',
    [Languages.EN]: 'Nav complaints body is working on your complaint',
  },
  [EventType.KLAGE_AVSLUTTET_I_KLAGEINSTANS]: {
    [Languages.NB]: 'Saken er avsluttet i Nav klageinstans',
    [Languages.NN]: 'Saken er avsluttet i Nav klageinstans',
    [Languages.EN]: 'The case has been concluded by Nav complaints body',
  },
  [EventType.ANKE_MOTTATT_KLAGEINSTANS]: {
    [Languages.NB]: 'Nav klageinstans jobber med anken din',
    [Languages.NN]: 'Nav klageinstans jobber med anken din',
    [Languages.EN]: 'Nav complaints body is working on your appeal',
  },
  [EventType.ANKE_SENDT_TRYGDERETTEN]: {
    [Languages.NB]: 'Trygderetten jobber med anken din',
    [Languages.NN]: 'Trygderetten jobber med anken din',
    [Languages.EN]: 'The National Insurance Court is working on your appeal',
  },
  [EventType.ANKE_KJENNELSE_MOTTATT_FRA_TRYGDERETTEN]: {
    [Languages.NB]: 'Trygderetten har avgjort anken din',
    [Languages.NN]: 'Trygderetten har avgjort anken din',
    [Languages.EN]: 'The National Insurance Court has decided on your appeal',
  },
  [EventType.ANKE_AVSLUTTET_I_TRYGDERETTEN]: {
    [Languages.NB]: 'Saken er avsluttet i Trygderetten',
    [Languages.NN]: 'Saken er avsluttet i Trygderetten',
    [Languages.EN]: 'The case has been concluded by the National Insurance Court',
  },
  [EventType.ANKE_AVSLUTTET_I_KLAGEINSTANS]: {
    [Languages.NB]: 'Saken er avsluttet i Nav klageinstans',
    [Languages.NN]: 'Saken er avsluttet i Nav klageinstans',
    [Languages.EN]: 'The case has been concluded by Nav complaints body',
  },
};
