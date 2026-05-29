import { asset } from './asset'

export type Apartment = {
  slug: string;
  name: string;
  address: string;
  district: string;
  description: string;
  coords: [number, number];
  images: string[];
};

export const apartments: Apartment[] = [
  {
    slug: "sw-marka-31",
    name: "Apartament Św. Marka 31",
    address: "ul. Św. Marka 31, 31-017 Kraków",
    district: "Stare Miasto",
    description:
      "Elegancki apartament w sercu Starego Miasta, urządzony z dbałością o detale. Charakterystyczna niebieska sypialnia i klasyczne wykończenia tworzą wyjątkowy klimat, który zachwyca gości z całego świata.",
    coords: [50.0629, 19.9435],
    images: [asset("/assets/realizacje/sw-marka-31/cover.png")],
  },
  {
    slug: "starowislna-68",
    name: "Apartament Starowiślna 68",
    address: "ul. Starowiślna 68, 31-035 Kraków",
    district: "Śródmieście",
    description:
      "Nowoczesny apartament z minimalistycznym wnętrzem w stylu skandynawskim. Jasne kolory, naturalne materiały i przemyślany homestaging sprawiają, że obłożenie sięga 96% przez cały rok.",
    coords: [50.0554, 19.9527],
    images: [asset("/assets/realizacje/starowislna-68/cover.png")],
  },
  {
    slug: "augustianska-1",
    name: "Apartament Augustiańska 1",
    address: "ul. Augustiańska 1, 31-064 Kraków",
    district: "Kazimierz",
    description:
      "Wyjątkowy apartament na poddaszu w klimatycznym Kazimierzu. Drewniane belki, ceglane akcenty i pomarańczowa sofa tworzą przestrzeń pełną charakteru — idealną dla gości szukających autentycznego krakowskiego klimatu.",
    coords: [50.0518, 19.944],
    images: [asset("/assets/realizacje/augustianska-1/cover.png")],
  },
  {
    slug: "dietla-68",
    name: "Apartament Dietla 68",
    address: "ul. Dietla 68, 31-039 Kraków",
    district: "Stare Miasto",
    description:
      "Przestronny apartament przy Plantach z elegancką sypialnią. Klasyczna kolorystyka i wysokiej klasy wyposażenie zapewniają gościom komfort na najwyższym poziomie.",
    coords: [50.0554, 19.9484],
    images: [asset("/assets/realizacje/dietla-68/cover.png")],
  },
  {
    slug: "sw-sebastiana-31",
    name: "Apartament Św. Sebastiana 31",
    address: "ul. Św. Sebastiana 31, 31-049 Kraków",
    district: "Stare Miasto",
    description:
      "Przytulny apartament z gustownym wystrojem i dbałością o każdy detal. Neutralna paleta barw i wysokiej jakości tekstylia tworzą przestrzeń, w której goście czują się jak w domu.",
    coords: [50.0544, 19.9413],
    images: [asset("/assets/realizacje/sw-sebastiana-31/cover.png")],
  },
  {
    slug: "willa-podgorze",
    name: "Willa Podgórze",
    address: "ul. Zamenhoffa 12, 30-519 Kraków",
    district: "Podgórze",
    description:
      "Kameralna willa w spokojnej części Podgórza, idealnie zlokalizowana dla gości odwiedzających Fabrykę Schindlera i Rynek Podgórski. Prywatny ogród i wyjątkowa atmosfera wyróżniają ten obiekt na tle konkurencji.",
    coords: [50.0438, 19.9527],
    images: [],
  },
];
