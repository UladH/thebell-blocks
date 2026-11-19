import { Product, ProductId } from '@models/product.model';

export const PRODUCTS: Product[] = [
  {
    id: ProductId.Tech,
    name: 'The Bell.Tech',
    pitch: 'Рассказываем, что происходит с крупными IT-компаниями и технологиями в мире и России.',
    externalUrl: 'https://subscription.thebell.io/tech',
    coverImage:
      'https://static.tildacdn.net/tild3031-3230-4664-a230-366464656638/cover_1000x1000.png',
    tariffs: [
      { id: 'trial', label: 'Первый месяц', period: 'мес', priceUsd: 1 },
      { id: 'm1', label: 'Ежемесячно', period: 'мес', priceUsd: 14.9 },
      { id: 'm12', label: 'Год', period: 'год', priceUsd: 149, priceUsdOld: 178.8 },
    ],
  },
  {
    id: ProductId.Pro,
    name: 'The Bell.Pro',
    pitch:
      'A team of award-winning journalists bring you two weekly newsletters on Russian business and politics.',
    externalUrl: 'https://pro.thebell.io',
    coverImage:
      'https://static.tildacdn.net/tild6138-3465-4231-a263-386666666161/Slide_16_9_-_1.jpg',
    tariffs: [
      { id: 'trial', label: 'Первый месяц', period: 'мес', priceUsd: 1 },
      { id: 'm1', label: 'Ежемесячно', period: 'мес', priceUsd: 18.9 },
      { id: 'm12', label: 'Год', period: 'год', priceUsd: 189, priceUsdOld: 348 },
    ],
  },
  {
    id: ProductId.Invest,
    name: 'The Bell.Invest',
    pitch: 'Новости и разборы об инвестициях, рынках и деньгах — отдельный раздел сайта и канал.',
    externalUrl: 'https://t.me/thebell_invest',
  },
  {
    id: ProductId.Club,
    name: 'Bell.Club',
    pitch:
      'Сообщество деловых и активных людей: закрытые встречи с предпринимателями, инвесторами, политиками.',
    externalUrl: 'https://thebell.club',
  },
];
