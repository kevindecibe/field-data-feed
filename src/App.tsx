import { FC } from 'react';
import { Feed } from '@/components/feed/Feed';
import { Header } from '@/components/feed/Header';
import { Toaster } from '@/components/ui/toaster';

const App: FC = () => {
  return (
    <div className='container flex flex-col items-center justify-center py-8'>
      <Header />
      <div className='w-full'>
        <Feed />
      </div>
      <Toaster />
    </div>
  );
};

export default App;
