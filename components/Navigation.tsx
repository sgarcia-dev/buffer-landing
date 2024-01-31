import BufferLogo from '@/public/buffer-logo.svg';
import Image from 'next/image';
export default function Navigation() {
  return (
    <header className="p-5 container mx-auto">
      <Image src={BufferLogo} alt="Buffer Logo" priority />
    </header>
  );
}
