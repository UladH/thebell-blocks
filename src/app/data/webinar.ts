import { Webinar } from '@models/webinar.model';

export const WEBINARS: Webinar[] = [
  {
    id: 'dashevsky',
    date: new Date('2026-09-14T18:00:00+01:00'),
    title: 'Портфель инвестора в 2026-2027 годах',
    speaker: 'Стивен Дашевский — исполнительный директор D&P Advisors, портфельный менеджер',
    coverImage: 'https://static.tildacdn.net/tild6563-3763-4436-a333-383366666231/photo.jpg',
    detailsUrl: 'https://chat.osetinskaya.io/live/dashevsky',
  },
  {
    id: 'libermans',
    date: new Date('2026-10-14T20:00:00+02:00'),
    title: 'Будущее AI: мы создаем бога?',
    speaker: 'Братья Даниил и Давид Либерманы — предприниматели, инвесторы, визионеры',
    coverImage: 'https://static.tildacdn.net/tild3164-3333-4662-a132-313933343763/photo.jpg',
    detailsUrl: 'https://chat.osetinskaya.io/live/libermans',
  },
  {
    id: 'peshkin',
    date: new Date('2026-11-18T18:00:00+01:00'),
    title: 'Как победить старение: какие ответы есть у науки и что мы можем сделать сами',
    speaker: 'Леонид Пешкин — биолог из Гарвардского университета',
    coverImage:
      'https://static.tildacdn.net/tila3933-6366-4165-b734-613163376165/image_2026-11-03_16-.png',
    detailsUrl: 'https://chat.osetinskaya.io/peshkin',
  },
  {
    id: 'arkhipova',
    date: new Date('2026-12-03T19:00:00+01:00'),
    title: 'Великие антропологические открытия, изменившие мир',
    speaker: 'Александра Архипова — социальный антрополог, фольклористка',
    coverImage: 'https://static.tildacdn.net/tild6132-6432-4339-a332-386336633033/photo.jpg',
  },
];
