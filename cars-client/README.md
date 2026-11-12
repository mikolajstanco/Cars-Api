# Cars Client

Klient React + TypeScript dla backendu `Cars.API`.

## Uruchomienie

Uruchom backend ASP.NET Core z profilem HTTPS, a następnie w katalogu `cars-client`:

```bash
npm install
npm run dev
```

Adres API jest ustawiony w pliku `.env.development`:

```text
VITE_API_URL=https://localhost:7182/api
```

Przy pierwszym wejściu na adres HTTPS backendu zaakceptuj lokalny certyfikat deweloperski.

## Funkcje

- pobieranie i modyfikowanie samochodów przez Axios,
- routing dla listy, szczegółów, dodawania i edycji,
- wyszukiwanie po marce lub modelu,
- oznaczanie samochodów jako ulubione,
- filtrowanie tylko ulubionych,
- zapamiętywanie ulubionych w `localStorage` przez Zustand `persist`.
