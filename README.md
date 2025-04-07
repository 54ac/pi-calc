# Pi Calculator

Zadanie rekrutacyjne - kalkulator liczby pi w React + Vite z użyciem Web Workera.

## Deployment

[Netlify](https://preeminent-dieffenbachia-155c0f.netlify.app/)

## Działanie

- Komponent wysyła wybraną dokładność do workera za pomocą postMessage.
- Worker oblicza wartość liczby pi przy użyciu algorytmu pożyczonego z internetu.
- Po zakończeniu obliczeń wynik jest przesyłany z powrotem do komponentu, który przy użyciu onMessage zapisuje go w stanie i wyświetla na stronie.

## Możliwe zmiany/optymalizacje

- Zamiast używać jednego workera w useEffect, można tworzyć nowego workera dla każdej kalkulacji i usuwać go po zakończeniu obliczeń. Jest to nieoptymalne pamięciowo, ale mogłoby być przydatne w scenariuszach wielowątkowych.
- Memoizacja komponentu, aby ograniczyć niepotrzebne re-renderowanie - choć w przypadku tak drobnej aplikacji raczej nie byłoby to zauważalne.
