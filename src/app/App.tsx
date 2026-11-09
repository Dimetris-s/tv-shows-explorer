import { FilmGrain } from './FilmGrain';
import { Header } from './Header';
import { ShowSearch } from './ShowSearch';

export const App = () => {
  return (
    <div className="relative min-h-svh">
      <FilmGrain />
      <main className="relative mx-auto flex max-w-[1080px] flex-col gap-8 px-6 pb-20">
        <Header />
        <ShowSearch />
      </main>
    </div>
  );
};
