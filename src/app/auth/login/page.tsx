
// This file is no longer needed as login is handled by a modal.
// You can delete this file.
// To prevent build errors if old links exist, we can keep a placeholder:

// "use client";
// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import LoadingSpinner from '@/components/ui/LoadingSpinner';

// export default function LoginPage() {
//   const router = useRouter();
//   useEffect(() => {
//     // Redirect to home, auth is now modal-based
//     router.replace('/');
//   }, [router]);

//   return (
//     <div className="relative min-h-screen flex items-center justify-center">
//       <LoadingSpinner />
//     </div>
//   );
// }
