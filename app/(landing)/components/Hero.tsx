import HeroWithDoodles from '@/public/images/hero-with-doodles.webp';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="container px-5 mx-auto flex flex-col lg:flex-row items-center">
      <div className="flex-grow py-5 text-center lg:text-left">
        <h1 className="font-bold">Learn about Buffer 🚀</h1>
        <p>
          We’re an optimistic and gratitude-filled group of remote workers scattered around the world and dedicated to creating a product our customers will use and love.
          Read on to learn more about Buffer’s story and history and see the full Buffer team.
        </p>
      </div>
      <Image src={HeroWithDoodles} alt="Buffer" className="w-[30rem]" sizes="(min-width: 1024px) 30vw, 100vw" placeholder="empty" layout="responsive" />
    </div>
  )
}